-- =====================================================================
-- NEST Explore – Buchungen: nur der Admin darf sie sehen
--
-- Die Tabellen `messe_termine` und `messe_buchungen` werden zentral im
-- NEST-Explore-Projekt (nest-explore.de) gepflegt, liegen aber im selben
-- Supabase-Projekt. Das Partner-Portal liest sie für den Admin-Bereich mit.
--
-- Ausgangslage: `messe_buchungen` war für JEDEN eingeloggten Account les-,
-- änder- und löschbar (`using (true)` für die Rolle `authenticated`). Da sich
-- Unternehmen im Partner-Portal selbst registrieren können, hätte damit jede
-- Partnerfirma die Kontaktdaten aller anderen Aussteller abfragen können.
--
-- Ab hier gilt dasselbe Muster wie bei buchungen/posts/veranstaltungen:
-- Lesen, Ändern und Löschen nur für info@nest-bildungsbar.de.
--
-- Die Termine selbst (`messe_termine`) bleiben öffentlich lesbar – im Portal
-- sehen alle Partner die kommenden Termine, aber nicht mehr, wer gebucht hat.
-- Das öffentliche INSERT (Anmeldeformular auf nest-explore.de) bleibt ebenfalls
-- unverändert bestehen.
-- =====================================================================

drop policy if exists "messe_buchungen_admin_select" on public.messe_buchungen;
create policy "messe_buchungen_admin_select" on public.messe_buchungen
  for select to authenticated
  using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "messe_buchungen_admin_update" on public.messe_buchungen;
create policy "messe_buchungen_admin_update" on public.messe_buchungen
  for update to authenticated
  using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' )
  with check ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

drop policy if exists "messe_buchungen_admin_delete" on public.messe_buchungen;
create policy "messe_buchungen_admin_delete" on public.messe_buchungen
  for delete to authenticated
  using ( (auth.jwt() ->> 'email') = 'info@nest-bildungsbar.de' );

-- ---------------------------------------------------------------------
-- Zurücknehmen (falls das NEST-Explore-Backend sich mit einem anderen
-- Account anmeldet und dort keine Buchungen mehr sieht): entweder die
-- E-Mail oben ergänzen, z. B.
--     using ( (auth.jwt() ->> 'email') in ('info@nest-bildungsbar.de',
--                                          'weitere@adresse.de') )
-- oder den alten Zustand wiederherstellen:
--     create policy "messe_buchungen_admin_select" on public.messe_buchungen
--       for select to authenticated using ( true );
-- ---------------------------------------------------------------------
