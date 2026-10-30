-- =====================================================================
-- NEST-Assistent im Partner-Login
-- - partner:              welche Konten als NEST-Partner freigeschaltet sind
-- - assistent_wissen:     Wissensbasis des Assistenten (NEST, Partner-Erfahrungen,
--                         Antworten aus dem Netzwerk); nur "freigegeben" geht in den Bot
-- - netzwerk_fragen /
--   netzwerk_empfaenger /
--   netzwerk_antworten:   „An Netzwerk weitergeben": Frage -> NEST -> passende
--                         Betriebe -> Antworten zurück an den Fragenden
-- - assistent_nutzung:    zählt Fragen pro Betrieb und Tag (Limit + Statistik);
--                         Chatverläufe selbst werden nicht gespeichert.
--
-- Partner greifen auf die Netzwerk-Tabellen nur über die Funktionen unten zu,
-- damit der fragende Betrieb für die antwortenden Betriebe anonym bleibt.
-- =====================================================================

create or replace function public.ist_nest_admin() returns boolean
language sql stable set search_path = '' as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'info@nest-bildungsbar.de'
$$;

-- Firmenname eines Kontos (aus der Registrierung)
create or replace function public.konto_firma(p_user uuid) returns text
language sql stable security definer set search_path = public as $$
  select nullif(trim(raw_user_meta_data ->> 'firma'), '') from auth.users where id = p_user
$$;
revoke execute on function public.konto_firma(uuid) from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- Partner-Freischaltung
-- ---------------------------------------------------------------------
create table if not exists public.partner (
  user_id uuid primary key references auth.users(id) on delete cascade,
  freigeschaltet_am timestamptz not null default now()
);
alter table public.partner enable row level security;

drop policy if exists partner_select on public.partner;
create policy partner_select on public.partner
  for select using (user_id = auth.uid() or public.ist_nest_admin());
drop policy if exists partner_admin_insert on public.partner;
create policy partner_admin_insert on public.partner
  for insert with check (public.ist_nest_admin());
drop policy if exists partner_admin_delete on public.partner;
create policy partner_admin_delete on public.partner
  for delete using (public.ist_nest_admin());

-- Admin zählt als Partner, damit NEST den Assistenten selbst nutzen kann.
create or replace function public.ist_partner() returns boolean
language sql stable security definer set search_path = public as $$
  select public.ist_nest_admin()
      or exists (select 1 from public.partner where user_id = auth.uid())
$$;
revoke execute on function public.ist_partner() from public, anon;
grant execute on function public.ist_partner() to authenticated;

