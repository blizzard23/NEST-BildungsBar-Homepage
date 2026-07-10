const IC = {
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
};

const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-badge">Gemeinsam für die Ausbildung</span>
          <h1>Die AusbildungsBar.<br /><em>Locker. Persönlich. Kostenfrei.</em></h1>
          <p class="lead">In lockerer Atmosphäre über verschiedene Ausbildungsberufe und Unternehmen informieren – und den passenden Partner für deine Zukunft finden.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/terminbuchung">Termin buchen →</a>
            <a class="btn btn-ghost" href="/berufswelt">Berufe entdecken</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>500+</strong><span>Gäste pro Jahr</span></div>
            <div class="stat"><strong>70+</strong><span>Unternehmenskontakte</span></div>
            <div class="stat"><strong>2</strong><span>Standorte</span></div>
          </div>
        </div>
        <div class="hero-visual hero-visual--phone">
          <a class="hero-phone" href="/berufswelt" aria-label="Berufswelt – alle Ausbildungsberufe entdecken">
            <span class="hp-notch"></span>
            <div class="hp-screen">
              <span class="hp-badge">Berufswelt</span>
              <div class="hp-title">Finde deinen Beruf</div>
              <div class="hp-search">Beruf oder Berufsfeld suchen …</div>
              <div class="hp-chips">
                <span class="hp-chip hp-chip--on">Alle</span>
                <span class="hp-chip">Handwerk</span>
                <span class="hp-chip">IT</span>
                <span class="hp-chip">Gesundheit</span>
              </div>
              <div class="hp-grid">
                <div class="hp-card"><img src="/assets/img/berufe/anlagenmechaniker-rohrsystemtechnik.webp" alt="" loading="lazy"><span class="hp-name">Anlagenmechaniker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/augenoptiker.png" alt="" loading="lazy"><span class="hp-name">Augenoptiker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/automobilkaufleute.png" alt="" loading="lazy"><span class="hp-name">Automobilkaufleute</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/fachinformatiker-systemintegration.png" alt="" loading="lazy"><span class="hp-name">Fachinformatiker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/baecker.png" alt="" loading="lazy"><span class="hp-name">Bäcker:in</span></div>
                <div class="hp-card"><img src="/assets/img/berufe/baeckereifachverkaeufer.png" alt="" loading="lazy"><span class="hp-name">Fachverkäufer:in</span></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <div class="stats-bar">
    <div class="container">
      <div class="stats-bar-inner">
        <div><div class="num">500+</div><div class="lbl">Gäste pro Jahr in Wuppertal</div></div>
        <div><div class="num">70+</div><div class="lbl">Unternehmenskontakte im Netzwerk</div></div>
        <div><div class="num">150+</div><div class="lbl">Ausbildungsberufe in der Beratung</div></div>
      </div>
    </div>
  </div>

  <!-- FEATURES -->
  <section class="bg-white">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Entdecke deinen Partner</span>
        <h2>Deine Berufsorientierung auf Augenhöhe</h2>
        <p>In der BildungsBar bekommst du kostenfreie Unterstützung rund um Ausbildung und Karriereplanung. Wir nehmen uns Zeit für dich – ganz ohne Druck.</p>
      </div>
      <div class="card-grid cols-3">
        <div class="card reveal"><div class="icon icon-svg">${IC.compass}</div><h3>Berufe entdecken</h3><p>Wir finden gemeinsam deine Stärken und Motive heraus – und welche Berufsfelder wirklich zu dir passen.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.briefcase}</div><h3>Bewerbung meistern</h3><p>Vom Anschreiben bis zum Lebenslauf: Wir helfen dir, überzeugende Bewerbungsunterlagen zu erstellen.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.people}</div><h3>Vorstellungsgespräch</h3><p>In simulierten Gesprächen üben wir den Ernstfall – für mehr Sicherheit und Selbstvertrauen.</p></div>
      </div>
    </div>
  </section>

  <!-- ABLAUF -->
  <section class="bg-light">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Schritt für Schritt</span>
        <h2>In drei Schritten zu deiner Ausbildung</h2>
        <p>Von der Terminbuchung bis zum passenden Betrieb – so einfach läuft deine Beratung in der BildungsBar.</p>
      </div>
      <div class="how-steps">
        <div class="how-step reveal"><div class="how-step-num step-icon">${IC.calendar}</div><h3>Termin buchen</h3><p>Such dir online einen Termin in Wuppertal, Essen, Solingen oder Remscheid aus – kostenfrei und unverbindlich.</p><span class="how-step-time">Mo–Do · 17–19 Uhr</span></div>
        <div class="how-step reveal"><div class="how-step-num step-icon">${IC.chat}</div><h3>Vor Ort beraten</h3><p>In lockerer Atmosphäre sprechen wir über Berufe, Bewerbung und passende Unternehmen.</p><span class="how-step-time">Persönlich &amp; ehrlich</span></div>
        <div class="how-step reveal"><div class="how-step-num step-icon">${IC.network}</div><h3>Partner finden</h3><p>Wir vernetzen dich direkt mit passenden Betrieben aus unserem Netzwerk – für Praktikum oder Ausbildung.</p><span class="how-step-time">70+ Partner</span></div>
      </div>
    </div>
  </section>

  <!-- SPLIT -->
  <section class="bg-white">
    <div class="container">
      <div class="split">
        <div class="split-media split-locs">
          <div class="loc-img-pair">
            <div class="loc-img">
              <img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal – Hochstraße 65 (Innenansicht)" loading="lazy">
              <span class="loc-label"><b>Wuppertal</b><small>Hochstraße 65</small></span>
            </div>
            <div class="loc-img">
              <img src="/assets/img/standort-essen.png" alt="BildungsBar Essen – Kopstadtplatz 12 (Innenansicht)" loading="lazy">
              <span class="loc-label"><b>Essen</b><small>Kopstadtplatz 12</small></span>
            </div>
            <div class="loc-img">
              <img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen – Grünewalder Straße 29-31 (im Gründerzentrum)" loading="lazy">
              <span class="loc-label"><b>Solingen</b><small>Grünewalder Straße 29-31</small></span>
            </div>
            <div class="loc-img">
              <img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid – Hindenburgstraße 10a (in der Gründerschmiede)" loading="lazy">
              <span class="loc-label"><b>Remscheid</b><small>Hindenburgstraße 10a</small></span>
            </div>
          </div>
        </div>
        <div class="split-text reveal">
          <span class="section-label">Für Schüler:innen &amp; junge Menschen</span>
          <h2>Wir zeigen was möglich ist</h2>
          <p>Über 150 Ausbildungsberufe und duale Studiengänge – von Gesundheit über Handwerk bis IT. Wir helfen dir, im Dschungel der Möglichkeiten den richtigen Weg zu finden.</p>
          <ul class="list-check">
            <li>Persönlichkeitscheck: Welches Berufsfeld passt zu mir?</li>
            <li>Bewerbungstraining: Fit für die Jobsuche</li>
            <li>Direkte Kontakte zu regionalen Unternehmen</li>
            <li>Komplett kostenfrei – ohne Hintergedanken</li>
          </ul>
          <a class="btn btn-navy mt-2" href="/berufswelt">Berufe entdecken →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ZIELGRUPPEN -->
  <section class="bg-light">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Drei Zielgruppen, ein Ziel</span>
        <h2>Gemeinsam für die Ausbildung</h2>
      </div>
      <div class="card-grid cols-3">
        <div class="card reveal"><div class="icon icon-svg">${IC.cap}</div><h3>Schüler:innen</h3><p>Kostenfreie Orientierung, Bewerbungshilfe und der direkte Draht zu Ausbildungsbetrieben.</p><a class="badge link" href="/berufswelt">Mehr erfahren →</a></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.building}</div><h3>Schulen</h3><p>Workshops und Berufsorientierung, die kAoA-Kriterien erfüllen – jugendgerecht &amp; gamifiziert.</p><a class="badge link" href="/fuer-schulen">Für Schulen →</a></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.briefcase}</div><h3>Unternehmen</h3><p>Werdet sichtbar bei motivierten Talenten und gestaltet die Ausbildung von morgen mit.</p><a class="badge link" href="/kooperation">Kooperieren →</a></div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-white">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Fragen &amp; Antworten</span>
        <h2>Häufig gestellte Fragen</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question"><span>Was kostet die Beratung?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Beratung in der BildungsBar ist für Schüler:innen und junge Menschen komplett kostenfrei.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wann und wo habt ihr geöffnet?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir sind von 17 bis 19 Uhr für dich da: dienstags und donnerstags in Wuppertal (Hochstraße 65) und Essen (Kopstadtplatz 12), montags in Solingen (Grünewalder Straße 29-31, im Gründerzentrum) und mittwochs in Remscheid (Hindenburgstraße 10a, in der Gründerschmiede). Termine in Solingen und Remscheid sind ab September buchbar.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Muss ich einen Termin buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten buchst du online einen Termin – so können wir uns optimal Zeit für dich nehmen.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Für wen ist das Angebot gedacht?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Für alle jungen Menschen, die sich beruflich orientieren möchten – egal ob noch in der Schule, kurz vor dem Abschluss oder auf der Suche nach einer Ausbildung.</div></div></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section on-white">
    <div class="container">
      <div class="cta-inner">
        <span class="section-label" style="display:flex;justify-content:center;">Jetzt starten</span>
        <h2>Bereit, deinen <em>Partner</em> zu entdecken?</h2>
        <p>Buch dir einen kostenfreien Termin in der BildungsBar in Wuppertal, Essen, Solingen oder Remscheid – wir freuen uns auf dich!</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/terminbuchung">Termin buchen</a>
          <a class="btn btn-ghost" href="/kontakt">Kontakt aufnehmen</a>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
