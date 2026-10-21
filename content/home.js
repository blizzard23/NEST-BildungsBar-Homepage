const IC = {
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
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
            <div class="stat"><strong>4</strong><span>Standorte</span></div>
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

  <!-- KENNZAHLEN (Gold-Band, schließt an die Gold-Kante des Hero an) -->
  <div class="home-stats">
    <div class="container">
      <div class="home-stats-grid">
        <div class="home-stat"><strong>500+</strong><span>Gäste pro Jahr in Wuppertal</span></div>
        <div class="home-stat"><strong>70+</strong><span>Unternehmenskontakte im Netzwerk</span></div>
        <div class="home-stat"><strong>150+</strong><span>Ausbildungsberufe in der Beratung</span></div>
        <div class="home-stat"><strong>4</strong><span>Standorte von Essen bis Remscheid</span></div>
      </div>
    </div>
  </div>

  <!-- ANGEBOT (Bento-Raster) -->
  <section class="home-offer bg-white">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">Entdecke deinen Partner</span>
          <h2>Deine Berufsorientierung auf Augenhöhe</h2>
        </div>
        <p>In der BildungsBar bekommst du kostenfreie Unterstützung rund um Ausbildung und Karriereplanung. Wir nehmen uns Zeit für dich – ganz ohne Druck.</p>
      </div>
      <div class="bento">
        <div class="bento-tile bento-main reveal">
          <span class="bento-bignum" aria-hidden="true">150+</span>
          <span class="bento-kicker">Für Schüler:innen &amp; junge Menschen</span>
          <h3>Wir zeigen, was möglich ist</h3>
          <p>Über 150 Ausbildungsberufe und duale Studiengänge – von Gesundheit über Handwerk bis IT. Wir helfen dir, im Dschungel der Möglichkeiten den richtigen Weg zu finden.</p>
          <ul class="bento-chips" aria-label="Berufsfelder">
            <li><a href="/berufswelt?feld=Gesundheitswesen">Gesundheit</a></li>
            <li><a href="/berufswelt?feld=Handwerk">Handwerk</a></li>
            <li><a href="/berufswelt?feld=Technische%20Berufe">Technik &amp; IT</a></li>
            <li><a href="/berufswelt?feld=Sozialer%20Bereich">Soziales</a></li>
            <li><a href="/berufswelt?feld=Verkauf%20und%20Vertrieb">Verkauf</a></li>
            <li><a href="/berufswelt?feld=Wirtschaft%20%26%20Verwaltung">Wirtschaft &amp; Verwaltung</a></li>
          </ul>
          <a class="btn btn-primary" href="/berufswelt">Berufe entdecken →</a>
        </div>
        <div class="bento-tile bento-a reveal">
          <div class="bento-ic">${IC.compass}</div>
          <h3>Stärken finden</h3>
          <p>Im Persönlichkeitscheck finden wir gemeinsam deine Stärken und Motive heraus – und welche Berufsfelder wirklich zu dir passen.</p>
        </div>
        <div class="bento-tile bento-b reveal">
          <div class="bento-ic">${IC.file}</div>
          <h3>Bewerbung meistern</h3>
          <p>Vom Anschreiben bis zum Lebenslauf: Wir helfen dir, überzeugende Bewerbungsunterlagen zu erstellen.</p>
        </div>
        <div class="bento-tile bento-c reveal">
          <div class="bento-ic">${IC.people}</div>
          <h3>Vorstellungsgespräch üben</h3>
          <p>In simulierten Gesprächen üben wir den Ernstfall – für mehr Sicherheit und Selbstvertrauen.</p>
        </div>
        <div class="bento-tile bento-free reveal">
          <div class="bento-free-text">
            <span class="bento-kicker">Direkter Draht zu Betrieben</span>
            <h3>Komplett kostenfrei – ohne Hintergedanken.</h3>
            <p>Wir bringen dich mit regionalen Unternehmen aus unserem Netzwerk zusammen – für Praktikum oder Ausbildung.</p>
          </div>
          <div class="bento-free-price" aria-hidden="true"><strong>0 €</strong><span>für dich</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABLAUF -->
  <section class="home-steps bg-light">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">Schritt für Schritt</span>
          <h2>In drei Schritten zu deiner Ausbildung</h2>
        </div>
        <div class="home-head-side">
          <p>Von der Terminbuchung bis zum passenden Betrieb – so einfach läuft deine Beratung in der BildungsBar.</p>
          <a class="btn btn-navy" href="/terminbuchung">Termin buchen →</a>
        </div>
      </div>
      <ol class="steps-track">
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">01</span><span class="step-ic">${IC.calendar}</span></div>
          <h3>Termin buchen</h3>
          <p>Such dir online einen Termin in Wuppertal, Essen, Solingen oder Remscheid aus – kostenfrei und unverbindlich.</p>
          <span class="step-meta">Mo–Do · 17–19 Uhr</span>
        </li>
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">02</span><span class="step-ic">${IC.chat}</span></div>
          <h3>Vor Ort beraten</h3>
          <p>In lockerer Atmosphäre sprechen wir über Berufe, Bewerbung und passende Unternehmen.</p>
          <span class="step-meta">Persönlich &amp; ehrlich</span>
        </li>
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">03</span><span class="step-ic">${IC.network}</span></div>
          <h3>Partner finden</h3>
          <p>Wir vernetzen dich direkt mit passenden Betrieben aus unserem Netzwerk – für Praktikum oder Ausbildung.</p>
          <span class="step-meta">70+ Partner</span>
        </li>
      </ol>
    </div>
  </section>

  <!-- AKTUELLE STELLEN (Jobbörse) – wird per JS aus /api/stellen befüllt.
       Bleibt komplett ausgeblendet, solange keine aktive Stelle online ist. -->
  <section class="bg-white" hidden>
    <div class="container">
      <div id="stellen-section"></div>
    </div>
  </section>

  <!-- STANDORTE -->
  <section class="home-locs bg-white">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">Unsere Standorte</span>
          <h2>Komm vorbei – in deiner Nähe</h2>
        </div>
        <p>Vier BildungsBars, eine Idee: entspannte Atmosphäre, ehrliche Beratung und Zeit für deine Fragen – jeweils von 17 bis 19 Uhr.</p>
      </div>
      <div class="home-loc-grid">
        <article class="home-loc reveal">
          <div class="home-loc-photo"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal – Hochstraße 65 (Innenansicht)" loading="lazy"></div>
          <div class="home-loc-body">
            <h3>Wuppertal</h3>
            <p>Hochstraße 65</p>
            <div class="home-loc-links">
              <a href="/terminbuchung">Termin buchen →</a>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Hochstra%C3%9Fe%2065%2C%20Wuppertal" target="_blank" rel="noopener">Route</a>
            </div>
          </div>
        </article>
        <article class="home-loc reveal">
          <div class="home-loc-photo"><img src="/assets/img/standort-essen.png" alt="BildungsBar Essen – Kopstadtplatz 12 (Innenansicht)" loading="lazy"></div>
          <div class="home-loc-body">
            <h3>Essen</h3>
            <p>Kopstadtplatz 12</p>
            <div class="home-loc-links">
              <a href="/terminbuchung">Termin buchen →</a>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Kopstadtplatz%2012%2C%20Essen" target="_blank" rel="noopener">Route</a>
            </div>
          </div>
        </article>
        <article class="home-loc reveal">
          <div class="home-loc-photo"><img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen – Grünewalder Straße 29-31 (im Gründerzentrum)" loading="lazy"></div>
          <div class="home-loc-body">
            <h3>Solingen</h3>
            <p>Grünewalder Straße 29-31<small>im Gründerzentrum</small></p>
            <div class="home-loc-links">
              <a href="/terminbuchung">Termin buchen →</a>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Gr%C3%BCnewalder%20Stra%C3%9Fe%2029%2C%20Solingen" target="_blank" rel="noopener">Route</a>
            </div>
          </div>
        </article>
        <article class="home-loc reveal">
          <div class="home-loc-photo"><img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid – Hindenburgstraße 10a (in der Gründerschmiede)" loading="lazy"></div>
          <div class="home-loc-body">
            <h3>Remscheid</h3>
            <p>Hindenburgstraße 10a<small>in der Gründerschmiede</small></p>
            <div class="home-loc-links">
              <a href="/terminbuchung">Termin buchen →</a>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Hindenburgstra%C3%9Fe%2010a%2C%20Remscheid" target="_blank" rel="noopener">Route</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ZIELGRUPPEN -->
  <section class="home-audience bg-light">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">Drei Zielgruppen, ein Ziel</span>
          <h2>Gemeinsam für die Ausbildung</h2>
        </div>
      </div>
      <div class="audience-grid">
        <a class="audience-card audience-card--navy reveal" href="/berufswelt">
          <span class="audience-ic">${IC.cap}</span>
          <div class="audience-body">
            <h3>Schüler:innen</h3>
            <p>Kostenfreie Orientierung, Bewerbungshilfe und der direkte Draht zu Ausbildungsbetrieben.</p>
          </div>
          <span class="audience-foot">Mehr erfahren <span class="audience-arrow">${IC.arrow}</span></span>
        </a>
        <a class="audience-card audience-card--gold reveal" href="/fuer-schulen">
          <span class="audience-ic">${IC.building}</span>
          <div class="audience-body">
            <h3>Schulen</h3>
            <p>Workshops und Berufsorientierung, die kAoA-Kriterien erfüllen – jugendgerecht &amp; gamifiziert.</p>
          </div>
          <span class="audience-foot">Für Schulen <span class="audience-arrow">${IC.arrow}</span></span>
        </a>
        <a class="audience-card audience-card--white reveal" href="/kooperation">
          <span class="audience-ic">${IC.briefcase}</span>
          <div class="audience-body">
            <h3>Unternehmen</h3>
            <p>Werdet sichtbar bei motivierten Talenten und gestaltet die Ausbildung von morgen mit.</p>
          </div>
          <span class="audience-foot">Kooperieren <span class="audience-arrow">${IC.arrow}</span></span>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="home-faq bg-white">
    <div class="container">
      <div class="home-faq-grid">
        <div class="home-faq-side reveal">
          <span class="section-label">Fragen &amp; Antworten</span>
          <h2>Häufig gestellte Fragen</h2>
          <p>Deine Frage ist nicht dabei? Schreib uns einfach – wir melden uns schnell bei dir.</p>
          <a class="btn btn-outline" href="/kontakt">Kontakt aufnehmen</a>
        </div>
        <div class="faq-list">
          <div class="faq-item"><button class="faq-question"><span>Was kostet die Beratung?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Beratung in der BildungsBar ist für Schüler:innen und junge Menschen komplett kostenfrei.</div></div></div>
          <div class="faq-item"><button class="faq-question"><span>Wann und wo habt ihr geöffnet?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir sind von 17 bis 19 Uhr für dich da: dienstags und donnerstags in Wuppertal (Hochstraße 65) und Essen (Kopstadtplatz 12), montags in Solingen (Grünewalder Straße 29-31, im Gründerzentrum) und mittwochs in Remscheid (Hindenburgstraße 10a, in der Gründerschmiede). Termine in Solingen und Remscheid sind ab Oktober buchbar.</div></div></div>
          <div class="faq-item"><button class="faq-question"><span>Muss ich einen Termin buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten buchst du online einen Termin – so können wir uns optimal Zeit für dich nehmen.</div></div></div>
          <div class="faq-item"><button class="faq-question"><span>Für wen ist das Angebot gedacht?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Für alle jungen Menschen, die sich beruflich orientieren möchten – egal ob noch in der Schule, kurz vor dem Abschluss oder auf der Suche nach einer Ausbildung.</div></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="home-cta bg-white">
    <div class="container">
      <div class="home-cta-card reveal">
        <div class="home-cta-text">
          <span class="section-label">Jetzt starten</span>
          <h2>Bereit, deinen <em>Partner</em> zu entdecken?</h2>
          <p>Buch dir einen kostenfreien Termin in der BildungsBar in Wuppertal, Essen, Solingen oder Remscheid – wir freuen uns auf dich!</p>
        </div>
        <div class="home-cta-actions">
          <a class="btn btn-primary" href="/terminbuchung">Termin buchen →</a>
          <a class="btn btn-ghost" href="/kontakt">Kontakt aufnehmen</a>
        </div>
      </div>
    </div>
  </section>

`;
export default html;
