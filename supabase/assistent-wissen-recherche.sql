-- Wissensbasis des NEST-Assistenten: recherchierte Beiträge (Stand Oktober 2026).
-- Als Angebote und Unterstützung nennen die Beiträge nur NEST und die NEST-Ansprechpartner.
-- Bereits eingespielt am 30.10.2026 – nicht erneut ausführen, sonst entstehen Dubletten.
-- Der set_config-Aufruf sorgt dafür, dass der Trigger die Einträge als NEST-Admin
-- behandelt und den Status „freigegeben“ nicht auf „eingereicht“ zurücksetzt.

begin;
select set_config('request.jwt.claims', '{"email":"info@nest-bildungsbar.de"}', true);
insert into public.assistent_wissen (titel, inhalt, kategorie, herkunft, anonym, status, created_at) values
($w$Wer hilft wobei? Ansprechpartner von NEST und aus dem Netzwerk$w$, $w$Im Partner-Login stehen unter „Ansprechpartner“ alle Kontaktdaten. Wer bei welchem Thema weiterhilft:
- Mike Stoeck (NEST GmbH, Community Manager): zentraler Ansprechpartner für eure Partnerschaft und alle Fragen zur Zusammenarbeit, außerdem für NESTplay, eure Stellen in der NEST Berufswelt und den Partner-Login.
- Patrick Nekola-Ossé (NEST GmbH, Vertrieb & Netzwerk): NEST Explore, die Workshops von NEST AzubiConnect, Auswahl passender Angebote, Termine und Veranstaltungen sowie Kontakte zu Schulen und weiteren Akteuren im Netzwerk.
- Sevda Askin (NEST GmbH, Leitung Essen): Ansprechpartnerin für Partnerbetriebe am Standort Essen; verantwortet außerdem Sales & Marketing.
- Jana Kortwig (Soulspace, Wuppertal): Thema mentale Gesundheit junger Menschen. Soulspace ist Wuppertals erstes Jugendzentrum für mentale Gesundheit; Jugendliche können dort kostenlos und ohne Termin über ihre Sorgen sprechen.
- Esther Königes (WorkStadt GmbH, Wuppertal): Onboarding internationaler Fachkräfte – Ankommen in der Stadt, Orientierung im neuen Umfeld und nachhaltige Integration ins Team. Passt auch, wenn ihr Azubis aus dem Ausland ausbildet.
- Marc Longjaloux (Büro Longjaloux, Wuppertal): Corporate Design und Employer Branding für kleine und mittlere Unternehmen – wie ihr euch als Arbeitgeber sichtbar und unverwechselbar zeigt.
- Roman Scholz (rmnFPV, Wuppertal): Foto- und Videograf und Drohnenpilot. Er produziert Imagefilme, Drohnenaufnahmen und Event-Reportagen von der Idee bis zum Schnitt, etwa für Videos über eure Ausbildung.
Jana Kortwig, Esther Königes, Marc Longjaloux und Roman Scholz sind Partner aus unserem Netzwerk mit eigenen Angeboten; Konditionen klärt ihr direkt mit ihnen.$w$, $w$NEST-Angebote$w$, 'nest', true, 'freigegeben', now() + interval '0 seconds'),
($w$Ausbildungsmarkt 2025: Zahlen und was sie für Betriebe bedeuten$w$, $w$Die wichtigsten Kennzahlen zum Ausbildungsjahr 2025 (Stichtag 30. September 2025):
- Neu abgeschlossene Ausbildungsverträge: 475.950, das sind 2,1 % weniger als im Vorjahr (BIBB, Dezember 2025). Das Angebot an Ausbildungsplätzen lag bei 530.300, das betriebliche Angebot ging um rund 5 % zurück.
- Bei den Arbeitsagenturen und Jobcentern waren von Oktober 2024 bis September 2025 rund 494.000 Ausbildungsstellen gemeldet. Am 30. September 2025 waren noch rund 54.000 davon unbesetzt (Bundesagentur für Arbeit, Ausbildungsmarktbilanz 2024/25).
- Auf 100 gemeldete betriebliche Stellen kamen rechnerisch 93 gemeldete Bewerberinnen und Bewerber, im Vorjahr waren es 86.
Was das heißt: Der Markt ist weiterhin von Passungsproblemen geprägt. Viele Stellen bleiben frei, während gleichzeitig junge Menschen ohne Platz bleiben – oft, weil Beruf, Region oder Erwartungen nicht zusammenpassen. Für Betriebe lohnt es sich deshalb, früh sichtbar zu sein (Schulen, Praktika, NEST Explore, NESTplay), den Bewerbungsweg einfach zu machen und auch Bewerbende mit Umwegen im Lebenslauf ernsthaft kennenzulernen.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '1 seconds'),
($w$Eltern als Zielgruppe in der Berufsorientierung$w$, $w$Eltern sind für junge Menschen die wichtigsten Ratgeber bei der Berufswahl. In einer Befragung der Bertelsmann Stiftung (2022, 1.666 junge Menschen zwischen 14 und 20 Jahren) nannten 73 % ihre Eltern als wichtigste Unterstützung, gefolgt von Schule und Lehrkräften (55 %); die Berufsberatung der Arbeitsagentur kam auf 36 %.
Was Betriebe daraus machen können:
- Informationen auch für Eltern aufbereiten: Ausbildungsvergütung, Übernahmechancen, Weiterbildung und Karrierewege, Arbeitszeiten, Ansprechperson im Betrieb.
- Eltern einladen, zum Beispiel zum Kennenlerngespräch, zur Vertragsunterzeichnung oder zu einem Tag der offenen Tür. Bei minderjährigen Azubis unterschreiben die Erziehungsberechtigten ohnehin den Ausbildungsvertrag mit.
- Vorurteile ernst nehmen: Viele Eltern kennen moderne Ausbildungsberufe kaum oder sehen ein Studium als sicherere Wahl. Konkrete Beispiele von Azubis und Absolvent:innen aus eurem Betrieb überzeugen besser als Werbesprache.
- Dort präsent sein, wo sich Schüler:innen orientieren: bei NEST Explore an Schulen, mit eurem NESTplay-Quiz im Unterricht und beim Open House der BildungsBar. Kontakte zu Schulen im NEST-Netzwerk vermittelt Patrick Nekola-Ossé.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '2 seconds'),
($w$Stellenanzeigen, die Schüler:innen erreichen$w$, $w$Eine Ausbildungsanzeige wird heute meist auf dem Smartphone gelesen. Was sich bewährt:
- Konkret statt abstrakt: Beschreibt typische Aufgaben im Alltag („Du baust …“, „Du berätst …“) statt nur die Berufsbezeichnung. Schüler:innen kennen viele Berufsnamen und Fachbegriffe noch nicht.
- Klare Fakten: Ausbildungsbeginn, Dauer, Arbeitszeiten, Standort und Berufsschule, Vergütung pro Ausbildungsjahr. Zur Orientierung: Die gesetzliche Mindestausbildungsvergütung beträgt für Ausbildungen mit Beginn 2026 724 € im ersten, 854 € im zweiten, 977 € im dritten und 1.014 € im vierten Ausbildungsjahr (für Beginn 2027: 764 € im ersten Jahr). Tarifverträge können abweichende Regelungen enthalten.
- Echte Gesichter: eine Ansprechperson mit Foto und direktem Kontakt, idealerweise Stimmen oder Fotos eurer Azubis.
- Niedrige Hürden: Bewerbung ohne Anschreiben, Upload per Handy, Rückruf oder WhatsApp anbieten.
- Was ihr bietet: Übernahmechancen, Weiterbildung, Azubi-Projekte, Ticket- oder Fahrtkostenzuschuss.
In der NEST Berufswelt könnt ihr zu jeder Stelle bis zu drei Stichwörter hinterlegen. Nutzt Begriffe, die Jugendliche selbst eingeben würden (z. B. „Auto“, „Technik“, „Pflege“), dann findet man eure Stelle auch ohne den genauen Berufsnamen. Für einen einheitlichen Arbeitgeberauftritt berät euch Marc Longjaloux (Employer Branding), Fragen zu Stellen in der Berufswelt beantwortet Mike Stoeck.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '3 seconds'),
($w$Social Media und Videos im Ausbildungsmarketing$w$, $w$Junge Menschen sind vor allem mobil und in Messengern und Videoplattformen unterwegs. Laut JIM-Studie 2025 (1.200 Jugendliche von 12 bis 19 Jahren) ist WhatsApp die wichtigste App, gefolgt von Instagram, Snapchat und TikTok; YouTube, Instagram und TikTok gehören zu den häufigsten Freizeitbeschäftigungen. Auch Azubi-Befragungen der IHKs in Thüringen (2025) zeigen eine besonders starke Nutzung von Instagram, TikTok und YouTube.
Einordnung: Social Media ersetzt andere Wege nicht. In den Azubi-Recruiting Trends 2023 gaben nur 11 % der Schüler:innen an, Social Media aktiv für die Ausbildungsplatzsuche zu nutzen. Die Kanäle wirken vor allem auf Sichtbarkeit und Image, also darauf, ob man euren Betrieb kennt und sympathisch findet, wenn es um die Bewerbung geht.
Was funktioniert:
- Authentische Einblicke statt Hochglanz: Azubis zeigen ihren Alltag, kurze Clips aus Werkstatt, Büro oder Baustelle, typische Fragen beantwortet in 30 Sekunden.
- Regelmäßigkeit vor Perfektion; verschiedene Formate ausprobieren und schauen, was ankommt.
- Rechtliches beachten: schriftliche Einwilligung für Fotos und Videos, bei Minderjährigen auch der Eltern; keine sensiblen Kundendaten im Bild.
Für professionelle Videos und Drohnenaufnahmen könnt ihr euch an Roman Scholz (rmnFPV) wenden, für Markenauftritt und Employer Branding an Marc Longjaloux.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '4 seconds'),
($w$Employer Branding für kleine und mittlere Ausbildungsbetriebe$w$, $w$Employer Branding heißt: zeigen, wofür ihr als Arbeitgeber steht und warum man bei euch eine Ausbildung machen sollte. Große Budgets sind dafür nicht nötig, wohl aber Klarheit und Ehrlichkeit.
So geht ihr vor:
- Kern klären: Was macht die Ausbildung bei euch besonders? Zum Beispiel familiäres Team, Verantwortung ab dem ersten Jahr, feste Paten, Übernahme, Weiterbildung, sinnstiftende Produkte oder Dienstleistungen.
- Beweise statt Versprechen: Geschichten und Zitate eurer Azubis, echte Fotos, konkrete Zahlen (z. B. wie viele Azubis ihr in den letzten Jahren übernommen habt).
- Ein Auftritt aus einem Guss: Karriereseite, Stellenanzeigen, Social Media, Stand bei NEST Explore und euer NESTplay-Quiz sollten dieselbe Sprache und Optik haben.
- Die Ausbildung selbst ist das stärkste Marketing: Zufriedene Azubis erzählen es weiter, enttäuschte auch.
Einordnung: Viele junge Bewerbende entscheiden stark nach dem Eindruck beim ersten Kontakt. Ein freundlicher, schneller Bewerbungsprozess gehört deshalb genauso zur Arbeitgebermarke wie das Logo.
Unterstützung: Marc Longjaloux (Büro Longjaloux) entwickelt Corporate Designs und Arbeitgeberauftritte für kleine und mittlere Unternehmen; Roman Scholz (rmnFPV) produziert Imagefilme.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '5 seconds'),
($w$Praktika: Schülerpraktikum, Ferien- und Orientierungspraktikum$w$, $w$Praktika sind einer der wirksamsten Wege zu neuen Azubis: Beide Seiten lernen sich im Alltag kennen.
Rechtlicher Rahmen (verbindliche Auskunft gibt eure Kammer):
- Pflichtpraktika im Rahmen der Schule gelten als schulische Veranstaltung. Der Mindestlohn gilt dafür nicht.
- Freiwillige Orientierungspraktika vor einer Ausbildung oder einem Studium sind nach § 22 Mindestlohngesetz bis zu drei Monate vom Mindestlohn ausgenommen. Wird die Grenze überschritten, kann ein Mindestlohnanspruch entstehen. Laut Bundesarbeitsgericht (2019) zählen Unterbrechungen, etwa wegen Krankheit oder Urlaub, nicht mit; entscheidend ist, dass die tatsächliche Praktikumszeit insgesamt drei Monate nicht überschreitet.
- Bei Minderjährigen gilt das Jugendarbeitsschutzgesetz, etwa zu Arbeitszeiten und Pausen.
Was ein gutes Praktikum ausmacht:
- feste Ansprechperson und ein kurzer Plan für die Tage,
- echte, kleine Aufgaben mit Ergebnis statt nur Zuschauen,
- Austausch mit euren Azubis,
- ein Abschlussgespräch mit ehrlichem Feedback und, wenn es passt, einer konkreten Einladung zur Bewerbung,
- Kontakt halten, etwa über einen Ferienjob oder eine Einladung zu Betriebsveranstaltungen.
Kontakte zu Schulen und Schüler:innen vermittelt die BildungsBar; Ansprechpartner bei NEST ist Patrick Nekola-Ossé.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '6 seconds'),
($w$Teilzeitausbildung: neue Zielgruppen erreichen$w$, $w$Seit 2020 ist eine Ausbildung in Teilzeit nach § 7a Berufsbildungsgesetz ohne besonderen Grund möglich, wenn Betrieb und Azubi sich einig sind. Damit erreicht ihr zum Beispiel junge Eltern, Menschen, die Angehörige pflegen, Leistungssportler:innen oder Bewerbende mit gesundheitlichen Einschränkungen.
Die Regeln im Überblick:
- Die tägliche oder wöchentliche Ausbildungszeit kann um höchstens 50 % gekürzt werden.
- Die Ausbildungsdauer verlängert sich entsprechend, höchstens auf das Eineinhalbfache der regulären Dauer. Beispiel: Bei 75 % Ausbildungszeit dauert eine dreijährige Ausbildung 40 Monate.
- Passt das Ende nicht zu einem Prüfungstermin, kann der oder die Azubi verlangen, dass die Ausbildung bis zur nächsten möglichen Abschlussprüfung verlängert wird.
- Die Ausbildungsvergütung kann entsprechend angepasst werden.
- Die Teilzeit wird im Ausbildungsvertrag vereinbart und bei der Kammer eingetragen; auch ein späterer Wechsel in Teilzeit ist über eine Vertragsänderung möglich.
Tipp: Erwähnt die Möglichkeit ausdrücklich in eurer Stellenanzeige, auch in der NEST Berufswelt. Viele Bewerbende wissen nicht, dass es sie gibt. Wenn ihr in Teilzeit ausbildet, sagt uns Bescheid: Über die BildungsBar bringt NEST passende Kandidat:innen mit Partnerbetrieben zusammen. Ansprechpartner rund um eure Stellen ist Mike Stoeck.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '7 seconds'),
($w$Azubis als Botschafter:innen für euren Betrieb$w$, $w$Junge Menschen glauben Gleichaltrigen oft mehr als Erwachsenen oder Werbetexten. Eure Azubis sind deshalb die glaubwürdigsten Botschafter:innen für eure Ausbildung.
Möglichkeiten:
- Bringt Azubis zu NEST Explore mit. Beim Fragenhagel stellen Schüler:innen gezielt Fragen zum Betrieb und zu den Berufen, die eure Azubis aus erster Hand beantworten können.
- Lasst Azubis an eurem NESTplay-Quiz mitarbeiten: Sie wissen, was Schüler:innen interessiert und welche Begriffe sie verstehen.
- Azubis zeigen ihren Alltag in kurzen Videos oder Beiträgen (mit Einwilligung, bei Minderjährigen auch der Eltern).
- Nehmt Azubis mit zum Open House der BildungsBar und zu NEST-Veranstaltungen, wo junge Menschen und Betriebe ins Gespräch kommen.
- Azubis als Ansprechpartner für Praktikant:innen einsetzen.
Wichtig: Freiwilligkeit, Zeit im Arbeitsalltag dafür und Anerkennung. Botschafterrollen stärken außerdem Selbstbewusstsein und Bindung eurer Azubis. Fragen zu NEST Explore beantwortet Patrick Nekola-Ossé, zu NESTplay Mike Stoeck.$w$, $w$Azubis finden$w$, 'nest', true, 'freigegeben', now() + interval '8 seconds'),
($w$Bewerbungsprozess: schnell, einfach und freundlich$w$, $w$Viele Ausbildungsplätze scheitern nicht an fehlenden Bewerbungen, sondern am Prozess. In der Studie „Azubi-Recruiting Trends 2025“ (u-form, 5.482 Schüler:innen, Azubis und dual Studierende sowie 1.621 Ausbildungsverantwortliche) gaben 60 % der Bewerbenden an, schon einmal gar keine Antwort auf eine Bewerbung bekommen zu haben. Die Autor:innen sehen Defizite in den Recruiting- und Auswahlprozessen vieler Betriebe.
Was hilft:
- Sofortige Eingangsbestätigung und ein klarer Zeitplan („Wir melden uns bis …“).
- Schnelle Rückmeldung: Gute Bewerbende haben oft mehrere Optionen. Wer wochenlang wartet, verliert sie.
- Wenige Pflichtunterlagen: Viele Betriebe verzichten inzwischen auf das Anschreiben; die Deutsche Bahn hat es für Azubi-Stellen gestrichen und mehr Bewerbungen erhalten. Lebenslauf und letztes Zeugnis reichen für den ersten Schritt meist aus.
- Mehrere Wege: Formular, E-Mail, Telefon oder WhatsApp; alles muss auf dem Smartphone funktionieren. Bei WhatsApp auf einen datenschutzkonformen Firmenzugang achten.
- Eine feste Ansprechperson mit Namen und Telefonnummer.
- Freundliche Absagen mit kurzem Grund: Jugendliche erzählen ihre Erfahrungen weiter, auch an jüngere Geschwister und Freunde.$w$, $w$Bewerbung & Auswahl$w$, 'nest', true, 'freigegeben', now() + interval '9 seconds'),
($w$Auswahl: Kennenlernen statt nur Noten$w$, $w$Schulnoten sagen wenig darüber, ob jemand motiviert ist, ins Team passt und Freude am Beruf hat. Viele Betriebe setzen deshalb auf Formate, in denen sich beide Seiten im Alltag erleben.
Bewährte Bausteine:
- Kennenlerntag oder Probearbeiten: ein bis zwei Tage im Betrieb mit kleinen Aufgaben und Austausch mit euren Azubis. Klärt den Rahmen (Dauer, Versicherung, bei Minderjährigen Jugendarbeitsschutz) vorab.
- Strukturierte Gespräche: dieselben Kernfragen für alle Bewerbenden, damit ihr fair vergleichen könnt. Fragt nach Interessen, Hobbys, Nebenjobs und Situationen, in denen jemand etwas geschafft hat, nicht nur nach dem Lebenslauf.
- Praktische Mini-Aufgaben, die zum Beruf passen, statt abstrakter Tests.
- Eure Azubis einbeziehen: Sie erkennen oft gut, wer ins Team passt, und Bewerbende trauen sich bei ihnen eher, Fragen zu stellen.
- Euch selbst vorstellen: Auch die Bewerbenden wählen aus. Zeigt Arbeitsplatz, Team und Perspektiven.
Gebt auch Bewerbenden mit Lücken oder Umwegen eine Chance. Gerade wer schon einmal eine Ausbildung abgebrochen hat, weiß oft genau, was er oder sie jetzt will. Passende Kandidat:innen aus der BildungsBar vermittelt NEST an Partnerbetriebe.$w$, $w$Bewerbung & Auswahl$w$, 'nest', true, 'freigegeben', now() + interval '10 seconds'),
($w$Azubis aus dem Ausland: Ausbildungsvisum und Ablauf$w$, $w$Für eine betriebliche Ausbildung in Deutschland brauchen Bewerbende aus Ländern außerhalb der EU in der Regel ein nationales Visum nach § 16a Aufenthaltsgesetz.
Wichtige Voraussetzungen (Stand 2026, bitte im Einzelfall prüfen):
- ein unterschriebener Ausbildungsvertrag mit einem Betrieb, der nach dem Berufsbildungsgesetz ausbilden darf,
- ausreichende Deutschkenntnisse: In der Praxis wird meist etwa das Niveau B1 verlangt, Berufsschulen empfehlen oft B2; in der Pflege gelten je nach Bundesland teils höhere Anforderungen,
- ein gesicherter Lebensunterhalt, in der Regel über die Ausbildungsvergütung und gegebenenfalls ergänzende Nachweise.
Gut zu wissen:
- Für einen vorbereitenden Deutschkurs ist eine Einreise bis zu sechs Monate vor Ausbildungsbeginn möglich.
- Neben der Ausbildung ist eine Beschäftigung von bis zu 20 Stunden pro Woche erlaubt.
- Wer noch keinen Ausbildungsplatz hat, kann unter Umständen zur Suche nach einem Ausbildungsplatz einreisen (§ 17 AufenthG).
- Plant genug Vorlauf ein: Termine bei den Auslandsvertretungen und die Zustimmung der Behörden können mehrere Monate dauern.
Über Visum und Aufenthalt entscheiden die deutsche Auslandsvertretung und die Ausländerbehörde. Beim Ankommen in der Stadt, bei der Orientierung und bei der Integration ins Team unterstützt euch im NEST-Netzwerk Esther Königes (WorkStadt).$w$, $w$Bewerbung & Auswahl$w$, 'nest', true, 'freigegeben', now() + interval '11 seconds'),
($w$Geflüchtete ausbilden: Ausbildungsduldung und Aufenthalt$w$, $w$Auch Menschen mit Duldung können eine Ausbildung beginnen. Für sie gibt es mit der Ausbildungsduldung (§ 60c Aufenthaltsgesetz) eine Regelung, die für die Dauer einer qualifizierten Berufsausbildung Sicherheit geben kann.
Grundzüge (verbindlich entscheidet die Ausländerbehörde):
- Voraussetzung ist unter anderem ein Ausbildungsvertrag für einen staatlich anerkannten Ausbildungsberuf.
- Es gibt Ausschlussgründe, etwa wenn bereits konkrete Maßnahmen zur Aufenthaltsbeendigung eingeleitet sind. Deshalb sollte der Antrag möglichst früh gestellt werden.
- Wird die Ausbildung abgebrochen, erlischt die Ausbildungsduldung; einmalig kann eine Duldung für sechs Monate zur Suche nach einem neuen Ausbildungsplatz erteilt werden.
- Daneben gibt es eine Aufenthaltserlaubnis zum Zweck der Ausbildung für Ausreisepflichtige (§ 16g AufenthG) mit ähnlichen Voraussetzungen.
Für Betriebe heißt das: früh Kontakt mit der Ausländerbehörde aufnehmen, die über die Duldung entscheidet, und Abbrüche vermeiden, indem ihr beim Lernen und bei der Sprache im Betrieb unterstützt (siehe „Sprache und Ankommen internationaler Azubis“).
Im NEST-Netzwerk begleitet Esther Königes (WorkStadt) Unternehmen beim Onboarding internationaler Fachkräfte und beim Ankommen in Betrieb und Stadt.$w$, $w$Bewerbung & Auswahl$w$, 'nest', true, 'freigegeben', now() + interval '12 seconds'),
($w$Preboarding: Von der Zusage bis zum ersten Tag$w$, $w$Zwischen Vertragsunterschrift und Ausbildungsstart liegen oft Monate. In dieser Zeit springen manche Azubis wieder ab oder erscheinen am ersten Tag gar nicht („Ghosting“).
Zahlen: In den Azubi-Recruiting Trends 2024 (u-form) gaben 60 % der Ausbildungsbetriebe an, schon einmal Ghosting erlebt zu haben. 12 % der befragten Jugendlichen sagten, sie hätten einen Betrieb vor Vertragsabschluss ohne Rückmeldung stehen lassen, 3 % danach. Eine Untersuchung des Ludwig-Fröhler-Instituts für das Handwerk kommt auf zwei bis drei Prozent der Neuabschlüsse, bei denen Betriebe Nichterscheinen erleben.
Was die Bindung bis zum Start stärkt:
- regelmäßiger, kurzer Kontakt mit einer festen Ansprechperson, etwa alle paar Wochen,
- Willkommenspaket mit Infos zum ersten Tag, Ansprechpersonen und einem kleinen Geschenk,
- Einladungen zu Sommerfest, Weihnachtsfeier oder einem Azubi-Treffen,
- Kennenlernen der künftigen Kolleg:innen und Paten vorab,
- ein Ferienjob oder Praktikum vor dem Start, wenn es passt,
- Organisatorisches früh klären (Unterlagen, Arbeitskleidung, Fahrtweg, Berufsschule). Bei Minderjährigen muss die ärztliche Erstuntersuchung nach dem Jugendarbeitsschutzgesetz vor Beginn vorliegen.
Laut den Befragungen tritt Ghosting seltener auf, wenn sich der Betrieb früh um die Person bemüht und persönliche Beziehungen entstehen.$w$, $w$Onboarding$w$, 'nest', true, 'freigegeben', now() + interval '13 seconds'),
($w$Die ersten Tage und Wochen in der Ausbildung$w$, $w$Die ersten Wochen entscheiden mit darüber, ob Azubis bleiben. Ein Großteil der vorzeitigen Vertragslösungen passiert in der Probezeit und im restlichen ersten Ausbildungsjahr.
Ein guter Start:
- Vorbereitet sein: Arbeitsplatz, Zugänge, Arbeitskleidung und ein Plan für die erste Woche liegen bereit.
- Persönliche Begrüßung durch Ausbilder:in und Team, Rundgang, Vorstellung wichtiger Ansprechpersonen.
- Paten oder Patinnen aus dem zweiten oder dritten Lehrjahr, die bei Alltagsfragen helfen.
- Früh eine echte Aufgabe mit sichtbarem Ergebnis, damit Azubis merken, dass ihre Arbeit zählt.
- Erwartungen offen besprechen: Arbeitszeiten, Pausen, Krankmeldung, Handynutzung, Umgangston. Vieles, was Erfahrenen selbstverständlich ist, ist für Berufseinsteiger neu.
- Den betrieblichen Ausbildungsplan und das Berichtsheft (Ausbildungsnachweis) gemeinsam durchgehen.
- Feste Feedbackgespräche einplanen: nach der ersten Woche, nach dem ersten Monat und vor Ende der Probezeit.
- Gemeinsamer Start mit anderen Azubis, zum Beispiel ein Einführungstag oder ein Workshop. Der Azubi-Knigge von NEST AzubiConnect unterstützt beim souveränen Auftreten im Betrieb; Fragen dazu beantwortet Patrick Nekola-Ossé.$w$, $w$Onboarding$w$, 'nest', true, 'freigegeben', now() + interval '14 seconds'),
($w$Probezeit in der Ausbildung: Regeln und wie ihr sie nutzt$w$, $w$Rechtlicher Rahmen nach dem Berufsbildungsgesetz (verbindliche Auskunft gibt eure Kammer):
- Die Probezeit beträgt mindestens einen und höchstens vier Monate (§ 20 BBiG). Eine längere Probezeit ist unwirksam.
- In der Probezeit können beide Seiten jederzeit ohne Kündigungsfrist und ohne Angabe von Gründen kündigen (§ 22 BBiG). Die Kündigung muss schriftlich erfolgen und vor Ende der Probezeit zugehen; bei Minderjährigen an die Erziehungsberechtigten.
- Nach der Probezeit kann der Betrieb nur noch aus wichtigem Grund kündigen. Azubis können mit vier Wochen Frist kündigen, wenn sie die Ausbildung aufgeben oder einen anderen Beruf erlernen wollen.
Zahlen: Laut BIBB wurden im Berichtsjahr 2022 29,5 % der Ausbildungsverträge vorzeitig gelöst, ein Höchststand. Gut ein Drittel dieser Lösungen fiel in die Probezeit, ein weiteres Drittel in das restliche erste Ausbildungsjahr. Nicht jede Lösung ist ein endgültiger Abbruch; viele wechseln den Betrieb oder Beruf.
So nutzt ihr die Probezeit:
- Sie ist eine Kennenlernphase für beide Seiten. Sprecht früh und regelmäßig darüber, wie es läuft.
- Führt vor ihrem Ende ein strukturiertes Gespräch: Was läuft gut? Was braucht der oder die Azubi? Was erwartet ihr?
- Probleme sofort ansprechen statt bis zum letzten Tag zu warten. Unterstützung bieten die Workshops von NEST AzubiConnect, bei psychischer Belastung Jana Kortwig (Soulspace); über „An Netzwerk weitergeben“ fragt ihr andere Betriebe nach ihren Erfahrungen.$w$, $w$Onboarding$w$, 'nest', true, 'freigegeben', now() + interval '15 seconds'),
($w$Ausbildungsplan und Ausbildungsnachweis (Berichtsheft)$w$, $w$Betrieblicher Ausbildungsplan: Grundlage ist die Ausbildungsordnung mit dem Ausbildungsrahmenplan des Berufs. Daraus erstellt ihr einen Plan, wann welche Inhalte in welcher Abteilung vermittelt werden; er ist Teil des Ausbildungsvertrags. In Auswertungen zum DGB-Ausbildungsreport 2026 gibt rund ein Drittel der Azubis an, keinen Ausbildungsplan zu haben. Ein sichtbarer Plan gibt Orientierung und zeigt, dass die Ausbildung ernst genommen wird.
Ausbildungsnachweis (Berichtsheft):
- Azubis müssen ihn führen, schriftlich oder elektronisch; die Form wird im Ausbildungsvertrag festgelegt.
- Der Betrieb muss Gelegenheit geben, ihn während der Ausbildungszeit zu führen, und ihn regelmäßig durchsehen und abzeichnen (§§ 13, 14 BBiG). Bewährt haben sich wöchentliche Einträge.
- Ein ordnungsgemäß geführter Ausbildungsnachweis ist Voraussetzung für die Zulassung zur Abschlussprüfung (§ 43 BBiG).
Tipp: Nutzt die wöchentliche Durchsicht als kurzes Feedbackgespräch: Was hast du gelernt, wo hakt es, was steht nächste Woche an?$w$, $w$Onboarding$w$, 'nest', true, 'freigegeben', now() + interval '16 seconds'),
($w$Was die Generation Z von Ausbildungsbetrieben erwartet$w$, $w$Studien zeichnen ein differenziertes Bild; die Gen Z ist keine einheitliche Gruppe. Wiederkehrende Ergebnisse:
- Sicherheit und Geld: In wirtschaftlich unsicheren Zeiten zählen harte Kriterien. In der Zenjob-Studie (2024) steht ein gutes Gehalt an erster Stelle, 52 % ist Jobsicherheit besonders wichtig.
- Klare Grenzen: In derselben Studie wollen 65 % Berufs- und Privatleben klar trennen. In einer dpa-Umfrage unter 15- bis 25-Jährigen ist 74 % eine gute Work-Life-Balance wichtig oder sehr wichtig.
- Wertschätzung und Führung: In einer Umfrage der Wirtschaftsjunioren Deutschland wünscht sich mehr als die Hälfte Wertschätzung und Lob; 43 % erwarten Vorgesetzte, die offen für Veränderung sind. Fachliche Kompetenz der Führungskraft kommt erst danach.
- Sinn und Entwicklung: Junge Menschen wollen verstehen, wofür ihre Arbeit gut ist, und sehen, wie es nach der Ausbildung weitergeht.
Was daraus folgt:
- transparente Vergütung, Übernahmeperspektive und Weiterbildungswege früh kommunizieren,
- verlässliche Arbeitszeiten und klare Absprachen zur Erreichbarkeit,
- regelmäßiges, konkretes Feedback und Anerkennung,
- erklären, warum Aufgaben wichtig sind.
Vertiefen könnt ihr das Thema im Workshop „Generationen – Herausforderungen und Chancen“ von NEST AzubiConnect für Ausbildende (Ansprechpartner: Patrick Nekola-Ossé).$w$, $w$Generation Z$w$, 'nest', true, 'freigegeben', now() + interval '17 seconds'),
($w$Kommunikation mit Azubis: Kanäle, Ton und Erreichbarkeit$w$, $w$WhatsApp ist laut JIM-Studie 2025 die wichtigste App Jugendlicher. Messenger sind deshalb für schnelle Absprachen naheliegend, brauchen aber Regeln.
Empfehlungen:
- Wichtiges persönlich: Feedback, Kritik, Konflikte und alles, was die Ausbildung betrifft, gehört ins Gespräch, nicht in den Chat.
- Messenger für Organisatorisches: Schichtpläne, kurze Infos, Erinnerungen. Nutzt dafür dienstliche, datenschutzkonforme Lösungen und keine privaten Nummern ohne Zustimmung.
- Erreichbarkeit klären: Wann wird eine Antwort erwartet, wann nicht? Nachrichten am Abend oder Wochenende setzen viele junge Menschen unter Druck.
- Erwartungen ausdrücklich formulieren: Pünktlichkeit, Krankmeldung, Umgang mit Kund:innen, Handynutzung am Arbeitsplatz. Ungeschriebene Regeln sind für Berufseinsteiger:innen oft nicht selbstverständlich.
- Fragen erlauben: Sagt ausdrücklich, dass Nachfragen erwünscht ist. Viele Azubis trauen sich nicht, aus Angst, inkompetent zu wirken.
- Feedback in beide Richtungen: Fragt eure Azubis regelmäßig, was ihnen hilft und was nicht.
Workshops von NEST AzubiConnect zu Kommunikation und Gesprächsführung sowie zum Azubi-Knigge unterstützen beide Seiten.$w$, $w$Generation Z$w$, 'nest', true, 'freigegeben', now() + interval '18 seconds'),
($w$Feedback und Gespräche, die ankommen$w$, $w$Regelmäßige Rückmeldung ist einer der stärksten Hebel für Bindung. Viele Azubis bekommen sie zu selten persönlich; gleichzeitig wünscht sich ein großer Teil der jungen Generation ausdrücklich Wertschätzung und Lob.
Ein einfacher Rhythmus:
- Kurz und oft: ein wöchentlicher Check-in von zehn Minuten, zum Beispiel bei der Durchsicht des Berichtshefts.
- Strukturierte Gespräche zu festen Zeitpunkten: nach dem ersten Monat, vor Ende der Probezeit, zur Halbzeit des ersten Jahres, vor der Zwischenprüfung und rund ein Jahr vor Ausbildungsende (Übernahme).
- Konkret und zeitnah: Benennt, was genau gut war oder besser werden soll, und zwar möglichst direkt danach.
- Stärken zuerst, dann ein bis zwei Entwicklungspunkte mit gemeinsamem Ziel.
- Zuhören: Fragt, wie es dem oder der Azubi geht, im Betrieb, in der Berufsschule und insgesamt.
- Feedback einholen: Was hilft dir beim Lernen? Was sollen wir anders machen?
Ausbildende stärken diese Fähigkeiten im Workshop „Azubi-Bindung“ von NEST AzubiConnect (motivierendes Arbeitsumfeld, Wertschätzung, Feedback, moderne Führung).$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '19 seconds'),
($w$Mentale Gesundheit in der Ausbildung$w$, $w$Psychische Belastungen sind eines der wichtigsten Risiken für den Ausbildungserfolg.
Aktuelle Zahlen:
- DGB-Ausbildungsreport 2026 (13.227 Azubis aus 25 häufigen Berufen, Selbstauskunft): 50,6 % fühlen sich psychisch belastet, häufig durch Leistungs-, Zeit- und Verantwortungsdruck sowie Personalmangel. Die Zufriedenheit mit der Ausbildung sank auf 65,7 %, den niedrigsten Wert seit Beginn der Erhebung.
- Studie von Bertelsmann Stiftung und Institut der deutschen Wirtschaft (2026, 929 Azubis und 1.188 Unternehmen): Rund 15 % der Azubis haben ein stark eingeschränktes Wohlbefinden. Von ihnen denken 74 % ernsthaft an einen Abbruch, bei stabilem Wohlbefinden sind es 12 %. Rund 35 % sprechen Belastungen aus Angst vor Nachteilen nicht an. 62 % der Unternehmen spüren Auswirkungen auf den Betrieb.
Was Betriebe tun können:
- das Thema offen und ohne Stigma ansprechen, etwa in Feedbackgesprächen,
- eine vertrauliche Ansprechperson benennen und bekannt machen,
- Ausbildende schulen, Warnsignale zu erkennen (Rückzug, häufige Fehlzeiten, Leistungsabfall, Gereiztheit),
- Arbeitslast und Überstunden im Blick behalten,
- Unterstützung von außen holen; gerade kleine und mittlere Betriebe sind laut der Studie darauf angewiesen.
Im NEST-Netzwerk ist Jana Kortwig die Ansprechpartnerin: Ihr Jugendzentrum Soulspace in Wuppertal bietet Jugendlichen kostenlos und ohne Termin einen Ort, um über Sorgen zu sprechen. NEST AzubiConnect bietet außerdem einen Resilienz-Workshop für Azubis und für Ausbildende den Workshop „Azubi-Bindung“ (Ansprechpartner: Patrick Nekola-Ossé).
In akuten Krisen oder bei Gefahr: im Notfall 112; rund um die Uhr erreichbar ist die TelefonSeelsorge unter 0800 111 0 111.$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '20 seconds'),
($w$Ausbildungsabbrüche verhindern: Warnsignale und Unterstützung im NEST-Netzwerk$w$, $w$Laut BIBB wurden im Berichtsjahr 2022 29,5 % der Ausbildungsverträge vorzeitig gelöst, rund zwei Drittel davon im ersten Ausbildungsjahr. Viele Abbrüche kündigen sich an.
Frühe Warnsignale: häufige Fehlzeiten oder Verspätungen, sinkende Leistungen in der Berufsschule, Rückzug, Gereiztheit, Konflikte im Team.
Was hilft:
- Auffälligkeiten früh, unter vier Augen und wertschätzend ansprechen: Was ist los, was brauchst du?
- Ursachen auseinanderhalten: Liegt es am Beruf, am Betrieb, an der Berufsschule oder an privaten Belastungen? Danach richtet sich die Lösung.
- Gemeinsam konkrete nächste Schritte vereinbaren und nach zwei bis drei Wochen nachhalten.
- Paten oder Patinnen einsetzen und den Austausch mit anderen Azubis fördern.
Unterstützung durch NEST und das Netzwerk:
- Workshops von NEST AzubiConnect: für Azubis zum Beispiel Resilienz, Lernmotivation, Zeit- und Selbstmanagement oder Kommunikation, für Ausbildende „Azubi-Bindung“ und „Generationen“. Ansprechpartner: Patrick Nekola-Ossé.
- Bei psychischen Belastungen: Jana Kortwig (Soulspace), bei der Jugendliche kostenlos und ohne Termin über ihre Sorgen sprechen können.
- Bei internationalen Azubis, die schwer ankommen: Esther Königes (WorkStadt).
- Erfahrungen anderer Betriebe: über „An Netzwerk weitergeben“ oder beim Ausbildungsdialog und den Netzwerktreffen mit über 70 Ausbildungsbetrieben.
- Rund um eure Partnerschaft und alle weiteren Fragen: Mike Stoeck.$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '21 seconds'),
($w$Sprache und Ankommen internationaler Azubis$w$, $w$Fachsprache in Betrieb und Berufsschule ist für Azubis mit nichtdeutscher Erstsprache oft die größte Hürde, auch wenn die Alltagssprache gut klappt.
Im Betrieb hilft:
- ein Glossar mit den wichtigsten Fachbegriffen, gern mit Bildern,
- Paten oder Patinnen aus dem Team,
- Arbeitsanweisungen kurz und klar, im Zweifel zeigen statt erklären,
- Nachfragen ausdrücklich erwünscht machen,
- die Fachbegriffe aus der Berufsschule gemeinsam durchgehen, zum Beispiel bei der wöchentlichen Durchsicht des Berichtshefts,
- feste Lernzeit für Sprache im Betrieb einplanen,
- Unterstützung bei Behördengängen, Wohnungssuche und Kontakten außerhalb der Arbeit, denn wer sich in der Stadt wohlfühlt, bleibt eher.
Im NEST-Netzwerk begleitet Esther Königes (WorkStadt, Wuppertal) Unternehmen beim Onboarding internationaler Fachkräfte, beim Ankommen in der Stadt und bei der Integration ins Team. Der Workshop „Interkulturelle Kompetenz“ von NEST AzubiConnect stärkt das Miteinander in gemischten Azubi-Teams (Ansprechpartner: Patrick Nekola-Ossé).$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '22 seconds'),
($w$Übernahme und Perspektiven nach der Ausbildung$w$, $w$Die Aussicht auf Übernahme ist ein starkes Argument, schon bei der Bewerbung. Laut IAB-Betriebspanel wurden 2025 rund 75 % der Ausbildungsabsolvent:innen von ihrem Ausbildungsbetrieb übernommen, nach einem Rekordwert von 79 % im Jahr 2024. Die Unterschiede zwischen Branchen sind groß: In der öffentlichen Verwaltung oder im Finanzwesen sind es rund 90 %, in der Land- und Forstwirtschaft 44 %.
Was die Bindung über die Ausbildung hinaus stärkt:
- Übernahme früh besprechen, spätestens etwa ein Jahr vor Ausbildungsende; Unsicherheit führt dazu, dass gute Azubis sich anderweitig bewerben.
- Entwicklungswege zeigen: Spezialisierung, Verantwortung im Team, Ausbilderrolle.
- Weiterbildung ermöglichen, zum Beispiel zur Meister:in, Techniker:in oder Fachwirt:in. Zeigt früh, ob und wie ihr dabei unterstützt, etwa mit Freistellung oder Kostenbeteiligung.
- Bei guten Leistungen ist eine Verkürzung der Ausbildung oder eine vorzeitige Zulassung zur Abschlussprüfung möglich; beides wird bei der Kammer beantragt.
- Wertschätzung zum Abschluss: Zeugnisübergabe, Feier oder eine Prämie für die bestandene Prüfung.$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '23 seconds'),
($w$Benefits, die bei Azubis ankommen$w$, $w$Neben einer fairen Vergütung zählen für junge Menschen vor allem Dinge, die den Alltag spürbar erleichtern.
Vergütung: Die gesetzliche Mindestausbildungsvergütung liegt für Ausbildungen mit Beginn 2026 bei 724 € (1. Jahr), 854 € (2. Jahr), 977 € (3. Jahr) und 1.014 € (4. Jahr); für Ausbildungen mit Beginn 2027 steigt sie im ersten Jahr auf 764 €. Tarifgebundene Betriebe dürfen sich nach ihrem Tarifvertrag richten.
Mobilität: Das Deutschlandticket kostet seit Januar 2026 63 € im Monat. Ein Arbeitgeberzuschuss zum Jobticket ist nach § 3 Nr. 15 EStG steuerfrei; zahlt der Betrieb mindestens 25 %, gibt es beim Deutschland-Jobticket zusätzlich 5 % Rabatt.
Weitere Benefits, die gut ankommen:
- Lernmittel, Fachbücher, Tablet oder Laptop für Berufsschule und Berichtsheft,
- Prämien für gute Zwischen- oder Abschlussprüfungen,
- Zuschuss zum Führerschein, wenn er für den Beruf hilfreich ist,
- Azubi-Events, gemeinsame Projekte und Austausch mit anderen Azubis, zum Beispiel bei Workshops von NEST AzubiConnect,
- verlässliche Arbeitszeiten und Freizeitausgleich für Überstunden,
- Gesundheitsangebote, auch zur mentalen Gesundheit (im NEST-Netzwerk: Jana Kortwig, Soulspace).
Wichtig: Benefits ersetzen keine gute Ausbildung, wirken aber als Zeichen der Wertschätzung und sind in Stellenanzeigen ein starkes Argument.$w$, $w$Azubis halten$w$, 'nest', true, 'freigegeben', now() + interval '24 seconds'),
($w$Berufsschule: Freistellung und Anrechnung auf die Arbeitszeit$w$, $w$Seit der Reform des Berufsbildungsgesetzes 2020 gelten für volljährige und minderjährige Azubis weitgehend dieselben Regeln (§ 15 BBiG; verbindliche Auskunft gibt eure Kammer):
- Der Betrieb muss Azubis für den Berufsschulunterricht freistellen.
- Ein Berufsschultag mit mehr als fünf Unterrichtsstunden à 45 Minuten wird einmal pro Woche mit der durchschnittlichen täglichen Ausbildungszeit angerechnet. Eine Rückkehr in den Betrieb ist an diesem Tag nicht nötig.
- Eine Berufsschulwoche mit planmäßigem Blockunterricht von mindestens 25 Stunden an mindestens fünf Tagen wird mit der durchschnittlichen wöchentlichen Ausbildungszeit angerechnet.
- An anderen Berufsschultagen wird die Unterrichtszeit einschließlich der Pausen angerechnet. Wie Wegezeiten zwischen Schule und Betrieb zu behandeln sind, klärt im Einzelfall eure Kammer.
- Am Arbeitstag unmittelbar vor der schriftlichen Abschlussprüfung haben alle Azubis Anspruch auf Freistellung bei fortlaufender Vergütung. Bei einer gestreckten Prüfung gilt das vor jedem Teil mit schriftlicher Prüfung.
- Die Vergütung läuft während Berufsschule und Prüfungen weiter.
Tipp: Haltet Kontakt zur Berufsschule, zum Beispiel über Ausbildersprechtage. Wer früh weiß, wo es in der Schule hakt, kann gezielt unterstützen.$w$, $w$Berufsschule & Prüfungen$w$, 'nest', true, 'freigegeben', now() + interval '25 seconds'),
($w$Prüfungsvorbereitung: Azubis gut durch Zwischen- und Abschlussprüfung bringen$w$, $w$Voraussetzungen für die Zulassung zur Abschlussprüfung (§ 43 BBiG): zurückgelegte Ausbildungszeit, Teilnahme an der vorgeschriebenen Zwischenprüfung bzw. Teil 1 der gestreckten Abschlussprüfung und ein ordnungsgemäß geführter Ausbildungsnachweis. Bei der gestreckten Abschlussprüfung zählt Teil 1 bereits zur Endnote.
So unterstützt ihr:
- Frühzeitig planen: Prüfungstermine der Kammer im Kalender, rückwärts einen Lernplan erstellen.
- Lücken finden: Abgleich mit dem Ausbildungsrahmenplan; Inhalte, die im Betrieb noch nicht vorkamen, gezielt nachholen.
- Üben unter Prüfungsbedingungen: alte Prüfungsaufgaben, Probeprüfungen und Simulation des praktischen Teils oder Fachgesprächs.
- Lernzeit im Betrieb einräumen und Lerngruppen mit anderen Azubis ermöglichen.
- Freistellung am Arbeitstag vor der schriftlichen Prüfung beachten (gesetzlicher Anspruch).
- Prüfungsangst ernst nehmen: Gespräche, realistische Ziele, Pausen. Bei starker Belastung hilft im NEST-Netzwerk Jana Kortwig (Soulspace).
- Bei guten Leistungen über Verkürzung oder vorzeitige Zulassung sprechen (Antrag bei der Kammer).
NEST AzubiConnect hat Workshops zu Lernmotivation sowie Zeit- und Selbstmanagement (Ansprechpartner: Patrick Nekola-Ossé).$w$, $w$Berufsschule & Prüfungen$w$, 'nest', true, 'freigegeben', now() + interval '26 seconds'),
($w$Jugendarbeitsschutz: Was bei minderjährigen Azubis gilt$w$, $w$Für Azubis unter 18 Jahren gilt zusätzlich das Jugendarbeitsschutzgesetz (verbindliche Auskunft gibt eure zuständige Kammer; Tarifverträge können Abweichungen enthalten):
- Arbeitszeit: höchstens 8 Stunden am Tag und 40 Stunden in der Woche, verteilt auf höchstens fünf Tage. Samstage, Sonntage und Feiertage sind grundsätzlich frei; für bestimmte Branchen wie Gastronomie, Handel oder Pflege gibt es Ausnahmen mit Ausgleichstagen.
- Pausen: mindestens 30 Minuten bei mehr als 4,5 Stunden, 60 Minuten bei mehr als 6 Stunden Arbeitszeit. Pausen müssen mindestens 15 Minuten lang sein und dürfen nicht ganz am Anfang oder Ende liegen.
- Ruhezeit: mindestens 12 Stunden zwischen zwei Arbeitstagen; Nachtarbeit ist grundsätzlich verboten.
- Berufsschule: Freistellung und Anrechnung wie im Berufsbildungsgesetz geregelt; vor einem Unterricht, der vor 9 Uhr beginnt, dürfen Minderjährige nicht beschäftigt werden.
- Gesundheit: Vor Beginn der Ausbildung muss eine ärztliche Erstuntersuchung vorliegen, die nicht älter als 14 Monate ist; ohne Bescheinigung darf nicht beschäftigt werden. Ein Jahr nach Beginn ist eine Nachuntersuchung vorgesehen.
- Urlaub: je nach Alter mindestens 25 bis 30 Werktage.
- Gefährliche Arbeiten und Akkordarbeit sind nur eingeschränkt erlaubt.
Tipp: Plant Dienst- und Schichtpläne für minderjährige Azubis gesondert und prüft sie, wenn jemand 18 wird.$w$, $w$Sonstiges$w$, 'nest', true, 'freigegeben', now() + interval '27 seconds'),
($w$Ausbilden dürfen: Eignung von Betrieb und Ausbilder:innen$w$, $w$Wer ausbildet, muss laut Berufsbildungsgesetz persönlich und fachlich geeignet sein, und der Betrieb muss als Ausbildungsstätte geeignet sein.
Die wichtigsten Punkte:
- Ausbildereignung: Mindestens eine verantwortliche Person braucht in der Regel die Ausbildereignungsprüfung nach der Ausbilder-Eignungsverordnung (AEVO, „Ausbilderschein“). Sie wird bei IHK oder HWK abgelegt. In vielen Handwerksberufen ist die Ausbildereignung bereits Teil der Meisterprüfung.
- Die bestandene Prüfung allein reicht nicht: Die zuständige Kammer prüft zusätzlich die fachliche Eignung der Person und die Eignung des Betriebs, etwa ob alle Inhalte des Ausbildungsrahmenplans vermittelt werden können.
- Wenn nicht alle Inhalte im eigenen Betrieb möglich sind, können einzelne Abschnitte in einem anderen Betrieb stattfinden (Verbundausbildung). Betriebe aus dem NEST-Netzwerk sind dafür naheliegende Partner; über „An Netzwerk weitergeben“ könnt ihr nach passenden Betrieben fragen.
- Auch Fachkräfte ohne Ausbilderschein können als ausbildende Fachkräfte unter Verantwortung der Ausbilderin oder des Ausbilders mitwirken.
Die Kammer trägt das Ausbildungsverhältnis auch ein. Ausbildende stärkt NEST AzubiConnect mit Workshops wie „Generationen“ und „Azubi-Bindung“ (Ansprechpartner: Patrick Nekola-Ossé); rund um die Partnerschaft mit NEST ist Mike Stoeck euer Ansprechpartner.$w$, $w$Sonstiges$w$, 'nest', true, 'freigegeben', now() + interval '28 seconds');
commit;