-- ---------------------------------------------------------------------
-- Wissensbasis
-- ---------------------------------------------------------------------
create table if not exists public.assistent_wissen (
  id uuid primary key default gen_random_uuid(),
  titel text not null check (char_length(titel) between 3 and 160),
  inhalt text not null check (char_length(inhalt) between 10 and 6000),
  kategorie text not null default 'Allgemein' check (char_length(kategorie) <= 60),
  herkunft text not null default 'partner' check (herkunft in ('nest', 'partner', 'netzwerk')),
  partner_id uuid references auth.users(id) on delete set null,
  firma text,
  anonym boolean not null default true,
  status text not null default 'eingereicht' check (status in ('eingereicht', 'freigegeben', 'abgelehnt')),
  netzwerk_antwort_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists assistent_wissen_status_idx on public.assistent_wissen (status, created_at);
alter table public.assistent_wissen enable row level security;

drop policy if exists wissen_select on public.assistent_wissen;
create policy wissen_select on public.assistent_wissen
  for select using (public.ist_nest_admin() or partner_id = auth.uid());
drop policy if exists wissen_insert on public.assistent_wissen;
create policy wissen_insert on public.assistent_wissen
  for insert with check (
    public.ist_nest_admin()
    or (public.ist_partner() and partner_id = auth.uid() and herkunft = 'partner' and status = 'eingereicht')
  );
drop policy if exists wissen_update on public.assistent_wissen;
create policy wissen_update on public.assistent_wissen
  for update using (public.ist_nest_admin() or (partner_id = auth.uid() and herkunft = 'partner'))
  with check (
    public.ist_nest_admin()
    or (partner_id = auth.uid() and herkunft = 'partner' and status = 'eingereicht')
  );
drop policy if exists wissen_delete on public.assistent_wissen;
create policy wissen_delete on public.assistent_wissen
  for delete using (public.ist_nest_admin() or partner_id = auth.uid());

-- Firmenname kommt bei Partner-Einträgen aus dem Konto, nicht aus dem Formular;
-- jede Änderung durch den Partner geht erneut zur Freigabe.
create or replace function public.assistent_wissen_vorbereiten() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if not public.ist_nest_admin() then
    new.firma := public.konto_firma(auth.uid());
    new.status := 'eingereicht';
  end if;
  return new;
end $$;
drop trigger if exists assistent_wissen_vorbereiten on public.assistent_wissen;
create trigger assistent_wissen_vorbereiten before insert or update on public.assistent_wissen
  for each row execute function public.assistent_wissen_vorbereiten();
revoke execute on function public.assistent_wissen_vorbereiten() from public, anon, authenticated;

-- Freigegebenes Wissen für den Assistenten. Feste Reihenfolge (älteste zuerst),
-- damit neue Einträge hinten anhängen und der Prompt-Cache vorne gültig bleibt.
create or replace function public.assistent_wissen_laden()
returns table (id uuid, titel text, inhalt text, kategorie text, quelle text)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.ist_partner() then raise exception 'kein_partner'; end if;
  return query
    select w.id, w.titel, w.inhalt, w.kategorie,
      case
        when w.herkunft = 'nest' then 'NEST BildungsBar'
        when w.herkunft = 'netzwerk' then 'Antwort aus dem Netzwerk'
        when w.anonym or w.firma is null then 'Erfahrung eines Partnerbetriebs'
        else 'Erfahrung von ' || w.firma
      end
    from public.assistent_wissen w
    where w.status = 'freigegeben'
    order by w.created_at, w.id;
end $$;
revoke execute on function public.assistent_wissen_laden() from public, anon;
grant execute on function public.assistent_wissen_laden() to authenticated;

-- ---------------------------------------------------------------------
-- Nutzung (nur Zähler, keine Inhalte)
-- ---------------------------------------------------------------------
create table if not exists public.assistent_nutzung (
  partner_id uuid not null references auth.users(id) on delete cascade,
  tag date not null default current_date,
  anzahl integer not null default 0,
  primary key (partner_id, tag)
);
alter table public.assistent_nutzung enable row level security;
drop policy if exists nutzung_admin_select on public.assistent_nutzung;
create policy nutzung_admin_select on public.assistent_nutzung
  for select using (public.ist_nest_admin());

-- Zählt eine Frage. Gibt die neue Anzahl zurück oder -1, wenn das Tageslimit
-- erreicht ist (dann wird nicht gezählt).
create or replace function public.assistent_frage_zaehlen(p_limit integer)
returns integer
language plpgsql security definer set search_path = public as $$
declare v integer;
begin
  if not public.ist_partner() then raise exception 'kein_partner'; end if;
  select anzahl into v from public.assistent_nutzung
    where partner_id = auth.uid() and tag = current_date;
  if coalesce(v, 0) >= p_limit and not public.ist_nest_admin() then return -1; end if;
  insert into public.assistent_nutzung (partner_id, tag, anzahl) values (auth.uid(), current_date, 1)
    on conflict (partner_id, tag) do update set anzahl = public.assistent_nutzung.anzahl + 1
    returning anzahl into v;
  return v;
end $$;
revoke execute on function public.assistent_frage_zaehlen(integer) from public, anon;
grant execute on function public.assistent_frage_zaehlen(integer) to authenticated;

-- ---------------------------------------------------------------------
-- Fragen ans Netzwerk
-- ---------------------------------------------------------------------
create table if not exists public.netzwerk_fragen (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references auth.users(id) on delete cascade,
  firma text,
  frage text not null check (char_length(frage) between 5 and 2000),
  ergaenzung text check (ergaenzung is null or char_length(ergaenzung) <= 2000),
  frage_weitergabe text check (frage_weitergabe is null or char_length(frage_weitergabe) <= 4000),
  weitergegeben_am timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.netzwerk_empfaenger (
  frage_id uuid not null references public.netzwerk_fragen(id) on delete cascade,
  partner_id uuid not null references auth.users(id) on delete cascade,
  firma text,
  created_at timestamptz not null default now(),
  primary key (frage_id, partner_id)
);
create table if not exists public.netzwerk_antworten (
  id uuid primary key default gen_random_uuid(),
  frage_id uuid not null references public.netzwerk_fragen(id) on delete cascade,
  partner_id uuid not null references auth.users(id) on delete cascade,
  firma text,
  antwort text not null check (char_length(antwort) between 5 and 4000),
  name_zeigen boolean not null default true,
  fuer_assistent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (frage_id, partner_id)
);
alter table public.netzwerk_fragen enable row level security;
alter table public.netzwerk_empfaenger enable row level security;
alter table public.netzwerk_antworten enable row level security;

drop policy if exists netzwerk_fragen_admin on public.netzwerk_fragen;
create policy netzwerk_fragen_admin on public.netzwerk_fragen
  for all using (public.ist_nest_admin()) with check (public.ist_nest_admin());
drop policy if exists netzwerk_empfaenger_admin on public.netzwerk_empfaenger;
create policy netzwerk_empfaenger_admin on public.netzwerk_empfaenger
  for all using (public.ist_nest_admin()) with check (public.ist_nest_admin());
drop policy if exists netzwerk_antworten_admin on public.netzwerk_antworten;
create policy netzwerk_antworten_admin on public.netzwerk_antworten
  for all using (public.ist_nest_admin()) with check (public.ist_nest_admin());

-- Partner stellt eine Frage ans Netzwerk (höchstens 10 pro Tag).
create or replace function public.netzwerk_frage_stellen(p_frage text, p_ergaenzung text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if not public.ist_partner() then raise exception 'kein_partner'; end if;
  if (select count(*) from public.netzwerk_fragen
        where partner_id = auth.uid() and created_at > now() - interval '1 day') >= 10 then
    raise exception 'limit_erreicht';
  end if;
  insert into public.netzwerk_fragen (partner_id, firma, frage, ergaenzung)
    values (auth.uid(), public.konto_firma(auth.uid()), trim(p_frage), nullif(trim(coalesce(p_ergaenzung, '')), ''))
    returning id into v_id;
  return v_id;
end $$;
revoke execute on function public.netzwerk_frage_stellen(text, text) from public, anon;
grant execute on function public.netzwerk_frage_stellen(text, text) to authenticated;

-- NEST gibt eine Frage an ausgewählte Betriebe weiter. Liefert die E-Mail-
-- Adressen der neu hinzugekommenen Empfänger (für die Benachrichtigung).
create or replace function public.netzwerk_weitergeben(p_frage_id uuid, p_text text, p_empfaenger uuid[])
returns table (email text, firma text)
language plpgsql security definer set search_path = public as $$
declare v_fragender uuid;
begin
  if not public.ist_nest_admin() then raise exception 'kein_admin'; end if;
  select partner_id into v_fragender from public.netzwerk_fragen where id = p_frage_id;
  if v_fragender is null then raise exception 'frage_unbekannt'; end if;
  update public.netzwerk_fragen
    set frage_weitergabe = nullif(trim(coalesce(p_text, '')), ''),
        weitergegeben_am = coalesce(weitergegeben_am, now())
    where id = p_frage_id;
  return query
    with neu as (
      insert into public.netzwerk_empfaenger (frage_id, partner_id, firma)
        select p_frage_id, u, public.konto_firma(u)
        from unnest(p_empfaenger) as u
        where u <> v_fragender and exists (select 1 from public.partner p where p.user_id = u)
      on conflict do nothing
      returning netzwerk_empfaenger.partner_id, netzwerk_empfaenger.firma
    )
    select au.email::text, neu.firma from neu join auth.users au on au.id = neu.partner_id;
end $$;
revoke execute on function public.netzwerk_weitergeben(uuid, text, uuid[]) from public, anon;
grant execute on function public.netzwerk_weitergeben(uuid, text, uuid[]) to authenticated;

-- Ein Betrieb beantwortet eine an ihn weitergegebene Frage (erneutes Senden
-- überschreibt die eigene Antwort). Liefert E-Mail des Fragenden und die Frage.
create or replace function public.netzwerk_antwort_geben(p_frage_id uuid, p_antwort text, p_name_zeigen boolean, p_fuer_assistent boolean)
returns table (fragender_email text, frage text, neu boolean)
language plpgsql security definer set search_path = public as $$
declare v_neu boolean;
begin
  if not exists (select 1 from public.netzwerk_empfaenger e
                 where e.frage_id = p_frage_id and e.partner_id = auth.uid()) then
    raise exception 'nicht_empfaenger';
  end if;
  v_neu := not exists (select 1 from public.netzwerk_antworten a
                       where a.frage_id = p_frage_id and a.partner_id = auth.uid());
  insert into public.netzwerk_antworten (frage_id, partner_id, firma, antwort, name_zeigen, fuer_assistent)
    values (p_frage_id, auth.uid(), public.konto_firma(auth.uid()), trim(p_antwort),
            coalesce(p_name_zeigen, true), coalesce(p_fuer_assistent, false))
    on conflict (frage_id, partner_id) do update
      set antwort = excluded.antwort, name_zeigen = excluded.name_zeigen,
          fuer_assistent = excluded.fuer_assistent, updated_at = now();
  return query
    select au.email::text, coalesce(f.frage_weitergabe, f.frage), v_neu
    from public.netzwerk_fragen f join auth.users au on au.id = f.partner_id
    where f.id = p_frage_id;
end $$;
revoke execute on function public.netzwerk_antwort_geben(uuid, text, boolean, boolean) from public, anon;
grant execute on function public.netzwerk_antwort_geben(uuid, text, boolean, boolean) to authenticated;

-- Alles, was ein Betrieb im Netzwerk-Bereich sieht: eigene Fragen mit den
-- Antworten (Firmenname nur, wenn der Antwortende das erlaubt) und die an ihn
-- weitergegebenen Fragen (ohne den fragenden Betrieb).
create or replace function public.netzwerk_meine()
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'nicht_angemeldet'; end if;
  return jsonb_build_object(
    'eigene', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id, 'frage', f.frage, 'ergaenzung', f.ergaenzung, 'created_at', f.created_at,
        'antworten', coalesce((
          select jsonb_agg(jsonb_build_object(
            'antwort', a.antwort,
            'firma', case when a.name_zeigen then a.firma end,
            'created_at', a.created_at) order by a.created_at)
          from public.netzwerk_antworten a where a.frage_id = f.id), '[]'::jsonb)
      ) order by f.created_at desc)
      from public.netzwerk_fragen f where f.partner_id = auth.uid()), '[]'::jsonb),
    'an_mich', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id, 'frage', coalesce(f.frage_weitergabe, f.frage), 'erhalten_am', e.created_at,
        'meine_antwort', (
          select jsonb_build_object('antwort', a.antwort, 'name_zeigen', a.name_zeigen,
                                    'fuer_assistent', a.fuer_assistent, 'created_at', a.created_at)
          from public.netzwerk_antworten a where a.frage_id = f.id and a.partner_id = auth.uid())
      ) order by e.created_at desc)
      from public.netzwerk_empfaenger e join public.netzwerk_fragen f on f.id = e.frage_id
      where e.partner_id = auth.uid()), '[]'::jsonb)
  );
end $$;
revoke execute on function public.netzwerk_meine() from public, anon;
grant execute on function public.netzwerk_meine() to authenticated;

-- Admin: alle registrierten Konten mit Partner-Status und Ausbildungsberufen
create or replace function public.admin_konten()
returns table (user_id uuid, email text, firma text, registriert_am timestamptz, partner boolean, berufe text[])
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.ist_nest_admin() then raise exception 'kein_admin'; end if;
  return query
    select u.id, u.email::text, nullif(trim(u.raw_user_meta_data ->> 'firma'), ''), u.created_at,
      exists (select 1 from public.partner p where p.user_id = u.id),
      coalesce((select array_agg(distinct s.beruf order by s.beruf) from public.stellen s
                where s.partner_id = u.id and s.beruf is not null), '{}')
    from auth.users u
    where coalesce(u.email, '') <> 'info@nest-bildungsbar.de'
    order by lower(coalesce(nullif(trim(u.raw_user_meta_data ->> 'firma'), ''), u.email));
end $$;
revoke execute on function public.admin_konten() from public, anon;
grant execute on function public.admin_konten() to authenticated;
