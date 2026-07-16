-- =====================================================================
--  NEST BildungsBar – Portal-Fixes
--  (additiv – kann gefahrlos auf einer bestehenden DB ausgeführt werden)
--  Im SQL-Editor von Supabase ausführen.
--
--  1) Ansprechpartner: Website-Spalte
--  2) Ansprechpartner: Standard-Kontakte einmalig in die DB übernehmen,
--     damit sie im Partner-Portal bearbeitet/gelöscht werden können
--  3) Veranstaltungen: sprechende Direktlinks (Slug statt UUID)
-- =====================================================================

-- 1) Website-Kontaktfeld für Ansprechpartner
alter table public.ansprechpartner add column if not exists website text;

-- 2) Standard-Ansprechpartner übernehmen – nur, wenn die Tabelle noch leer ist.
--    (Alternativ gibt es im Admin-Bereich des Portals den Button
--     „Standard-Ansprechpartner übernehmen".)
insert into public.ansprechpartner (name, rolle, standort, bild_url, beschreibung, sortierung)
select * from (values
  ('Mike Stoeck', 'Gründer & Geschäftsführer', 'Wuppertal', '/assets/img/team/mike.jpg',
   'Mitgründer der BildungsBar. Mike startete selbst als Azubi zum Mechatroniker, engagierte sich früh als Jugendvertreter in Betriebsrat und Gewerkschaft und bringt seine Erfahrung heute praxisnah und auf Augenhöhe in Workshops und Coachings ein.', 1),
  ('Patrick Nekola-Ossé', 'Gründer & Geschäftsführer', 'Wuppertal', '/assets/img/team/patrick.jpg',
   'Mitgründer der BildungsBar. Patrick lernte Elektriker, qualifizierte sich zum Elektrotechniker weiter und gestaltete im Personalmanagement das Generationsmanagement aktiv mit. Sein Fokus: gute Ausbildung und echte Begegnung.', 2),
  ('Sevda Askin', 'Sales- & Marketing Managerin', 'Essen', '/assets/img/team/sevda.jpg',
   'Sevda verantwortet Sales & Marketing und ist eure Ansprechpartnerin für den Standort Essen. Mit Leidenschaft für Netzwerke, Kommunikation und neue Ideen begleitet sie Partnerunternehmen von der ersten Idee bis zur Zusammenarbeit.', 3),
  ('Jana Kortwig', 'Soulspace Wuppertal', 'Wuppertal', '',
   'Jana Kortwig ist Gründerin von Soulspace, Wuppertals erstem Jugendzentrum für mentale Gesundheit. Als pädagogisch-therapeutische Beraterin schafft sie einen offenen Ort, an dem Jugendliche kostenlos und ohne Termin über ihre Sorgen sprechen können.', 4),
  ('Esther Königes', 'Workstadt', 'Wuppertal', '',
   'Esther Königes ist Mitgründerin und Geschäftsführerin der WorkStadt GmbH in Wuppertal. Mit WorkStadt unterstützt sie Unternehmen beim Onboarding internationaler Fachkräfte – vom Ankommen in der Stadt bis zur nachhaltigen Integration ins Team.', 5),
  ('Marc Longjaloux', 'Designbüro Longjaloux', 'Wuppertal', '/assets/img/team/marc.jpg',
   'Büro Longjaloux macht Corporate Design für kleine und mittelständische Unternehmen – seit 1980. Wir finden den Kern von Marken und machen ihn sichtbar. Für alle, die wissen, was sie tun, aber noch nicht, wie sie das erfolgreich kommunizieren sollen: Mit Strategie-Workshops, Corporate Design und gezielter Markenführung schaffen wir Auftritte, die nicht nur gut aussehen, sondern wirken. Geiler Scheiß für geile Leute.', 6)
) as v(name, rolle, standort, bild_url, beschreibung, sortierung)
where not exists (select 1 from public.ansprechpartner);

-- 3) Veranstaltungen: Slug-Spalte für sprechende Links
--    (z. B. /veranstaltungen/openhouse-wuppertal statt /veranstaltungen/<uuid>)
alter table public.veranstaltungen add column if not exists slug text;

-- Bestehende Veranstaltungen bekommen automatisch einen Slug aus dem Titel;
-- bei gleichem Titel wird das Datum angehängt. Alte UUID-Links bleiben gültig.
with s1 as (
  select id, datum, created_at,
         coalesce(nullif(trim(both '-' from regexp_replace(
           replace(replace(replace(replace(lower(titel), 'ä', 'ae'), 'ö', 'oe'), 'ü', 'ue'), 'ß', 'ss'),
           '[^a-z0-9]+', '-', 'g')), ''), 'veranstaltung') as basis
  from public.veranstaltungen
  where slug is null
),
s2 as (
  select id, datum, basis,
         row_number() over (partition by basis order by datum, created_at) as rn
  from s1
)
update public.veranstaltungen v
set slug = case
  when s2.rn = 1 then s2.basis
  else s2.basis || '-' || to_char(s2.datum, 'YYYY-MM-DD') || case when s2.rn > 2 then '-' || s2.rn::text else '' end
end
from s2
where v.id = s2.id;

create unique index if not exists veranstaltungen_slug_key
  on public.veranstaltungen (slug);
