-- =====================================================================
--  NEST BildungsBar – Ansprechpartner-Tabelle, Stellen-Logo & Logo-Bucket
--  (additiv – kann gefahrlos auf einer bestehenden DB ausgeführt werden)
--  Im SQL-Editor von Supabase ausführen.
-- =====================================================================

-- 1) Optionales Firmen-Logo für Stellen (wird in der Berufswelt statt der
--    Buchstaben angezeigt).
alter table public.stellen add column if not exists logo_url text;

-- 2) Ansprechpartner (Team) – im Partner-Portal vom Admin pflegbar (mit Bild),
--    öffentlich lesbar.
create table if not exists public.ansprechpartner (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rolle text,
  email text,
  telefon text,
  standort text,
  bild_url text,
  beschreibung text,
  sortierung int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ansprechpartner enable row level security;

drop policy if exists ansprechpartner_select_public on public.ansprechpartner;
create policy ansprechpartner_select_public on public.ansprechpartner
  for select using (true);

drop policy if exists ansprechpartner_admin_insert on public.ansprechpartner;
create policy ansprechpartner_admin_insert on public.ansprechpartner
  for insert with check ((auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de');

drop policy if exists ansprechpartner_admin_update on public.ansprechpartner;
create policy ansprechpartner_admin_update on public.ansprechpartner
  for update using ((auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de');

drop policy if exists ansprechpartner_admin_delete on public.ansprechpartner;
create policy ansprechpartner_admin_delete on public.ansprechpartner
  for delete using ((auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de');

-- 3) Öffentlicher Storage-Bucket "logos" für Firmen-Logos & Ansprechpartner-Bilder.
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do update set public = true;

drop policy if exists "logos_public_read" on storage.objects;
create policy "logos_public_read" on storage.objects
  for select using (bucket_id = 'logos');

drop policy if exists "logos_auth_insert" on storage.objects;
create policy "logos_auth_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'logos');

drop policy if exists "logos_auth_update" on storage.objects;
create policy "logos_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'logos');

drop policy if exists "logos_auth_delete" on storage.objects;
create policy "logos_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'logos');
