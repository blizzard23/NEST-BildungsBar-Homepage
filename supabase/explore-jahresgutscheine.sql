-- =====================================================================
-- NEST Explore – Jahresgutschein für Partnerunternehmen
--
-- Jedes Unternehmen im Partner-Login bekommt einmal im Jahr einen
-- Gutscheincode für eine NEST-Explore-Veranstaltung (100 %, also ein
-- kostenfreier Platz – so steht es im Partnerpaket: „Ein Termin NEST Explore
-- pro Jahr ist enthalten").
--
-- Regeln:
--   - Pro Partner-Konto und Jahr genau ein Code (eindeutiger Index).
--   - Der Code gilt nur für Termine im Gutscheinjahr und lässt sich nur
--     einlösen, solange das Gutscheinjahr „ausgegeben" ist (siehe
--     explore_gutscheinjahre): im Kalenderjahr selbst und ab 1. Dezember des
--     Vorjahres, damit Partner schon im Dezember die Termine im neuen Jahr
--     buchen können. Start ist 2027; der Gutschein 2027 ist bereits ab
--     Einführung (November 2026) sichtbar, weil die ersten Termine im Februar
--     2027 liegen.
--   - Nicht übertragbar: Eingelöst werden kann er nur mit der E-Mail-Adresse
--     des Partner-Zugangs oder einer anderen Adresse derselben Firmen-Domain.
--     Bei Freemail-Adressen (gmail.com, web.de …) nur mit genau der Adresse.
--   - Der Admin (info@nest-bildungsbar.de) kann einzelne Codes sperren, z. B.
--     wenn sich jemand registriert hat, der gar kein NEST-Partner ist.
--
-- Die Codes liegen in der bestehenden Tabelle `messe_gutscheine`
-- (art = 'jahresgutschein'). Damit greift die vorhandene Einlösung im
-- Buchungsformular auf nest-explore.de (buche_messe_platz) und die Codes
-- erscheinen auch im Admin-Portal von nest-explore.de unter „Gutscheine".
--
-- Die Unternehmen lesen ihren Code nur über mein_explore_gutschein(), die
-- Tabelle selbst bleibt (wie bisher) nur für den Admin lesbar.
--
-- Im Supabase-Projekt als Migration `messe_jahresgutscheine` eingespielt.
-- Die Datei ist idempotent und kann erneut ausgeführt werden.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) Spalten
-- ---------------------------------------------------------------------
alter table public.messe_gutscheine
  add column if not exists art text not null default 'einzeln',
  add column if not exists jahr integer,
  add column if not exists partner_id uuid references auth.users(id) on delete set null,
  add column if not exists gesperrt boolean not null default false;

alter table public.messe_gutscheine drop constraint if exists messe_gutscheine_art_check;
alter table public.messe_gutscheine add constraint messe_gutscheine_art_check
  check (art in ('einzeln', 'jahresgutschein'));

-- Ein Jahresgutschein hat immer ein Jahr, ein einzelner Code nie.
alter table public.messe_gutscheine drop constraint if exists messe_gutscheine_jahr_check;
alter table public.messe_gutscheine add constraint messe_gutscheine_jahr_check
  check ((art = 'jahresgutschein') = (jahr is not null) and (jahr is null or jahr between 2027 and 2100));

-- Einmal im Jahr: pro Partner-Konto und Jahr höchstens ein Jahresgutschein.
create unique index if not exists messe_gutscheine_partner_jahr_key
  on public.messe_gutscheine (partner_id, jahr) where art = 'jahresgutschein';

-- ---------------------------------------------------------------------
-- 2) Hilfsfunktionen
-- ---------------------------------------------------------------------

-- Heutiges Datum in Deutschland (Jahreswechsel um Mitternacht deutscher Zeit)
create or replace function public.explore_heute() returns date
language sql stable set search_path = '' as $$
  select (now() at time zone 'Europe/Berlin')::date
$$;

-- Gutscheinjahre, die gerade ausgegeben sind und eingelöst werden können:
-- das laufende Jahr und ab 1. Dezember zusätzlich das Folgejahr.
-- Erstes Gutscheinjahr ist 2027 (schon ab Einführung im November 2026).
create or replace function public.explore_gutscheinjahre() returns integer[]
language sql stable set search_path = '' as $$
  with h as (select public.explore_heute() as d)
  select coalesce(array_agg(j order by j), '{}')
    from h, lateral (
      select distinct j from unnest(array[
        extract(year from d)::int,
        case when extract(month from d) = 12 then extract(year from d)::int + 1 end,
        case when d < date '2027-01-01' then 2027 end
      ]) as j
      where j is not null and j >= 2027
    ) x
