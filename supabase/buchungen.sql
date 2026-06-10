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
  erinnert_am date,
  created_at  timestamptz not null default now()
);

-- Falls die Tabelle schon ohne diese Spalte existiert:
alter table public.buchungen add column if not exists erinnert_am date;

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

-- Aggregierte Belegung pro Tag (Datum + Anzahl) für die Ausgebucht-Anzeige
create or replace function public.termin_belegung(p_standort text)
returns table(datum date, anzahl bigint)
language sql security definer set search_path = public as $$
  select datum, count(*)::bigint
  from public.buchungen
  where standort = p_standort and datum is not null and datum >= current_date
  group by datum;
$$;
grant execute on function public.termin_belegung(text) to anon, authenticated;
