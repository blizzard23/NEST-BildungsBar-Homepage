-- =====================================================================
-- NACHTRAG: Tabelle "buchungen" (Terminbuchungen der Schüler:innen)
-- Nur nötig, wenn schema.sql bereits OHNE diese Tabelle ausgeführt wurde.
-- Im Supabase "SQL Editor" einfügen und ausführen.
-- =====================================================================

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
  created_at  timestamptz not null default now()
);

alter table public.buchungen enable row level security;

drop policy if exists "buchungen_insert_public" on public.buchungen;
create policy "buchungen_insert_public" on public.buchungen
  for insert with check ( true );

drop policy if exists "buchungen_admin_select" on public.buchungen;
create policy "buchungen_admin_select" on public.buchungen
  for select using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "buchungen_admin_delete" on public.buchungen;
create policy "buchungen_admin_delete" on public.buchungen
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );
