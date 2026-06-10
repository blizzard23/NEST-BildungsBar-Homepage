const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-badge">Berufswelt</span>
          <h1>Über 150 Wege<br /><em>in deine Ausbildung</em></h1>
          <p class="lead">Von Gesundheit über Handwerk bis IT: Wir helfen dir, die Ausbildung oder das duale Studium zu finden, das wirklich zu dir passt.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/terminbuchung">Beratung buchen →</a>
            <a class="btn btn-ghost" href="#felder">Berufsfelder ansehen</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="mock-bar"><i></i><i></i><i></i></div>
          <div class="mock-row"><span class="ic" data-icon="health" data-icon-size="20"></span><span class="tx"><b>Gesundheit &amp; Soziales</b><small>Pflege, Erziehung, MFA …</small></span></div>
          <div class="mock-row"><span class="ic" data-icon="tools" data-icon-size="20"></span><span class="tx"><b>Handwerk &amp; Technik</b><small>Elektro, Anlagen, Mechanik …</small></span></div>
          <div class="mock-row"><span class="ic" data-icon="monitor" data-icon-size="20"></span><span class="tx"><b>IT &amp; Digitalisierung</b><small>Fachinformatik, Systeme …</small></span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- INTRO -->
  <section class="bg-white">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Orientierung leicht gemacht</span>
        <h2>Finde heraus, was zu dir passt</h2>
        <p>Die Auswahl ist riesig – über 150 Ausbildungsberufe und zahlreiche duale Studiengänge. Wir helfen dir, den Überblick zu behalten und den richtigen Weg einzuschlagen.</p>
      </div>
      <div class="card-grid cols-3">
        <div class="card reveal"><div class="icon" data-icon="compass" data-icon-size="26"></div><h3>Was passt zu mir?</h3><p>Wähl im Berufsfinder einfach aus, worauf du Lust hast – wir zeigen dir passende Berufe.</p><a class="badge link" href="#felder">Jetzt ausprobieren →</a></div>
        <div class="card reveal"><div class="icon" data-icon="grid" data-icon-size="26"></div><h3>150+ Berufe</h3><p>Eine umfassende Datenbank über alle Branchen hinweg – von A wie Anlagenmechaniker bis Z.</p></div>
        <div class="card reveal"><div class="icon" data-icon="cap" data-icon-size="26"></div><h3>Duales Studium</h3><p>Zahlreiche Bachelor-Optionen, die Theorie und Praxis im Betrieb verbinden.</p></div>
      </div>
    </div>
  </section>

  <!-- AKTUELLE STELLEN (aus dem Plugin via REST) -->
  <section class="bg-light">
    <div class="container">
      <div id="stellen-section"></div>
    </div>
  </section>

  <!-- BERUFE-BROWSER -->
  <section class="bg-white" id="felder">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Alle Berufe im Überblick</span>
        <h2>Finde deinen Beruf</h2>
        <p>Durchsuche unsere komplette Liste an Ausbildungsberufen und dualen Studiengängen oder filtere nach Berufsfeld. Klick auf einen Beruf für Details.</p>
      </div>
      <div id="berufe-browser"></div>
    </div>
  </section>

  <!-- SPLIT -->
  <section class="bg-light">
    <div class="container">
      <div class="split rev">
        <div class="split-media"><span class="ph-emoji" data-icon="compass" data-icon-size="64"></span></div>
        <div class="split-text reveal">
          <span class="section-label">Dein nächster Schritt</span>
          <h2>Wir begleiten dich persönlich</h2>
          <p>Eine Datenbank ist gut – persönliche Beratung ist besser. Bei der BildungsBar besprechen wir gemeinsam, welche Berufe zu dir passen und vernetzen dich direkt mit passenden Unternehmen.</p>
          <ul class="list-check">
            <li>Individuelle Berufsberatung auf Augenhöhe</li>
            <li>Bewerbungstraining „Fit für die Jobsuche“</li>
            <li>Direkte Vernetzung zu über 70 Unternehmen</li>
          </ul>
          <a class="btn btn-navy mt-2" href="/terminbuchung">Jetzt Termin buchen →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section on-light">
    <div class="container">
      <div class="cta-inner">
        <span class="section-label" style="display:flex;justify-content:center;">Noch unsicher?</span>
        <h2>Welcher Beruf passt zu <em>dir?</em></h2>
        <p>Kein Problem – genau dafür sind wir da. Buch dir einen kostenfreien Termin und wir finden es gemeinsam heraus.</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/terminbuchung">Termin buchen</a>
          <a class="btn btn-ghost" href="/fuer-schulen">Für Schulen</a>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
