-- =====================================================================
-- NEST BildungsBar – Anmeldungen von Unternehmen zu Veranstaltungen
-- Im Supabase-Dashboard unter "SQL Editor" einfügen und ausführen.
-- (Setzt die Tabelle `veranstaltungen` aus schema.sql voraus.)
-- =====================================================================

-- ---------- VERANSTALTUNGS-ANMELDUNGEN (Unternehmen melden sich an) ----------
create table if not exists public.veranstaltung_anmeldungen (
  id               uuid primary key default gen_random_uuid(),
  veranstaltung_id uuid not null references public.veranstaltungen(id) on delete cascade,
  firma            text not null,
  name             text not null,
  email            text not null,
  telefon          text,
  personen         int  not null default 1,
  nachricht        text,
  created_at       timestamptz not null default now()
);

create index if not exists veranstaltung_anmeldungen_event_idx
  on public.veranstaltung_anmeldungen (veranstaltung_id);

alter table public.veranstaltung_anmeldungen enable row level security;

-- Jede:r darf sich (als Unternehmen) zu einer Veranstaltung anmelden
drop policy if exists "va_anmeldung_insert_public" on public.veranstaltung_anmeldungen;
create policy "va_anmeldung_insert_public" on public.veranstaltung_anmeldungen
  for insert with check ( true );

-- Nur der Admin darf die Anmeldungen sehen und löschen
drop policy if exists "va_anmeldung_admin_select" on public.veranstaltung_anmeldungen;
create policy "va_anmeldung_admin_select" on public.veranstaltung_anmeldungen
  for select using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "va_anmeldung_admin_delete" on public.veranstaltung_anmeldungen;
create policy "va_anmeldung_admin_delete" on public.veranstaltung_anmeldungen
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

-- Aggregierte Anmeldezahl pro Veranstaltung (nur ID + Anzahl, keine
-- persönlichen Daten). SECURITY DEFINER, damit die öffentliche Kalender-Seite
-- anzeigen kann, wie viele Unternehmen bereits angemeldet sind.
create or replace function public.veranstaltung_anmeldungen_anzahl()
returns table(veranstaltung_id uuid, anzahl bigint)
language sql security definer set search_path = public as $$
  select veranstaltung_id, count(*)::bigint
  from public.veranstaltung_anmeldungen
  group by veranstaltung_id;
$$;
grant execute on function public.veranstaltung_anmeldungen_anzahl() to anon, authenticated;