$$;

-- Freemail-Anbieter: Hier reicht die gleiche Domain nicht, es muss genau die
-- Adresse des Partner-Zugangs sein.
create or replace function public.explore_freemail(p_domain text) returns boolean
language sql immutable set search_path = '' as $$
  select lower(coalesce(p_domain, '')) = any (array[
    'gmail.com', 'googlemail.com', 'web.de', 'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch',
    'gmx.com', 'gmx.info', 't-online.de', 'outlook.com', 'outlook.de', 'hotmail.com',
    'hotmail.de', 'live.com', 'live.de', 'msn.com', 'yahoo.com', 'yahoo.de', 'ymail.com',
    'icloud.com', 'me.com', 'mac.com', 'aol.com', 'aol.de', 'freenet.de', 'posteo.de',
    'posteo.net', 'mailbox.org', 'arcor.de', 'online.de', 'mail.de', 'email.de',
    'proton.me', 'protonmail.com', 'protonmail.ch', 'vodafone.de', 'kabelmail.de',
    'magenta.de', 'unitybox.de', 'web.com', 'mail.com'
  ])
$$;

-- Darf mit dieser E-Mail-Adresse der Gutschein eines Kontos eingelöst werden?
-- Genau dieselbe Adresse, oder dieselbe Firmen-Domain (nicht bei Freemail).
create or replace function public.explore_email_passt(p_konto text, p_email text) returns boolean
language sql immutable set search_path = '' as $$
  with x as (
    select lower(trim(coalesce(p_konto, ''))) as k,
           lower(trim(coalesce(p_email, ''))) as e
  ), d as (
    select k, e,
           substring(k from '@([^@\s]+)$') as dk,
           substring(e from '@([^@\s]+)$') as de
      from x
  )
  select case
    when k = '' or e = '' or dk is null or de is null then false
    when k = e then true
    when public.explore_freemail(dk) then false
    else dk = de
  end
  from d
$$;

-- Warum lässt sich ein Code gerade nicht einlösen? null = alles in Ordnung.
-- p_email null heißt „noch nicht bekannt" (Vorab-Prüfung im Formular, bevor
-- die Adresse eingetragen ist); beim Buchen wird immer eine Adresse geprüft.
create or replace function public.explore_gutschein_sperrgrund(
  p_g public.messe_gutscheine, p_email text, p_termin_datum date
) returns text
language plpgsql stable security definer set search_path = public as $$
declare
  v_jahre int[] := explore_gutscheinjahre();
  v_konto text;
begin
  if p_g.id is null then return 'unbekannt'; end if;
  if p_g.eingeloest_am is not null then return 'eingeloest'; end if;
  if p_g.gesperrt then return 'gesperrt'; end if;
  if p_g.art = 'jahresgutschein' then
    if not (p_g.jahr = any (v_jahre)) then
      return case when cardinality(v_jahre) > 0 and p_g.jahr > v_jahre[cardinality(v_jahre)]
                  then 'noch_nicht_gueltig' else 'abgelaufen' end;
    end if;
    if p_termin_datum is not null and extract(year from p_termin_datum)::int <> p_g.jahr then
      return 'anderes_jahr';
    end if;
    -- Konto gelöscht: Der Code ist an niemanden mehr gebunden und verfällt.
    if p_g.partner_id is null then return 'nicht_uebertragbar'; end if;
    if p_email is not null then
      select u.email into v_konto from auth.users u where u.id = p_g.partner_id;
      if not explore_email_passt(v_konto, p_email) then return 'nicht_uebertragbar'; end if;
    end if;
  end if;
  return null;
end $$;

-- Zufallscode wie NEST27-K7QM-3XPA (ohne leicht verwechselbare Zeichen)
create or replace function public.explore_code_neu(p_jahr int) returns text
language plpgsql volatile set search_path = '' as $$
declare
  z constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  b bytea := decode(replace(gen_random_uuid()::text, '-', ''), 'hex');
  s text := '';
  i int;
begin
  -- Byte 6 und 8 der UUID tragen Versions-/Variantenbits, deshalb 9 bis 16.
  for i in 8..15 loop
    s := s || substr(z, (get_byte(b, i) % length(z)) + 1, 1);
  end loop;
  return 'NEST' || lpad((p_jahr % 100)::text, 2, '0') || '-' || substr(s, 1, 4) || '-' || substr(s, 5, 4);
