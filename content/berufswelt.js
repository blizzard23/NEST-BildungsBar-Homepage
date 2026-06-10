const IC = {
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
};

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
              <div class="hp-chips">
                <span class="hp-chip hp-chip--on">Alle</span>
                <span class="hp-chip">Handwerk</span>
                <span class="hp-chip">IT</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px;flex:1;overflow:hidden;">
                <div class="hp-card" style="border-radius:9px;padding:7px 9px;display:block;border-left:3px solid var(--gold);">
                  <span style="font-size:7.5px;font-weight:800;color:#1f9d63;">Neu</span>
                  <div style="font-size:10px;font-weight:800;color:var(--navy);line-height:1.2;">Mechatroniker:in</div>
                  <div style="font-size:8.5px;color:var(--text-soft);">Maier &amp; Söhne · Wuppertal</div>
                </div>
                <div class="hp-card" style="border-radius:9px;padding:7px 9px;display:block;border-left:3px solid var(--gold);">
                  <span style="font-size:7.5px;font-weight:800;color:var(--gold-dark);">Dual</span>
                  <div style="font-size:10px;font-weight:800;color:var(--navy);line-height:1.2;">BWL Industrie</div>
                  <div style="font-size:8.5px;color:var(--text-soft);">Rhenag · Essen</div>
                </div>
                <div class="hp-card" style="border-radius:9px;padding:7px 9px;display:block;border-left:3px solid var(--gold);">
                  <span style="font-size:7.5px;font-weight:800;color:var(--navy);">2 Plätze</span>
                  <div style="font-size:10px;font-weight:800;color:var(--navy);line-height:1.2;">Fachinformatiker:in</div>
                  <div style="font-size:8.5px;color:var(--text-soft);">DigiSystems · Essen</div>
                </div>
              </div>
            </div>
          </a>
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
        <div class="card reveal"><div class="icon icon-svg">${IC.compass}</div><h3>Was passt zu mir?</h3><p>Wähl im Berufsfinder einfach aus, worauf du Lust hast – wir zeigen dir passende Berufe.</p><a class="badge link" href="#felder">Jetzt ausprobieren →</a></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.grid}</div><h3>150+ Berufe</h3><p>Eine umfassende Datenbank über alle Branchen hinweg – von A wie Anlagenmechaniker bis Z.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.cap}</div><h3>Duales Studium</h3><p>Zahlreiche Bachelor-Optionen, die Theorie und Praxis im Betrieb verbinden.</p></div>
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
        <div class="split-media split-locs">
          <div class="loc-img-pair">
            <div class="loc-img">
              <img src="/assets/img/team/bildungsbar-aussen.jpg" alt="BildungsBar Wuppertal" loading="lazy">
              <span class="loc-label">Wuppertal</span>
            </div>
            <div class="loc-img">
              <div class="loc-img-placeholder"><span class="loc-img-city">Essen</span></div>
              <span class="loc-label">Essen</span>
            </div>
          </div>
        </div>
        <div class="split-text reveal">
          <span class="section-label">Dein nächster Schritt</span>
          <h2>Wir begleiten dich persönlich</h2>
          <p>Eine Datenbank ist gut – persönliche Beratung ist besser. In der BildungsBar besprechen wir gemeinsam, welche Berufe zu dir passen und vernetzen dich direkt mit passenden Unternehmen.</p>
          <ul class="list-check">
            <li>Individuelle Berufsberatung auf Augenhöhe</li>
            <li>Bewerbungstraining „Fit für die Jobsuche"</li>
            <li>Direkte Vernetzung zu über 70 Unternehmen</li>
          </ul>
          <a class="btn btn-navy mt-2" href="/terminbuchung">Jetzt Termin buchen →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Merkliste share toast (hidden, shown by JS) -->
  <div class="merk-share-toast" id="merk-share-toast">Link kopiert – teile deine Merkliste!</div>

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
