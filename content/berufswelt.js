import IC from "./icons";

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
        <div class="hero-visual hero-visual--phone">
          <a class="hero-phone" href="#felder" aria-label="Berufswelt – Stellenangebote entdecken">
            <span class="hp-notch"></span>
            <div class="hp-screen">
              <span class="hp-badge">Berufswelt</span>
              <div class="hp-title">Aktuelle Stellen</div>
              <div class="hp-search">Beruf oder Stelle suchen …</div>
              <div class="hp-chips">
                <span class="hp-chip hp-chip--on">Alle</span>
                <span class="hp-chip">Handwerk</span>
                <span class="hp-chip">IT</span>
                <span class="hp-chip">Gesundheit</span>
              </div>
              <div class="hp-grid">
                <div class="hp-card"><img src="/assets/img/berufe/mechatroniker.png" alt="" loading="lazy"><span class="hp-name">Mechatroniker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/fachinformatiker-systemintegration.png" alt="" loading="lazy"><span class="hp-name">Fachinformatiker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/automobilkaufleute.png" alt="" loading="lazy"><span class="hp-name">Automobilkaufleute</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/baecker.png" alt="" loading="lazy"><span class="hp-name">Bäcker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/augenoptiker.png" alt="" loading="lazy"><span class="hp-name">Augenoptiker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/anlagenmechaniker-rohrsystemtechnik.webp" alt="" loading="lazy"><span class="hp-name">Anlagenmechaniker:in</span></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- EINSTIEG · Vorlage: Brilliant „A solution for diverse educational settings" -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">Finde heraus, <span class="bb-hl">was zu dir passt</span></h2>
        <p class="bb-lead">Die Auswahl ist riesig – über 150 Ausbildungsberufe und zahlreiche duale Studiengänge. Wir helfen dir, den Überblick zu behalten und den richtigen Weg einzuschlagen.</p>
      </div>
      <div class="bb-cols bb-cols--center">
        <a class="bb-col" href="#felder"><span class="bb-col__ic">${IC.compass}</span><div class="bb-col__body"><h3>Was passt zu mir?</h3><p>Wähl im Berufsfinder einfach aus, worauf du Lust hast – wir zeigen dir passende Berufe.</p><span class="bb-link">Jetzt ausprobieren</span></div></a>
        <div class="bb-col"><span class="bb-col__ic">${IC.layers}</span><div class="bb-col__body"><h3>150+ Berufe</h3><p>Eine umfassende Datenbank über alle Branchen hinweg – von A wie Anlagenmechaniker bis Z.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.cap}</span><div class="bb-col__body"><h3>Duales Studium</h3><p>Zahlreiche Bachelor-Optionen, die Theorie und Praxis im Betrieb verbinden.</p></div></div>
      </div>
    </div>
  </section>

  <!-- BERUFE-BROWSER · Vorlage: Brilliant „Browse all 70+ courses" + „Learning paths" (inkl. aktuelle Stellen unter dem Suchfeld) -->
  <section class="bb-sec bb-sec--flush-top" id="felder">
    <div class="container">
      <div class="bb-ruled">
        <div class="bb-head">
          <h2 class="bb-h2">Finde deinen Beruf</h2>
          <p class="bb-lead">Durchsuche unsere komplette Liste an Ausbildungsberufen und dualen Studiengängen oder filtere nach Berufsfeld. Klick auf einen Beruf für Details.</p>
        </div>
        <div id="berufe-browser"></div>
      </div>
    </div>
  </section>

  <!-- BEGLEITUNG · Vorlage: Brilliant „Careers" (gerahmtes Bild + Text) -->
  <section class="bb-sec bb-sec--band">
    <div class="container">
      <div class="bb-split">
        <div class="bb-frame bb-frame--43"><img src="/assets/img/standort-essen.png" alt="Beratungsraum der BildungsBar Essen" loading="lazy"></div>
        <div>
          <h2 class="bb-h2">Wir begleiten dich persönlich</h2>
          <p class="bb-lead" style="margin-top:16px;">Eine Datenbank ist gut – persönliche Beratung ist besser. In der BildungsBar besprechen wir gemeinsam, welche Berufe zu dir passen und vernetzen dich direkt mit passenden Unternehmen.</p>
          <ul class="bb-bullets">
            <li>Individuelle Berufsberatung auf Augenhöhe</li>
            <li>Bewerbungstraining „Fit für die Jobsuche“</li>
            <li>Direkte Vernetzung zu über 70 Unternehmen</li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/terminbuchung">Jetzt Termin buchen</a></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Merkliste share toast (hidden, shown by JS) -->
  <div class="merk-share-toast" id="merk-share-toast">Link kopiert – teile deine Merkliste!</div>

  <!-- ABSCHLUSS · Vorlage: Brilliant „Join over 10 million people learning on Brilliant" -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Welcher Beruf passt zu dir?</h2>
          <p class="bb-lead">Noch unsicher? Kein Problem – genau dafür sind wir da. Buch dir einen kostenfreien Termin und wir finden es gemeinsam heraus.</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/terminbuchung">Termin buchen</a><a class="bb-btn bb-btn--light" href="/fuer-schulen">Für Schulen</a></div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="https://wa.me/4915753934038"><small>WhatsApp</small><b>01575 393 4038</b></a><span>Schreib uns einfach</span></div>
          <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Ruf uns an</span></div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