end $$;

-- Jahresgutschein eines Kontos holen und, falls es ihn noch nicht gibt,
-- ausstellen. Nur für bestätigte Konten und nur für ausgegebene Jahre.
create or replace function public.explore_jahresgutschein_ausstellen(p_user uuid, p_jahr int)
returns public.messe_gutscheine
language plpgsql volatile security definer set search_path = public as $$
declare
  g messe_gutscheine%rowtype;
  v_firma text;
  v_email text;
  v_versuch int := 0;
begin
  select * into g from messe_gutscheine
   where partner_id = p_user and jahr = p_jahr and art = 'jahresgutschein';
  if found then return g; end if;

  if not (p_jahr = any (explore_gutscheinjahre())) then return null; end if;

  select nullif(trim(u.raw_user_meta_data ->> 'firma'), ''), u.email::text
    into v_firma, v_email
    from auth.users u
   where u.id = p_user
     and u.email_confirmed_at is not null
     and coalesce(u.email, '') <> 'info@nest-bildungsbar.de';
  if not found then return null; end if;

  loop
    begin
      insert into messe_gutscheine (code, rabatt, art, jahr, partner_id, unternehmen, notiz)
      values (explore_code_neu(p_jahr), 100, 'jahresgutschein', p_jahr, p_user,
              coalesce(v_firma, v_email),
              'Jahresgutschein ' || p_jahr || ' für den Partner-Zugang ' || v_email || ', nicht übertragbar')
      on conflict (partner_id, jahr) where art = 'jahresgutschein' do nothing
      returning * into g;
      if g.id is null then
        -- gleichzeitig schon angelegt (z. B. zwei Tabs): den vorhandenen nehmen
        select * into g from messe_gutscheine
         where partner_id = p_user and jahr = p_jahr and art = 'jahresgutschein';
      end if;
      return g;
    exception when unique_violation then
      -- Zufallscode gibt es schon (sehr unwahrscheinlich): neuer Versuch
      v_versuch := v_versuch + 1;
      if v_versuch >= 5 then raise; end if;
    end;
  end loop;
end $$;

revoke execute on function public.explore_gutschein_sperrgrund(public.messe_gutscheine, text, date) from public, anon, authenticated;
revoke execute on function public.explore_jahresgutschein_ausstellen(uuid, int) from public, anon, authenticated;
revoke execute on function public.explore_code_neu(int) from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- 3) Partner-Login: eigener Jahresgutschein
-- ---------------------------------------------------------------------
create or replace function public.mein_explore_gutschein()
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_email text;
  v_domain text;
  v_jahr int;
  g messe_gutscheine%rowtype;
  v_liste jsonb := '[]'::jsonb;
begin
  if v_uid is null then raise exception 'nicht_angemeldet'; end if;
  if public.ist_nest_admin() then
    return jsonb_build_object('admin', true, 'gutscheine', '[]'::jsonb);
  end if;

  select u.email::text into v_email from auth.users u where u.id = v_uid;
  v_domain := lower(substring(coalesce(v_email, '') from '@([^@\s]+)$'));

  foreach v_jahr in array explore_gutscheinjahre() loop
    g := explore_jahresgutschein_ausstellen(v_uid, v_jahr);
    if g.id is null then continue; end if;
    v_liste := v_liste || jsonb_build_object(
      'jahr', g.jahr,
      'rabatt', g.rabatt,
      -- Gesperrte Codes werden dem Unternehmen nicht angezeigt.
      'code', case when g.gesperrt then null else g.code end,
      'gesperrt', g.gesperrt,
      'eingeloest_am', g.eingeloest_am,
      'termin_text', (select b.termin_text from messe_buchungen b where b.id = g.buchung_id),
      'schule', (select b.schule from messe_buchungen b where b.id = g.buchung_id),
      'gueltig_bis', make_date(g.jahr, 12, 31)
    );
  end loop;

  return jsonb_build_object(
    'email', v_email,
    'firmen_domain', case when v_domain is null or explore_freemail(v_domain) then null else v_domain end,
    'gutscheine', v_liste
  );
end $$;
revoke execute on function public.mein_explore_gutschein() from public, anon;
grant execute on function public.mein_explore_gutschein() to authenticated;

