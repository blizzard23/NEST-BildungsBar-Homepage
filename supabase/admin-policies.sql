-- =====================================================================
-- NACHTRAG: Admin-Rechte für info@nest-bildungsbar.de
-- Nur nötig, wenn schema.sql bereits OHNE diese Regeln ausgeführt wurde.
-- Im Supabase "SQL Editor" einfügen und ausführen.
-- =====================================================================

-- Veranstaltungen: Admin darf anlegen/ändern/löschen
drop policy if exists "events_admin_insert" on public.veranstaltungen;
create policy "events_admin_insert" on public.veranstaltungen
  for insert with check ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "events_admin_update" on public.veranstaltungen;
create policy "events_admin_update" on public.veranstaltungen
  for update using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "events_admin_delete" on public.veranstaltungen;
create policy "events_admin_delete" on public.veranstaltungen
  for delete using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

-- Blog: Admin darf alles sehen + verwalten
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
