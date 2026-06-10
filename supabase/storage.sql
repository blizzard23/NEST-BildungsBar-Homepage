-- =====================================================================
-- NEST BildungsBar – Storage für Blog-Bilder
-- Im Supabase "SQL Editor" einfügen und ausführen.
-- =====================================================================

-- Öffentlicher Bucket "blog" (Bilder sind per URL abrufbar)
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

-- Jeder darf die Bilder lesen (öffentlicher Blog)
drop policy if exists "blog_public_read" on storage.objects;
create policy "blog_public_read" on storage.objects
  for select using ( bucket_id = 'blog' );

-- Nur der Admin darf hochladen
drop policy if exists "blog_admin_upload" on storage.objects;
create policy "blog_admin_upload" on storage.objects
  for insert to authenticated
  with check ( bucket_id = 'blog' and (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

-- Nur der Admin darf löschen
drop policy if exists "blog_admin_delete" on storage.objects;
create policy "blog_admin_delete" on storage.objects
  for delete to authenticated
  using ( bucket_id = 'blog' and (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );
