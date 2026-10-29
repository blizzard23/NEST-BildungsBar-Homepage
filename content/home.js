import IC from "./icons";

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

  <!-- KENNZAHLEN · Gold-Band wie im vorherigen Design, schließt an die Gold-Kante des Hero an -->
  <div class="bb-trust">
    <div class="container">
      <div class="bb-trust__row">
        <div class="bb-trust__item"><b>500+</b><span>Gäste pro Jahr in Wuppertal</span></div>
        <div class="bb-trust__item"><b>70+</b><span>Unternehmen im Netzwerk</span></div>
        <div class="bb-trust__item"><b>150+</b><span>Ausbildungsberufe in der Beratung</span></div>
        <div class="bb-trust__item"><b>4</b><span>Standorte von Essen bis Remscheid</span></div>
      </div>
    </div>
  </div>

  <!-- ANGEBOT · Bento-Raster (Windsurf, FLORA) mit großer Navy-Kachel -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--split">
        <h2 class="bb-h2">Deine Berufsorientierung auf Augenhöhe</h2>
        <p class="bb-lead">In der BildungsBar bekommst du kostenfreie Unterstützung rund um Ausbildung und Karriereplanung. Wir nehmen uns Zeit für dich – ganz ohne Druck.</p>
      </div>
      <div class="bb-bento">
        <div class="bb-bento__tile bb-bento__main bb-dark">
          <span class="bb-bento__num" aria-hidden="true">150+</span>
          <span class="bb-kicker">Für Schüler:innen und junge Menschen</span>
          <h3>Wir zeigen dir, was möglich ist</h3>
          <p>Über 150 Ausbildungsberufe und duale Studiengänge – von Gesundheit über Handwerk bis IT. Wir helfen dir, im Dschungel der Möglichkeiten den richtigen Weg zu finden.</p>
          <ul class="bb-chips" aria-label="Berufsfelder">
            <li><a href="/berufswelt?feld=Gesundheitswesen">Gesundheit</a></li>
            <li><a href="/berufswelt?feld=Handwerk">Handwerk</a></li>
            <li><a href="/berufswelt?feld=Technische%20Berufe">Technik &amp; IT</a></li>
            <li><a href="/berufswelt?feld=Sozialer%20Bereich">Soziales</a></li>
            <li><a href="/berufswelt?feld=Verkauf%20und%20Vertrieb">Verkauf</a></li>
            <li><a href="/berufswelt?feld=Wirtschaft%20%26%20Verwaltung">Wirtschaft &amp; Verwaltung</a></li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/berufswelt">Berufe entdecken</a></div>
        </div>
        <div class="bb-bento__tile bb-bento__a">
          <span class="bb-ilist__ic">${IC.compass}</span>
          <h3>Stärken finden</h3>
          <p>Im Persönlichkeitscheck finden wir gemeinsam deine Stärken und Motive heraus – und welche Berufsfelder wirklich zu dir passen.</p>
        </div>
        <div class="bb-bento__tile bb-bento__b">
          <span class="bb-ilist__ic">${IC.file}</span>
          <h3>Bewerbung meistern</h3>
          <p>Vom Anschreiben bis zum Lebenslauf: Wir helfen dir, überzeugende Bewerbungsunterlagen zu erstellen.</p>
        </div>
        <div class="bb-bento__tile bb-bento__c">
          <span class="bb-ilist__ic">${IC.people}</span>
          <h3>Vorstellungsgespräch üben</h3>
          <p>In simulierten Gesprächen üben wir den Ernstfall – für mehr Sicherheit und Selbstvertrauen.</p>
        </div>
        <div class="bb-bento__tile bb-bento__free">
          <div>
            <h3>Komplett kostenfrei – ohne Hintergedanken.</h3>
            <p>Wir bringen dich mit regionalen Unternehmen aus unserem Netzwerk zusammen – für Praktikum oder Ausbildung.</p>
          </div>
          <div class="bb-bento__price" aria-hidden="true"><b>0 €</b><span>für dich</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- BERUFSFELDER · dunkle Sektion mit Kacheln -->
  <section class="bb-sec bb-sec--dark">
    <div class="container">
      <div class="bb-head bb-head--row">
        <div>
          <h2 class="bb-h2">Was kannst du bei uns <span class="bb-hl">entdecken?</span></h2>
          <p class="bb-lead" style="margin-top:18px;max-width:620px;">Über 150 Ausbildungsberufe und duale Studiengänge in sechs Berufsfeldern. Wähle ein Feld und entdecke alle Berufe dazu.</p>
        </div>
        <a class="bb-btn bb-btn--light" href="/berufswelt">Zur Berufswelt</a>
      </div>
      <!-- Berufsfelder als Kacheln (Vorlage: Webflow „Browse lesson topics") -->
      <div class="bb-fields">
        <a class="bb-field bb-field--coral" href="/berufswelt?feld=Gesundheitswesen">
          <span class="bb-field__orb">${IC.heart}</span>
          <span class="bb-field__name">Gesundheit</span>
          <span class="bb-field__count">15 Berufe</span>
        </a>
        <a class="bb-field bb-field--gold" href="/berufswelt?feld=Handwerk">
          <span class="bb-field__orb">${IC.tool}</span>
          <span class="bb-field__name">Handwerk</span>
          <span class="bb-field__count">32 Berufe</span>
        </a>
        <a class="bb-field bb-field--pink" href="/berufswelt?feld=Sozialer%20Bereich">
          <span class="bb-field__orb">${IC.people}</span>
          <span class="bb-field__name">Soziales</span>
          <span class="bb-field__count">8 Berufe</span>
        </a>
        <a class="bb-field bb-field--blue" href="/berufswelt?feld=Technische%20Berufe">
          <span class="bb-field__orb">${IC.monitor}</span>
          <span class="bb-field__name">Technik &amp; IT</span>
          <span class="bb-field__count">54 Berufe</span>
        </a>
        <a class="bb-field bb-field--green" href="/berufswelt?feld=Verkauf%20und%20Vertrieb">
          <span class="bb-field__orb">${IC.bag}</span>
          <span class="bb-field__name">Verkauf &amp; Vertrieb</span>
          <span class="bb-field__count">12 Berufe</span>
        </a>
        <a class="bb-field bb-field--violet" href="/berufswelt?feld=Wirtschaft%20%26%20Verwaltung">
          <span class="bb-field__orb">${IC.briefcase}</span>
          <span class="bb-field__name">Wirtschaft &amp; Verwaltung</span>
          <span class="bb-field__count">33 Berufe</span>
        </a>
      </div>
      </div>
  </section>

  <!-- ABLAUF · Reiter mit Bild -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--split">
        <h2 class="bb-h2">In drei Schritten zu deiner Ausbildung</h2>
        <p class="bb-lead">Von der Terminbuchung bis zum passenden Betrieb – so einfach läuft deine Beratung in der BildungsBar.</p>
      </div>
      <div class="bb-tabs">
        <div class="bb-frame bb-window bb-frame--43">
          <div class="bb-window__bar"><i></i><i></i><i></i><span>BildungsBar Wuppertal</span></div>
          <div class="bb-window__body"><img src="/assets/img/standort-wuppertal.jpg" alt="Beratungsraum der BildungsBar in Wuppertal" loading="lazy"></div>
        </div>
        <div class="bb-tabs__list">
          <details class="bb-tab" name="ablauf" open>
            <summary><small>01</small>Termin buchen</summary>
            <div class="bb-tab__body"><p>Such dir online einen Termin in Wuppertal, Essen, Solingen oder Remscheid aus – kostenfrei und unverbindlich.</p><span class="bb-badge bb-badge--soft">Mo–Do · 17–19 Uhr</span></div>
          </details>
          <details class="bb-tab" name="ablauf">
            <summary><small>02</small>Vor Ort beraten</summary>
            <div class="bb-tab__body"><p>In lockerer Atmosphäre sprechen wir über Berufe, Bewerbung und passende Unternehmen.</p><span class="bb-badge bb-badge--soft">Persönlich &amp; ehrlich</span></div>
          </details>
          <details class="bb-tab" name="ablauf">
            <summary><small>03</small>Partner finden</summary>
            <div class="bb-tab__body"><p>Wir vernetzen dich direkt mit passenden Betrieben aus unserem Netzwerk – für Praktikum oder Ausbildung.</p><span class="bb-badge bb-badge--soft">70+ Partner</span></div>
          </details>
          <div class="bb-actions"><a class="bb-btn bb-btn--ink" href="/terminbuchung">Termin buchen</a></div>
        </div>
      </div>
    </div>
  </section>

  <!-- AKTUELLE STELLEN (Jobbörse) – wird per JS aus /api/stellen befüllt.
       Bleibt komplett ausgeblendet, solange keine aktive Stelle online ist. -->
  <section class="bb-sec bb-sec--band" hidden>
    <div class="container">
      <div id="stellen-section"></div>
    </div>
  </section>

  <!-- STANDORTE · dunkle Sektion mit Bildkarten (Runway) -->
  <section class="bb-sec bb-sec--dark">
    <div class="container">
      <div class="bb-head bb-head--split">
        <h2 class="bb-h2">Komm vorbei – in <span class="bb-hl">deiner Nähe</span></h2>
        <p class="bb-lead">Vier BildungsBars, eine Idee: entspannte Atmosphäre, ehrliche Beratung und Zeit für deine Fragen.</p>
      </div>
      <div class="bb-cards">
        <div class="bb-card">
          <span class="bb-card__tile"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal (Innenansicht)" loading="lazy"></span>
          <span class="bb-card__title">Wuppertal</span>
          <span class="bb-card__meta">Hochstraße 65<br>Di &amp; Do · 17–19 Uhr</span>
          <span class="bb-card__links"><a class="bb-link" href="/terminbuchung">Termin buchen</a><a class="bb-link" href="https://www.google.com/maps/search/?api=1&amp;query=Hochstra%C3%9Fe%2065%2C%20Wuppertal" target="_blank" rel="noopener">Route</a></span>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile"><img src="/assets/img/standort-essen.png" alt="BildungsBar Essen (Innenansicht)" loading="lazy"></span>
          <span class="bb-card__title">Essen</span>
          <span class="bb-card__meta">Kopstadtplatz 12<br>Mo · 17–19 Uhr</span>
          <span class="bb-card__links"><a class="bb-link" href="/terminbuchung">Termin buchen</a><a class="bb-link" href="https://www.google.com/maps/search/?api=1&amp;query=Kopstadtplatz%2012%2C%20Essen" target="_blank" rel="noopener">Route</a></span>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile"><img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen im Gründerzentrum" loading="lazy"></span>
          <span class="bb-card__title">Solingen</span>
          <span class="bb-card__meta">Grünewalder Straße 29-31 · im Gründerzentrum<br>Mo · 17–19 Uhr</span>
          <span class="bb-card__links"><a class="bb-link" href="/terminbuchung">Termin buchen</a><a class="bb-link" href="https://www.google.com/maps/search/?api=1&amp;query=Gr%C3%BCnewalder%20Stra%C3%9Fe%2029%2C%20Solingen" target="_blank" rel="noopener">Route</a></span>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile"><img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid in der Gründerschmiede" loading="lazy"></span>
          <span class="bb-card__title">Remscheid</span>
          <span class="bb-card__meta">Hindenburgstraße 10a · in der Gründerschmiede<br>Mi · 17–19 Uhr</span>
          <span class="bb-card__links"><a class="bb-link" href="/terminbuchung">Termin buchen</a><a class="bb-link" href="https://www.google.com/maps/search/?api=1&amp;query=Hindenburgstra%C3%9Fe%2010a%2C%20Remscheid" target="_blank" rel="noopener">Route</a></span>
        </div>
      </div>
    </div>
  </section>

  <!-- ZIELGRUPPEN · Kacheln in Navy, Gold und Hell (vorheriges Design, Maze) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Gemeinsam für die Ausbildung</h2>
      </div>
      <div class="bb-aud">
        <a class="bb-aud__card bb-aud__card--navy" href="/berufswelt">
          <span class="bb-aud__ic">${IC.cap}</span>
          <h3>Schüler:innen</h3>
          <p>Kostenfreie Orientierung, Bewerbungshilfe und der direkte Draht zu Ausbildungsbetrieben.</p>
          <span class="bb-aud__go">Mehr erfahren ${IC.arrow}</span>
        </a>
        <a class="bb-aud__card bb-aud__card--gold" href="/fuer-schulen">
          <span class="bb-aud__ic">${IC.building}</span>
          <h3>Schulen</h3>
          <p>Workshops und Berufsorientierung, die kAoA-Kriterien erfüllen – jugendgerecht und gamifiziert.</p>
          <span class="bb-aud__go">Für Schulen ${IC.arrow}</span>
        </a>
        <a class="bb-aud__card bb-aud__card--light" href="/kooperation">
          <span class="bb-aud__ic">${IC.briefcase}</span>
          <h3>Unternehmen</h3>
          <p>Als NEST-Partner findet ihr passende Azubis und haltet sie im Betrieb. Wir nehmen euch die Arbeit dabei ab.</p>
          <span class="bb-aud__go">NEST-Partner werden ${IC.arrow}</span>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ · Dovetail (Titel links, Fragen rechts) -->
  <section class="bb-sec bb-sec--band bb-faq">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Häufig gestellte Fragen</h2>
        <p class="bb-lead">Deine Frage ist nicht dabei? Schreib uns einfach – wir melden uns schnell bei dir.</p>
        <div class="bb-actions"><a class="bb-btn bb-btn--light" href="/kontakt">Kontakt aufnehmen</a></div>
      </div>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question"><span>Was kostet die Beratung?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Beratung in der BildungsBar ist für Schüler:innen und junge Menschen komplett kostenfrei.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wann und wo habt ihr geöffnet?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir sind von 17 bis 19 Uhr für dich da: dienstags und donnerstags in Wuppertal (Hochstraße 65), montags in Essen (Kopstadtplatz 12) und Solingen (Grünewalder Straße 29-31, im Gründerzentrum) und mittwochs in Remscheid (Hindenburgstraße 10a, in der Gründerschmiede).</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Muss ich einen Termin buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten buchst du online einen Termin – so können wir uns optimal Zeit für dich nehmen.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Für wen ist das Angebot gedacht?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Für alle jungen Menschen, die sich beruflich orientieren möchten – egal ob noch in der Schule, kurz vor dem Abschluss oder auf der Suche nach einer Ausbildung.</div></div></div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Navy-Karte mit Gold-Kante (vorheriges Design, Stripe) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Bereit, deinen <span class="bb-hl">Partner</span> zu entdecken?</h2>
          <p class="bb-lead">Buch dir einen kostenfreien Termin in der BildungsBar in Wuppertal, Essen, Solingen oder Remscheid – wir freuen uns auf dich!</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/terminbuchung">Termin buchen</a><a class="bb-btn bb-btn--light" href="/kontakt">Kontakt aufnehmen</a></div>
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
