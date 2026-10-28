import IC from "./icons";

const html = `

  <!-- HERO (dunkle wf-Kopfzeile, unverändert) -->
  <section class="wf wf--hero">
    <div class="wf-inner">
      <div class="wf-header">
        <div class="wf-eyebrow"><div class="wf-eyebrow-line"></div>Drei Säulen<div class="wf-eyebrow-line"></div></div>
        <h2 class="wf-h1">Was eure <em>Kooperation</em> bewirkt</h2>
        <p class="wf-lead">Eure Partnerschaft wirkt auf drei Ebenen – gleichermaßen wichtig: ihr übernehmt gesellschaftliche Verantwortung, werdet bei jungen Talenten sichtbar und werdet Teil eines starken regionalen Netzwerks.</p>
      </div>
    </div>
  </section>

  <!-- DREI SÄULEN · Linie, Titel links, Angebots-Karten rechts -->
  <section class="bb-sec">
    <div class="container">

      <div class="bb-pillar">
        <div class="bb-pillar__head">
          <span class="bb-pillar__n">01</span>
          <h2 class="bb-h2">Gemeinwohl</h2>
          <p class="bb-p">Mehr als Marketing: Ihr gestaltet aktiv die Ausbildungskultur in der Region und übernehmt gesellschaftliche Verantwortung.</p>
        </div>
        <ul class="bb-offers">
          <li><span class="bb-offers__ic">${IC.coffee}</span><div><b>Beratungsangebote in der BildungsBar <span class="bb-badge bb-badge--soft">vor Ort</span></b><p>Kostenfreie, persönliche Berufsorientierung für junge Menschen in Wuppertal, Essen, Solingen &amp; Remscheid – auf Augenhöhe und ohne Hürden.</p></div></li>
          <li><span class="bb-offers__ic">${IC.building}</span><div><b>Workshops für Schulen &amp; Einrichtungen <span class="bb-badge bb-badge--soft">an Schulen</span></b><p>Erlebbare Berufsorientierung direkt im Klassenzimmer und in sozialen Einrichtungen – jugendgerecht und kAoA-konform.</p></div></li>
          <li><span class="bb-offers__ic">${IC.refresh}</span><div><b>On- &amp; Offboarding <span class="bb-badge bb-badge--soft">dauerhaft</span></b><p>Vor dem Vorstellungsgespräch bereiten sich Bewerbende bei uns vor – und nach einer Absage vermitteln wir sie an andere Partnerbetriebe weiter, statt sie zu verlieren.</p></div></li>
        </ul>
      </div>

      <div class="bb-pillar">
        <div class="bb-pillar__head">
          <span class="bb-pillar__n">02</span>
          <h2 class="bb-h2">Außenwirkung</h2>
          <p class="bb-p">Werdet sichtbar, wo die Jugend ist – digital, in den sozialen Medien und direkt im Unterricht.</p>
        </div>
        <ul class="bb-offers">
          <li><span class="bb-offers__ic">${IC.monitor}</span><div><b>Eure interaktive Stellenseite <span class="bb-badge bb-badge--soft">NEST Berufswelt</span></b><p>In der NEST Berufswelt findet ihr euch zwischen über 150 Ausbildungsberufen wieder: ein eigenes Profil mit euren Ausbildungsplätzen, das junge Menschen über den Berufsfinder und die Live-Jobbörse direkt zu euch führt – einfach gepflegt, immer aktuell.</p></div></li>
          <li><span class="bb-offers__ic">${IC.megaphone}</span><div><b>Social Media &amp; Reichweite <span class="bb-badge bb-badge--soft">digital</span></b><p>Instagram, LinkedIn &amp; Spotify – wir bringen eure Ausbildung dorthin, wo die Jugend ist.</p></div></li>
          <li><span class="bb-offers__ic">${IC.play}</span><div><b>NESTplay. <span class="bb-badge">Highlight</span></b><p>Präsentiert euren Betrieb direkt im Unterricht als interaktives Live-Quiz – Schüler:innen spielen in Echtzeit und behalten euch im Kopf.</p><a class="bb-link" href="https://nest-play.de" target="_blank" rel="noopener">Zu NESTplay.</a></div></li>
          <li><span class="bb-offers__ic">${IC.people}</span><div><b>NEST Explore <span class="bb-badge">Highlight</span></b><p>NEST Explore kommt direkt in die Schulen der Region. Ihr trefft motivierte Schüler:innen persönlich – komplett von NEST organisiert.</p><a class="bb-link" href="https://nest-explore.de" target="_blank" rel="noopener">Zu NEST Explore</a></div></li>
        </ul>
      </div>

      <!-- Stellenseite · Fenster-Ausschnitt + Liste -->
      <div class="bb-split bb-feature-row">
        <div class="bb-frame bb-window bb-frame--wide">
          <div class="bb-window__bar"><i></i><i></i><i></i><span>nest-bildungsbar.de/berufswelt</span></div>
          <div class="bb-window__body"><img src="/assets/img/berufswelt-screenshot.png" alt="NEST Berufswelt – interaktive Stellenseite mit Suche, Filtern und aktuellen Ausbildungsplätzen" loading="lazy"></div>
        </div>
        <div>
          <h3 class="bb-h3" style="font-size:24px;">So sieht euer Profil in der Berufswelt aus</h3>
          <ul class="bb-bullets">
            <li><b>Unternehmensprofil</b> mit Logo, Beschreibung &amp; Kultur</li>
            <li><b>Live-Stellen</b> in der Jobbörse – 30 Tage aktuell, filterbar nach Interesse</li>
            <li><b>Direkter „Bewerben“-Button</b> zur BildungsBar</li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--light" href="/berufswelt">Zur Berufswelt</a></div>
        </div>
      </div>

      <div class="bb-pillar">
        <div class="bb-pillar__head">
          <span class="bb-pillar__n">03</span>
          <h2 class="bb-h2">Netzwerk</h2>
          <p class="bb-p">Ihr seid nie allein mit den Herausforderungen der Ausbildung – wir bringen die Partner regelmäßig zusammen.</p>
        </div>
        <ul class="bb-offers">
          <li><span class="bb-offers__ic">${IC.chat}</span><div><b>Ausbildungsdialog <span class="bb-badge bb-badge--soft">Input</span></b><p>Regelmäßige Veranstaltungen zu relevanten Themen der Ausbildung – mit externem Input von Expert:innen und gemeinsamem Austausch der Betriebe.</p></div></li>
          <li><span class="bb-offers__ic">${IC.network}</span><div><b>Netzwerktreffen <span class="bb-badge bb-badge--soft">4× im Jahr</span></b><p>Viermal im Jahr kommen alle Partner zusammen – jeweils zu Gast bei einem unserer Partnerunternehmen.</p></div></li>
        </ul>
      </div>

    </div>
  </section>

  <!-- ERGEBNIS · Gold-Band -->
  <div class="bb-trust">
    <div class="container">
      <p class="bb-trust__title">Alle drei Säulen aus einer Hand – gemeinsam für die Ausbildung</p>
      <div class="bb-trust__row bb-trust__row--3">
        <div class="bb-trust__item"><b>70+</b><span>Unternehmen im Netzwerk</span></div>
        <div class="bb-trust__item"><b>500+</b><span>junge Menschen pro Jahr</span></div>
        <div class="bb-trust__item"><b>4</b><span>Standorte: Wuppertal · Essen · Solingen · Remscheid</span></div>
      </div>
    </div>
  </div>

  <!-- ABLAUF · Spalten mit Trennlinien (Linear) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">In drei Schritten zur Kooperation</h2>
      </div>
      <div class="bb-cols">
        <div class="bb-col"><span class="bb-num-tile">1</span><div class="bb-col__body"><h3>Kennenlernen</h3><p>Wir besprechen eure Ziele und finden das passende Kooperationspaket für euren Betrieb.</p><span class="bb-badge bb-badge--soft" style="margin-top:12px;">unverbindlich</span></div></div>
        <div class="bb-col"><span class="bb-num-tile">2</span><div class="bb-col__body"><h3>Sichtbar werden</h3><p>Ihr werdet Teil unseres Netzwerks: Workshops, Stellenseite, Social Media und NESTplay.</p><span class="bb-badge bb-badge--soft" style="margin-top:12px;">erlebbar</span></div></div>
        <div class="bb-col"><span class="bb-num-tile">3</span><div class="bb-col__body"><h3>Talente finden</h3><p>Wir vernetzen motivierte junge Menschen direkt mit euch – für Praktikum und Ausbildung.</p><span class="bb-badge bb-badge--soft" style="margin-top:12px;">passgenau</span></div></div>
      </div>
    </div>
  </section>

  <!-- PAKETE · dunkle Karten (Spline, Epidemic Sound) -->
  <section class="bb-sec bb-sec--ink" id="preise">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Ein Paket für jede Betriebsgröße</h2>
        <p class="bb-lead">Transparente monatliche Preise – passend zur Anzahl eurer Auszubildenden.</p>
      </div>
      <div class="bb-plans">
        <div class="bb-plan">
          <div class="bb-plan__head">Kleinste Kooperation</div>
          <div class="bb-plan__body"><div class="bb-plan__price">79,90 € <small>/ Monat</small></div><div class="bb-plan__who">bis 5 Auszubildende</div><a class="bb-btn bb-btn--light bb-btn--sm" href="/kontakt#termin">Anfragen</a></div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head">Mittlere Kooperation</div>
          <div class="bb-plan__body"><div class="bb-plan__price">139,90 € <small>/ Monat</small></div><div class="bb-plan__who">bis 10 Auszubildende</div><a class="bb-btn bb-btn--light bb-btn--sm" href="/kontakt#termin">Anfragen</a></div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head">Große Kooperation</div>
          <div class="bb-plan__body"><div class="bb-plan__price">199,90 € <small>/ Monat</small></div><div class="bb-plan__who">ab 11 Auszubildende</div><a class="bb-btn bb-btn--light bb-btn--sm" href="/kontakt#termin">Anfragen</a></div>
        </div>
      </div>
      <div class="bb-included">
        <b>In jedem Paket enthalten</b>
        <ul>
          <li>Workshops &amp; OpenHouse</li>
          <li>Stellenseite &amp; Social Media</li>
          <li>NESTplay in Schulen</li>
          <li>Ausbildungsdialog &amp; Netzwerktreffen</li>
          <li>On- &amp; Offboarding-Support</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- VERGLEICH · Tabelle mit hervorgehobener Spalte -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">Mit BildungsBar vs. allein</h2>
        <p class="bb-lead">Die Herausforderungen der modernen Ausbildung bewältigt man am besten gemeinsam.</p>
      </div>
      <table class="bb-compare">
        <thead><tr><th></th><th>Klassische Suche</th><th class="is-us">Mit der BildungsBar</th></tr></thead>
        <tbody>
          <tr><td><b>Erlebbar</b><span>Workshops &amp; OpenHouse machen euch nahbar</span></td><td><span class="bb-no">${IC.x}</span><span>Anonym – nur Stellenanzeige ohne Gesicht</span></td><td class="is-us"><span class="bb-yes">${IC.check}</span></td></tr>
          <tr><td><b>Reichweite</b><span>Social Media &amp; Stellenseite</span></td><td><span class="bb-no">${IC.x}</span><span>Streuverlust – wenig zielgruppengerecht</span></td><td class="is-us"><span class="bb-yes">${IC.check}</span></td></tr>
          <tr><td><b>Vorqualifiziert</b><span>motivierte, passende Talente</span></td><td><span class="bb-no">${IC.x}</span><span>Unsicher – Qualität der Bewerbungen schwankt</span></td><td class="is-us"><span class="bb-yes">${IC.check}</span></td></tr>
          <tr><td><b>Netzwerk</b><span>Austausch &amp; Ausbildungsdialog</span></td><td><span class="bb-no">${IC.x}</span><span>Allein – kein Austausch mit anderen Betrieben</span></td><td class="is-us"><span class="bb-yes">${IC.check}</span></td></tr>
          <tr><td><b>Begleitung</b><span>On- &amp; Offboarding-Support</span></td><td><span class="bb-no">${IC.x}</span><span>Abbruchrisiko – wenig Begleitung der Azubis</span></td><td class="is-us"><span class="bb-yes">${IC.check}</span></td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- FAQ · Dovetail (Titel links, Fragen rechts) -->
  <section class="bb-sec bb-sec--band bb-faq">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">Häufig gestellte Fragen</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question"><span>Was kostet eine Kooperation?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Kooperation startet ab 79,90 € pro Monat (bis 5 Auszubildende). Für größere Betriebe gibt es die Pakete für 139,90 € und 199,90 € pro Monat.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Mit welchen Talenten werden wir vernetzt?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir begleiten junge Menschen von der Berufsorientierung bis zum Vorstellungsgespräch und vernetzen passende, motivierte Kandidat:innen direkt mit euch.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Was ist NESTplay?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">NESTplay ist unser spielerisches Format, mit dem ihr euren Betrieb direkt in Schulen präsentiert – modern, interaktiv und einprägsam.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wie werden wir Teil des Netzwerks?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten in einem unverbindlichen Kennenlerngespräch. Meldet euch über das Kontaktformular oder telefonisch – wir finden gemeinsam das passende Paket.</div></div></div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Navy-Karte mit Gold-Kante -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Gemeinsam für die Ausbildung</h2>
          <p class="bb-lead">Werdet Teil unseres Netzwerks und gestaltet die Ausbildung von morgen mit. Wir freuen uns auf das Gespräch.</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/kontakt#termin">Gespräch vereinbaren</a><a class="bb-btn bb-btn--light" href="/referenzen">Referenzen ansehen</a></div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="mailto:info@nest-bildungsbar.de"><small>E-Mail</small><b>info@nest-bildungsbar.de</b></a><span>Schreibt uns</span></div>
          <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Ruft uns an</span></div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
