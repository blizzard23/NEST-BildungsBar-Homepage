-- =====================================================================
-- NEST Explore – automatischer Hinweis an Unternehmen bei neuen Terminen
-- Im Supabase-Dashboard unter "SQL Editor" einfügen und ausführen.
-- (additiv – kann gefahrlos auf einer bestehenden DB ausgeführt werden)
--
-- 1) explore_praeferenzen: Was ein Unternehmen im Partner-Portal angibt –
--    ob es Hinweise möchte, welche Orte und welche Schulformen.
-- 2) explore_hinweise: Welches Unternehmen zu welchem Termin schon eine Mail
--    bekommen hat. Verhindert doppelte Mails, falls der Cron und der
--    Admin-Button gleichzeitig laufen.
--
-- Verschickt wird über /api/cron/explore-hinweise (täglicher Vercel-Cron bzw.
-- Button im Admin-Bereich). Die Route liest mit dem Service-Role-Key und
-- braucht deshalb keine eigenen Policies.
-- =====================================================================

-- ---------- 1) PRÄFERENZEN (eine Zeile pro Partner-Zugang) ----------
create table if not exists public.explore_praeferenzen (
  user_id         uuid primary key references auth.users(id) on delete cascade,
  aktiv           boolean not null default false,
  orte            text[]  not null default '{}',  -- leer = alle Orte
  schulformen     text[]  not null default '{}',  -- leer = alle Schulformen
  aktiv_seit      timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);

-- aktiv_seit legt fest, ab welchem Termin ein Unternehmen Hinweise bekommt:
-- nur Termine, die NACH dem Einschalten angelegt wurden. Sonst käme beim
-- Einschalten eine Sammelmail mit allen schon bekannten Terminen – die stehen
-- ohnehin im Portal. Der Zeitpunkt wird hier gesetzt, nicht im Browser.
create or replace function public.explore_praeferenzen_stempel()
returns trigger language plpgsql set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    new.aktiv_seit := now();
  elsif new.aktiv and not old.aktiv then
    new.aktiv_seit := now();
  else
    new.aktiv_seit := old.aktiv_seit;
  end if;
  new.aktualisiert_am := now();
  return new;
end $$;

drop trigger if exists explore_praeferenzen_stempel on public.explore_praeferenzen;
create trigger explore_praeferenzen_stempel
  before insert or update on public.explore_praeferenzen
  for each row execute function public.explore_praeferenzen_stempel();

alter table public.explore_praeferenzen enable row level security;

-- Jedes Unternehmen sieht und ändert nur die eigene Zeile
drop policy if exists "explore_praef_eigene_select" on public.explore_praeferenzen;
create policy "explore_praef_eigene_select" on public.explore_praeferenzen
  for select to authenticated
  using ( auth.uid() = user_id );

drop policy if exists "explore_praef_eigene_insert" on public.explore_praeferenzen;
create policy "explore_praef_eigene_insert" on public.explore_praeferenzen
  for insert to authenticated
  with check ( auth.uid() = user_id );

drop policy if exists "explore_praef_eigene_update" on public.explore_praeferenzen;
create policy "explore_praef_eigene_update" on public.explore_praeferenzen
  for update to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- ---------- 2) VERSCHICKTE HINWEISE ----------
create table if not exists public.explore_hinweise (
  termin_id   uuid not null references public.messe_termine(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  gesendet_am timestamptz not null default now(),
  primary key (termin_id, user_id)
);

-- RLS an, aber keine Policies: nur der Service-Role-Key (Cron) liest und schreibt.
alter table public.explore_hinweise enable row level security;