-- ---------------------------------------------------------------------
-- 4) Admin: Übersicht, wer seinen Gutschein schon eingelöst hat
--    Für ein ausgegebenes Jahr werden fehlende Codes dabei gleich
--    ausgestellt, damit jedes bestätigte Konto seinen Code hat (z. B. um ihn
--    am Telefon durchzugeben).
-- ---------------------------------------------------------------------
create or replace function public.admin_explore_jahresgutscheine(p_jahr int default null)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  v_jahre int[] := explore_gutscheinjahre();
  v_jahr int;
  v_uid uuid;
  v_zeilen jsonb;
  v_alle_jahre int[];
begin
  if not public.ist_nest_admin() then raise exception 'kein_admin'; end if;

  -- Standard: das laufende Jahr, sonst das erste ausgegebene Jahr
  v_jahr := coalesce(p_jahr,
    case when extract(year from explore_heute())::int = any (v_jahre)
         then extract(year from explore_heute())::int else v_jahre[1] end);

  if v_jahr = any (v_jahre) then
    for v_uid in
      select u.id from auth.users u
       where u.email_confirmed_at is not null
         and coalesce(u.email, '') <> 'info@nest-bildungsbar.de'
    loop
      perform explore_jahresgutschein_ausstellen(v_uid, v_jahr);
    end loop;
  end if;

  select coalesce(jsonb_agg(z order by lower(coalesce(z ->> 'firma', z ->> 'email', ''))), '[]'::jsonb)
    into v_zeilen
    from (
      select jsonb_build_object(
        'user_id', u.id,
        'email', u.email,
        'firma', coalesce(nullif(trim(u.raw_user_meta_data ->> 'firma'), ''), g.unternehmen),
        'registriert_am', u.created_at,
        'bestaetigt', u.email_confirmed_at is not null,
        'gutschein_id', g.id,
        'code', g.code,
        'gesperrt', coalesce(g.gesperrt, false),
        'ausgestellt_am', g.created_at,
        'eingeloest_am', g.eingeloest_am,
        'eingeloest_von', g.eingeloest_von,
        'buchung_id', g.buchung_id,
        'buchung_status', b.status,
        'buchung_email', b.email,
        'termin_text', b.termin_text,
        'schule', b.schule,
        'termin_datum', t.datum
      ) as z
      from auth.users u
      left join messe_gutscheine g
        on g.partner_id = u.id and g.art = 'jahresgutschein' and g.jahr = v_jahr
      left join messe_buchungen b on b.id = g.buchung_id
      left join messe_termine t on t.id = b.termin_id
      where coalesce(u.email, '') <> 'info@nest-bildungsbar.de'
      union all
      -- Codes, deren Partner-Konto inzwischen gelöscht wurde
      select jsonb_build_object(
        'user_id', null, 'email', null, 'firma', g.unternehmen, 'registriert_am', null,
        'bestaetigt', false, 'konto_geloescht', true,
        'gutschein_id', g.id, 'code', g.code, 'gesperrt', g.gesperrt,
        'ausgestellt_am', g.created_at, 'eingeloest_am', g.eingeloest_am,
        'eingeloest_von', g.eingeloest_von, 'buchung_id', g.buchung_id,
        'buchung_status', b.status, 'buchung_email', b.email,
        'termin_text', b.termin_text, 'schule', b.schule, 'termin_datum', t.datum
      )
      from messe_gutscheine g
      left join messe_buchungen b on b.id = g.buchung_id
      left join messe_termine t on t.id = b.termin_id
      where g.art = 'jahresgutschein' and g.jahr = v_jahr and g.partner_id is null
    ) x;

  select array_agg(j order by j) into v_alle_jahre from (
    select distinct jahr as j from messe_gutscheine where art = 'jahresgutschein'
    union select unnest(v_jahre)
    union select v_jahr
  ) y;

  return jsonb_build_object(
    'jahr', v_jahr,
    'jahre', to_jsonb(coalesce(v_alle_jahre, '{}')),
    'ausgegeben', v_jahr = any (v_jahre),
    'zeilen', v_zeilen
  );
end $$;
revoke execute on function public.admin_explore_jahresgutscheine(int) from public, anon;
grant execute on function public.admin_explore_jahresgutscheine(int) to authenticated;

-- ---------------------------------------------------------------------
-- 5) Vorab-Prüfung im Buchungsformular (nest-explore.de, /api/gutschein)
--    Neu: E-Mail und Termin werden mitgeprüft. Beide Parameter sind
--    optional, ältere Deployments rufen weiter nur mit p_code auf.
-- ---------------------------------------------------------------------
drop function if exists public.pruefe_messe_gutschein(text);
create or replace function public.pruefe_messe_gutschein(
  p_code text, p_email text default null, p_termin_id uuid default null
) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  g messe_gutscheine%rowtype;
  v_datum date;
  v_email text := nullif(trim(coalesce(p_email, '')), '');
  v_grund text;
