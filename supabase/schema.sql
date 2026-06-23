-- =====================================================================
-- NEST BildungsBar – Supabase-Schema
-- Im Supabase-Dashboard unter "SQL Editor" einfügen und ausführen.
-- =====================================================================

-- ---------- STELLEN (Ausbildungsangebote der Partner) ----------
create table if not exists public.stellen (
  id            uuid primary key default gen_random_uuid(),
  partner_id    uuid not null references auth.users(id) on delete cascade,
  firma         text not null,
  beruf         text not null,
  art           text not null default 'Ausbildung',
  ort           text not null default 'Wuppertal',
  start         text,
  url           text,
  aktiviert_am  date not null default current_date,
  created_at    timestamptz not null default now()
);

alter table public.stellen enable row level security;

-- Jede:r darf aktive Stellen lesen (öffentliche Jobbörse, 30 Tage)
drop policy if exists "stellen_select_public" on public.stellen;
create policy "stellen_select_public" on public.stellen
  for select using ( aktiviert_am >= (current_date - interval '30 days') );

-- Partner dürfen nur eigene Stellen anlegen/ändern/löschen
drop policy if exists "stellen_insert_own" on public.stellen;
create policy "stellen_insert_own" on public.stellen
  for insert with check ( auth.uid() = partner_id );

drop policy if exists "stellen_update_own" on public.stellen;
create policy "stellen_update_own" on public.stellen
  for update using ( auth.uid() = partner_id );

drop policy if exists "stellen_delete_own" on public.stellen;
create policy "stellen_delete_own" on public.stellen
  for delete using ( auth.uid() = partner_id );

-- Damit Partner ihre eigenen Stellen (auch ältere) im Portal sehen:
drop policy if exists "stellen_select_own" on public.stellen;
create policy "stellen_select_own" on public.stellen
  for select using ( auth.uid() = partner_id );


-- ---------- VERANSTALTUNGEN (Kalender) ----------
create table if not exists public.veranstaltungen (
  id           uuid primary key default gen_random_uuid(),
  titel        text not null,
  datum        date not null,
  uhrzeit      text,
  ort          text,
  adresse      text,           -- genaue Adresse (Straße, PLZ, Ort)
  bild_url     text,           -- optionales Bild zur Veranstaltung
  beschreibung text,
  created_at   timestamptz not null default now()
);

-- Falls die Tabelle schon existiert: Spalten nachrüsten
alter table public.veranstaltungen add column if not exists adresse text;
alter table public.veranstaltungen add column if not exists bild_url text;

alter table public.veranstaltungen enable row level security;

drop policy if exists "events_select_public" on public.veranstaltungen;
create policy "events_select_public" on public.veranstaltungen
  for select using ( true );

-- Admin (info@nest-bildungsbar.de) darf Veranstaltungen anlegen/ändern/löschen
drop policy if exists "events_admin_insert" on public.veranstaltungen;
create policy "events_admin_insert" on public.veranstaltungen
  for insert with check ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "events_admin_update" on public.veranstaltungen;
create policy "events_admin_update" on public.veranstaltungen
  for update using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "events_admin_delete" on public.veranstaltungen;
create policy "events_admin_delete" on public.veranstaltungen
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );


-- ---------- BLOG / POSTS ----------
create table if not exists public.posts (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  titel             text not null,
  excerpt           text,
  inhalt            text,           -- HTML
  bild_url          text,
  published         boolean not null default false,
  veroeffentlicht_am date not null default current_date,
  created_at        timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "posts_select_public" on public.posts;
create policy "posts_select_public" on public.posts
  for select using ( published = true );

-- Admin darf alle Beiträge sehen (auch Entwürfe) und verwalten
drop policy if exists "posts_admin_select" on public.posts;
create policy "posts_admin_select" on public.posts
  for select using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "posts_admin_insert" on public.posts;
create policy "posts_admin_insert" on public.posts
  for insert with check ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "posts_admin_update" on public.posts;
create policy "posts_admin_update" on public.posts
  for update using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "posts_admin_delete" on public.posts;
create policy "posts_admin_delete" on public.posts
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );


-- ---------- BUCHUNGEN (Terminanfragen der Schüler:innen) ----------
create table if not exists public.buchungen (
  id          uuid primary key default gen_random_uuid(),
  standort    text not null,
  datum       date,
  datum_text  text,
  uhrzeit     text not null,
  name        text not null,
  email       text,
  telefon     text,
  schule      text,
  nachricht   text,
  erinnert_am date,
  created_at  timestamptz not null default now()
);

alter table public.buchungen enable row level security;

-- Jede:r darf eine Buchung absenden (öffentliches Formular)
drop policy if exists "buchungen_insert_public" on public.buchungen;
create policy "buchungen_insert_public" on public.buchungen
  for insert with check ( true );

-- Nur der Admin darf Buchungen sehen und löschen
drop policy if exists "buchungen_admin_select" on public.buchungen;
create policy "buchungen_admin_select" on public.buchungen
  for select using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "buchungen_admin_delete" on public.buchungen;
create policy "buchungen_admin_delete" on public.buchungen
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

-- Aggregierte Belegung pro Tag (nur Datum + Anzahl, keine persönlichen Daten).
-- SECURITY DEFINER, damit das öffentliche Formular freie/ausgebuchte Tage anzeigen kann.
create or replace function public.termin_belegung(p_standort text)
returns table(datum date, anzahl bigint)
language sql security definer set search_path = public as $$
  select datum, count(*)::bigint
  from public.buchungen
  where standort = p_standort and datum is not null and datum >= current_date
  group by datum;
$$;
grant execute on function public.termin_belegung(text) to anon, authenticated;


-- =====================================================================
-- BEISPIELDATEN (optional – zum Testen, danach löschbar)
-- =====================================================================
insert into public.veranstaltungen (titel, datum, uhrzeit, ort, beschreibung) values
  ('OpenHouse Wuppertal', (current_date + 7), '17:00–19:00', 'Wuppertal', 'Offener Abend mit Partnerunternehmen.'),
  ('Bewerbungstraining',  (current_date + 14), '17:00–18:30', 'Essen', 'Fit fürs Vorstellungsgespräch.')
on conflict do nothing;

insert into public.posts (slug, titel, excerpt, inhalt, published, veroeffentlicht_am) values
  ('willkommen', 'Willkommen bei der NEST BildungsBar',
   'Warum wir Berufsorientierung anders machen – locker, kostenlos und auf Augenhöhe.',
   '<p>Die NEST BildungsBar ist dein Ort für ehrliche Berufsorientierung. In diesem ersten Beitrag erzählen wir, wie alles begann …</p><p>Schau gern an einem unserer Standorte vorbei!</p>',
   true, current_date)
on conflict (slug) do nothing;

-- HINWEIS: Partner-Accounts legst du unter "Authentication -> Users -> Add user"
-- an (E-Mail + Passwort). Mit diesen Daten loggen sich Partner unter
-- /partner-portal ein und können Stellen veröffentlichen.
