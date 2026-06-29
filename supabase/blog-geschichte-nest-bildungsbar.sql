-- =====================================================================
-- NEST BildungsBar – Blogbeitrag "Die Geschichte der NEST BildungsBar"
-- Im Supabase "SQL Editor" einfügen und ausführen, um den Beitrag zu
-- veröffentlichen. Das passende Bild liegt im Projekt unter
-- /public/assets/img/blog/geschichte-nest-bildungsbar.png
-- =====================================================================

insert into public.posts (slug, titel, excerpt, inhalt, bild_url, published, veroeffentlicht_am) values
(
  'geschichte-der-nest-bildungsbar',
  'Die Geschichte der NEST BildungsBar: Wie aus einer Wanderung ein Ökosystem wurde',
  'Von einem gemeinsamen Ausflug während des Studiums zu einem ganzen Ökosystem für Berufsorientierung – die Geschichte hinter NEST.',
  '<p>Manche der besten Ideen entstehen nicht am Schreibtisch, sondern unterwegs. So war es auch bei Patrick Nekola-Ossé und Mike Stoeck: Bei einem gemeinsamen Ausflug während ihres Studiums kamen die beiden ins Gespräch und merkten schnell, wie viel sie verbindet. Beide hatten ihren beruflichen Weg mit einer klassischen Ausbildung begonnen – Patrick als Elektriker, Mike als Mechatroniker – und sich anschließend berufsbegleitend zum Elektrotechniker weiterqualifiziert. Und beide wussten aus eigener Erfahrung: Der Übergang von der Schule in die Ausbildung ist für viele junge Menschen einer der unsichersten Momente ihres Lebens.</p>

<h2>Eine Erkenntnis, die alles veränderte</h2>
<p>Obwohl Patrick und Mike beide technische Ausbildungshintergründe haben, merkten sie an diesem Tag, dass ihr Herz für etwas anderes schlägt: für Menschen, für echte Orientierung, für Ausbildung, die wirklich wirkt. Patrick hatte zu dieser Zeit bereits früh Verantwortung in der Geschäftsleitung mit Fokus auf Ausbildung übernommen und sich zuletzt im Personalmanagement und in der Personalentwicklung mit Generationsmanagement beschäftigt. Mike hatte sich schon während seiner eigenen Ausbildung als Jugendvertreter engagiert und im Betriebsrat sowie in der Gewerkschaftsarbeit für junge Menschen eingesetzt. Aus diesen Erfahrungen heraus entstand eine gemeinsame Überzeugung: Berufsorientierung darf nicht von oben herab passieren – sie muss auf Augenhöhe stattfinden, unabhängig sein und kostenfrei zugänglich für alle.</p>

<h2>2021: Die erste BildungsBar öffnet in Wuppertal</h2>
<p>Aus dieser Idee wurde Tat. 2021 eröffnete in Wuppertal die erste NEST BildungsBar – ein Beratungsangebot, das bewusst nicht wie ein Amt oder ein klassisches Beratungszimmer aussehen sollte, sondern wie ein Ort, an dem man gerne Zeit verbringt: in lockerer Café-Atmosphäre, bei einem Getränk, in ehrlichen Gesprächen statt Frageboegen. Schüler:innen sollten hier ohne Druck und ohne versteckte Interessen über ihre Zukunft sprechen können – begleitet von Menschen, die selbst wissen, wie es ist, am Anfang der eigenen Ausbildung zu stehen.</p>
<p>Das Konzept traf einen Nerv. Schulen, Eltern und vor allem die Schüler:innen selbst nahmen das Angebot an, und aus einem einzelnen Standort wurde schnell mehr.</p>

<h2>Vom Beratungsangebot zum Ökosystem</h2>
<p>Was als eine BildungsBar begann, ist heute ein ganzes Ökosystem rund um Ausbildung und Berufsorientierung. Mit NEST Explore und AzubiConnect kamen weitere Bausteine hinzu, die Schüler:innen, Schulen und Unternehmen enger miteinander verzahnen. Heute begleitet NEST jedes Jahr über 500 Schüler:innen auf ihrem Weg in die Ausbildung – mittlerweile an zwei Standorten: in Wuppertal, wo alles begann, und in Essen, wo das Konzept seinen zweiten festen Platz im Ruhrgebiet gefunden hat.</p>

<h2>Was geblieben ist</h2>
<p>Auch wenn aus der ursprünglichen Idee ein wachsendes Netzwerk aus Einrichtungen, Unternehmen und Schüler:innen geworden ist, ist der Kern bis heute derselbe wie an dem Tag, an dem alles begann: Gute Ausbildung lebt von Menschen, die sich verstehen, unterstützen und gemeinsam wachsen. Genau dafür steht die NEST BildungsBar – damals wie heute.</p>',
  '/assets/img/blog/geschichte-nest-bildungsbar.png',
  true,
  current_date
)
on conflict (slug) do update set
  titel = excluded.titel,
  excerpt = excluded.excerpt,
  inhalt = excluded.inhalt,
  bild_url = excluded.bild_url,
  published = excluded.published;