begin
  select * into g from messe_gutscheine
   where upper(code) = upper(trim(coalesce(p_code, ''))) limit 1;
  if p_termin_id is not null then
    select t.datum into v_datum from messe_termine t where t.id = p_termin_id;
  end if;
  v_grund := explore_gutschein_sperrgrund(g, v_email, v_datum);
  if v_grund is not null then
    return jsonb_build_object('gueltig', false, 'grund', v_grund,
      'jahr', case when g.art = 'jahresgutschein' then g.jahr end);
  end if;
  return jsonb_build_object(
    'gueltig', true,
    'rabatt', g.rabatt,
    'jahresgutschein', g.art = 'jahresgutschein',
    'jahr', g.jahr,
    -- false = Jahresgutschein, aber noch ohne E-Mail geprüft
    'email_geprueft', g.art <> 'jahresgutschein' or v_email is not null
  );
end $$;
revoke execute on function public.pruefe_messe_gutschein(text, text, uuid) from public;
grant execute on function public.pruefe_messe_gutschein(text, text, uuid) to anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- 6) Buchung mit Gutscheincode: zusätzlich Jahr, Sperre und Bindung an das
--    Partner-Konto prüfen. Signatur unverändert, damit laufende Deployments
--    weiter buchen können. Neu in der Antwort: `grund` und `jahresgutschein`.
-- ---------------------------------------------------------------------
create or replace function public.buche_messe_platz(
  p_termin_id uuid, p_termin_text text, p_schule text, p_vorname text, p_nachname text,
  p_email text, p_telefon text, p_unternehmen text, p_berufe text, p_plaetze text,
  p_anmerkungen text, p_partner boolean, p_gutschein_code text,
  p_rechnung_strasse text default null, p_rechnung_plz text default null, p_rechnung_ort text default null
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_frei int;
  v_id uuid;
  v_code text := nullif(upper(trim(coalesce(p_gutschein_code, ''))), '');
  v_gutschein messe_gutscheine%rowtype;
  v_rabatt int := 0;
  v_datum date;
  v_grund text;
begin
  if v_code is not null then
    -- Zeile sperren: Wer zweimal gleichzeitig bucht, wartet hier und sieht
    -- danach den Code als eingelöst.
    select * into v_gutschein from messe_gutscheine
     where upper(code) = v_code
     for update;
    select t.datum into v_datum from messe_termine t where t.id = p_termin_id;
    v_grund := explore_gutschein_sperrgrund(v_gutschein, coalesce(p_email, ''), v_datum);
    if v_grund is not null then
      return jsonb_build_object('success', false, 'error', 'gutschein_ungueltig', 'grund', v_grund,
        'jahr', case when v_gutschein.art = 'jahresgutschein' then v_gutschein.jahr end);
    end if;
    v_rabatt := v_gutschein.rabatt;
  end if;

  update messe_termine
     set belegt = belegt + 1
   where id = p_termin_id and belegt < plaetze
   returning plaetze - belegt into v_frei;

  if not found then
    return jsonb_build_object('success', false, 'error', 'ausgebucht');
  end if;

  insert into messe_buchungen
    (termin_id, termin_text, schule, vorname, nachname, email, telefon,
     unternehmen, berufe, plaetze, anmerkungen, status,
     rechnung_strasse, rechnung_plz, rechnung_ort, partner,
     gutschein, gutschein_code, rabatt)
  values
    (p_termin_id, p_termin_text, p_schule, p_vorname, p_nachname, p_email, p_telefon,
     p_unternehmen, p_berufe, p_plaetze, p_anmerkungen, 'bestaetigt',
     p_rechnung_strasse, p_rechnung_plz, p_rechnung_ort, p_partner,
     v_rabatt = 100, v_gutschein.code, v_rabatt)
  returning id into v_id;

  if v_code is not null then
    update messe_gutscheine
       set eingeloest_am = now(), eingeloest_von = p_unternehmen, buchung_id = v_id
     where id = v_gutschein.id;
  end if;

  return jsonb_build_object('success', true, 'frei', v_frei, 'buchung_id', v_id, 'rabatt', v_rabatt,
    'jahresgutschein', coalesce(v_gutschein.art = 'jahresgutschein', false),
    'jahr', case when v_gutschein.art = 'jahresgutschein' then v_gutschein.jahr end);
end $$;
