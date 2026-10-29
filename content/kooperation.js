// Partnerseite für Unternehmen: zwei Kernpunkte (Azubis finden / Azubis halten),
// Kreislauf der Angebote, Umsetzung in vier Schritten, Pakete und FAQ.
// NEST Explore und NEST AzubiConnect sind exklusiv für Partner und werden
// zusätzlich zum Partnerbeitrag gebucht.

const TAG_INKL = `<span class="np-tag np-tag--inkl">im Beitrag</span>`;
const TAG_ZU = `<span class="np-tag np-tag--zu">zubuchbar</span>`;

const html = `

  <!-- HERO -->
  <section class="hero np-hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Für Unternehmen · NEST-Partner</span>
        <h1>Ihr bildet aus.<br /><em>Wir kümmern uns um den Rest.</em></h1>
        <p class="lead">Als NEST-Partner findet ihr passende Azubis und haltet sie im Betrieb. Wir nehmen euch die Arbeit dabei ab: von der Schule über die Bewerbung bis in eure Ausbildung.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/kontakt#termin">Gespräch vereinbaren →</a>
          <a class="btn btn-ghost" href="#kreislauf">So greift alles ineinander</a>
        </div>
      </div>
      <div class="hero-visual np-glance" aria-label="Die NEST-Partnerschaft auf einen Blick">
        <div class="np-glance-title">Die Partnerschaft auf einen Blick</div>
        <a class="np-glance-item np-glance-item--finden" href="#kreislauf">
          <span class="np-glance-n">1</span>
          <span><b>Azubis finden</b><small>NEST Explore · NESTplay · Stellenseite · Vermittlung</small></span>
        </a>
        <a class="np-glance-item np-glance-item--halten" href="#kreislauf">
          <span class="np-glance-n">2</span>
          <span><b>Azubis halten</b><small>Workshops · Ausbildungsdialog · Netzwerk · Partner-Login</small></span>
        </a>
        <div class="np-glance-price"><span>ab</span> 79,90 €<small> / Monat</small></div>
        <div class="np-glance-note">NEST Explore und NEST AzubiConnect sind <b>exklusiv für Partner</b> und zubuchbar.</div>
      </div>
    </div></div>
  </section>

  <!-- KREISLAUF: ZWEI KERNPUNKTE, VIER STATIONEN -->
  <section class="bg-light" id="kreislauf">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Zwei Kernpunkte, ein Kreislauf</span>
        <h2>Vom Klassenzimmer bis in eure Ausbildung</h2>
        <p>An den Schulen lernen euch Schüler:innen kennen, in der BildungsBar wird daraus eine passende Bewerbung, und in eurer Ausbildung sorgen wir mit euch dafür, dass die Azubis bleiben. Ihr steht im Zentrum, wir kümmern uns um die Wege dazwischen.</p>
      </div>

      <div class="np-cycle">
        <div class="np-ring-wrap reveal">
          <svg class="np-ring" viewBox="0 0 400 400" role="img" aria-labelledby="npRingTitle npRingDesc">
            <title id="npRingTitle">Kreislauf der NEST-Partnerschaft</title>
            <desc id="npRingDesc">Rechte Hälfte: Azubis finden mit 1 an Schulen und 2 in der BildungsBar. Linke Hälfte: Azubis halten mit 3 in eurer Ausbildung und 4 im Netzwerk. In der Mitte euer Betrieb.</desc>
            <defs>
              <path id="npArcFinden" d="M 200 50 A 150 150 0 0 1 200 350" />
              <path id="npArcHalten" d="M 200 350 A 150 150 0 0 1 200 50" />
            </defs>
            <circle class="np-ring-net" cx="200" cy="200" r="188" />
            <path class="np-arc np-arc--finden" d="M 200 50 A 150 150 0 0 1 200 350" />
            <path class="np-arc np-arc--halten" d="M 200 350 A 150 150 0 0 1 200 50" />
            <text class="np-arc-label np-arc-label--finden"><textPath href="#npArcFinden" startOffset="50%" text-anchor="middle">AZUBIS FINDEN</textPath></text>
            <text class="np-arc-label np-arc-label--halten"><textPath href="#npArcHalten" startOffset="50%" text-anchor="middle">AZUBIS HALTEN</textPath></text>
            <path class="np-arrow" d="M 193 39 L 209 50 L 193 61 Z" />
            <path class="np-arrow" d="M 207 339 L 191 350 L 207 361 Z" />
            <g class="np-node np-node--finden"><circle cx="306" cy="94" r="19" /><text x="306" y="94">1</text></g>
            <g class="np-node np-node--finden"><circle cx="306" cy="306" r="19" /><text x="306" y="306">2</text></g>
            <g class="np-node np-node--halten"><circle cx="94" cy="306" r="19" /><text x="94" y="306">3</text></g>
            <g class="np-node np-node--halten"><circle cx="94" cy="94" r="19" /><text x="94" y="94">4</text></g>
            <circle class="np-core" cx="200" cy="200" r="104" />
            <text class="np-core-kicker" x="200" y="164">NEST-PARTNER</text>
            <text class="np-core-title" x="200" y="200">Euer Betrieb</text>
            <text class="np-core-sub" x="200" y="232">Ihr bildet aus,</text>
            <text class="np-core-sub" x="200" y="252">wir kümmern uns um den Rest.</text>
          </svg>
          <div class="np-legend"><span>${TAG_INKL} im Partnerbeitrag enthalten</span><span>${TAG_ZU} exklusiv für Partner zubuchbar</span></div>
        </div>

        <!-- 1 · An Schulen -->
        <article class="np-station np-station--finden np-station--1 reveal">
          <div class="np-station-head"><span class="np-station-n">1</span><span class="np-station-kicker">Azubis finden · An Schulen</span></div>
          <h3>Schüler:innen lernen euch kennen</h3>
          <ul class="np-offers">
            <li><div><b>NEST Explore</b> ${TAG_ZU}</div><span>Ihr trefft mit fünf weiteren Betrieben eine Schule. Schule, Ablauf, App und Moderation übernehmen wir.</span></li>
            <li><div><b>NESTplay</b> ${TAG_INKL}</div><span>Euer Quiz läuft im Unterricht, auch wenn ihr nicht dabei seid.</span></li>
          </ul>
          <div class="np-station-links"><a href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de →</a><a href="https://nest-play.de" target="_blank" rel="noopener">nest-play.de →</a></div>
        </article>

        <!-- 2 · In der BildungsBar -->
        <article class="np-station np-station--finden np-station--2 reveal">
          <div class="np-station-head"><span class="np-station-n">2</span><span class="np-station-kicker">Azubis finden · In der BildungsBar</span></div>
          <h3>Aus Interesse wird eine Bewerbung</h3>
          <ul class="np-offers">
            <li><div><b>Beratung &amp; Vermittlung</b> ${TAG_INKL}</div><span>Wir bereiten Bewerbende vor, führen erste Gespräche und leiten passende Bewerbungen an euch weiter. Nach einer Absage vermitteln wir an andere Partner.</span></li>
            <li><div><b>Stellenseite</b> ${TAG_INKL}</div><span>Euer Profil und eure Ausbildungsplätze in der NEST Berufswelt zwischen über 150 Berufen.</span></li>
          </ul>
          <div class="np-station-links"><a href="/berufswelt">Zur Berufswelt →</a></div>
        </article>

        <!-- 3 · In eurer Ausbildung -->
        <article class="np-station np-station--halten np-station--3 reveal">
          <div class="np-station-head"><span class="np-station-n">3</span><span class="np-station-kicker">Azubis halten · In eurer Ausbildung</span></div>
          <h3>Eure Azubis bleiben</h3>
          <ul class="np-offers">
            <li><div><b>Workshops für Azubis</b> ${TAG_ZU}</div><span>NEST AzubiConnect, zum Beispiel Resilienz, Lernmotivation, Kommunikation oder „Halbzeit im ersten Ausbildungsjahr“.</span></li>
            <li><div><b>Workshops für Ausbildende</b> ${TAG_ZU}</div><span>Die Generation Z verstehen, Azubis binden, Warnsignale früh erkennen.</span></li>
          </ul>
          <div class="np-station-links"><a href="https://nest-azubiconnect.de" target="_blank" rel="noopener">nest-azubiconnect.de →</a></div>
        </article>

        <!-- 4 · Im Netzwerk -->
        <article class="np-station np-station--halten np-station--4 reveal">
          <div class="np-station-head"><span class="np-station-n">4</span><span class="np-station-kicker">Azubis halten · Im Netzwerk</span></div>
          <h3>Ihr seid nicht allein</h3>
          <ul class="np-offers">
            <li><div><b>Ausbildungsdialog</b> ${TAG_INKL}</div><span>Unsere Veranstaltungsreihe zu fachlichen Themen rund um Ausbildung, mit Input von Expert:innen und Austausch der Betriebe.</span></li>
            <li><div><b>Netzwerktreffen</b> ${TAG_INKL}</div><span>Viermal im Jahr mit über 70 Ausbildungsbetrieben, jeweils zu Gast bei einem Partner.</span></li>
            <li><div><b>Partner-Login</b> ${TAG_INKL}</div><span>Ansprechpartner für die verschiedensten Bereiche und ein Chatbot mit den Erfahrungen aus unserem Netzwerk.</span></li>
          </ul>
          <div class="np-station-links"><a href="/veranstaltungen">Nächste Veranstaltungen →</a><a href="/partner-portal">Partner-Login →</a></div>
        </article>
      </div>
    </div>
  </section>

  <!-- DIE DREI ANGEBOTE -->
  <section class="bg-white" id="angebote">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Drei Angebote, ein Partner</span>
        <h2>Alles aus einer Hand</h2>
        <p>Jedes Angebot hat seine eigene Website. Gebucht wird alles über eure Partnerschaft.</p>
      </div>
      <div class="np-brands">
        <a class="np-brand reveal" href="https://nest-explore.de" target="_blank" rel="noopener">
          <span class="np-brand-flag np-brand-flag--zu">Exklusiv für Partner · zubuchbar</span>
          <span class="np-brand-name">NEST Explore</span>
          <span class="np-brand-text">Ausbildung live an der Schule: sechs Betriebe, bis zu 150 Schüler:innen, komplett von uns organisiert.</span>
          <span class="np-brand-gift">🎁 Willkommensgutschein: Für neue Partner ist der erste Termin kostenfrei.</span>
          <span class="np-brand-price">290 € <small>pro Termin, zzgl. MwSt.</small></span>
          <span class="np-brand-link">Termine ansehen →</span>
        </a>
        <a class="np-brand reveal" href="https://nest-azubiconnect.de" target="_blank" rel="noopener">
          <span class="np-brand-flag np-brand-flag--zu">Exklusiv für Partner · zubuchbar</span>
          <span class="np-brand-name">NEST AzubiConnect</span>
          <span class="np-brand-text">Praxisnahe Workshops für Azubis und Ausbildende, inhouse, in der BildungsBar oder als offener Workshop.</span>
          <span class="np-brand-price">ab 990 € <small>pro Workshop-Tag, offene Workshops ab 176 € pro Person, zzgl. MwSt.</small></span>
          <span class="np-brand-link">Workshops ansehen →</span>
        </a>
        <a class="np-brand reveal" href="https://nest-play.de" target="_blank" rel="noopener">
          <span class="np-brand-flag np-brand-flag--inkl">Im Partnerbeitrag enthalten</span>
          <span class="np-brand-name">NESTplay</span>
          <span class="np-brand-text">Euer Betrieb als Live-Quiz im Unterricht: einmal erstellen, Lehrkräfte setzen es immer wieder ein.</span>
          <span class="np-brand-price">inklusive</span>
          <span class="np-brand-link">NESTplay ansehen →</span>
        </a>
      </div>
    </div>
  </section>

  <!-- UMSETZUNG -->
  <section class="bg-light" id="umsetzung">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">So setzt ihr es um</span>
        <h2>In vier Schritten zur Partnerschaft</h2>
        <p>Euer Aufwand bleibt klein, den Rest übernehmen wir.</p>
      </div>
      <div class="np-steps">
        <div class="np-step reveal">
          <div class="np-step-n">1</div>
          <h3>Kennenlernen</h3>
          <p><b>Ihr:</b> ein Gespräch von rund 30 Minuten.</p>
          <p><b>Wir:</b> zeigen euch, welches Paket zu eurem Betrieb passt.</p>
        </div>
        <div class="np-step reveal">
          <div class="np-step-n">2</div>
          <h3>Partner werden</h3>
          <p><b>Ihr:</b> wählt das Paket nach der Zahl eurer Azubis.</p>
          <p><b>Wir:</b> schalten euren Partner-Login frei.</p>
        </div>
        <div class="np-step reveal">
          <div class="np-step-n">3</div>
          <h3>Sichtbar werden</h3>
          <p><b>Ihr:</b> legt Profil, Stellen und euer Quiz an, in rund 20 Minuten.</p>
          <p><b>Wir:</b> helfen euch dabei und bringen NESTplay in die Schulen.</p>
        </div>
        <div class="np-step reveal">
          <div class="np-step-n">4</div>
          <h3>Ersten Explore-Termin einlösen</h3>
          <p><b>Ihr:</b> wählt einen Termin und kreuzt den Willkommensgutschein an.</p>
          <p><b>Wir:</b> organisieren alles an der Schule und leiten Bewerbende weiter.</p>
        </div>
      </div>
      <p class="np-steps-note reveal">Weitere Explore-Termine und Workshops von NEST AzubiConnect bucht ihr als Partner bei Bedarf dazu.</p>
    </div>
  </section>

  <!-- PAKETE -->
  <section class="bg-white" id="preise">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Partnerpakete</span>
        <h2>Ein Paket für jede Betriebsgröße</h2>
        <p>Transparente monatliche Preise, passend zur Anzahl eurer Auszubildenden. Alle Pakete enthalten dieselben Leistungen.</p>
      </div>
      <div class="price-grid">
        <div class="price-card reveal">
          <div class="tier">Kleine Partnerschaft</div>
          <div class="amount">79,90 €<span> / Monat</span></div>
          <div class="who">bis 5 Auszubildende</div>
          <a class="btn btn-outline mt-2" href="/kontakt#termin">Anfragen</a>
        </div>
        <div class="price-card reveal">
          <div class="tier">Mittlere Partnerschaft</div>
          <div class="amount">139,90 €<span> / Monat</span></div>
          <div class="who">bis 10 Auszubildende</div>
          <a class="btn btn-outline mt-2" href="/kontakt#termin">Anfragen</a>
        </div>
        <div class="price-card reveal">
          <div class="tier">Große Partnerschaft</div>
          <div class="amount">199,90 €<span> / Monat</span></div>
          <div class="who">ab 11 Auszubildende</div>
          <a class="btn btn-outline mt-2" href="/kontakt#termin">Anfragen</a>
        </div>
      </div>

      <div class="np-incl">
        <div class="np-incl-box reveal">
          <div class="np-incl-title">${TAG_INKL} In jedem Paket enthalten</div>
          <ul class="list-check">
            <li>Stellenseite in der NEST Berufswelt</li>
            <li>NESTplay: euer Quiz im Unterricht</li>
            <li>Beratung, Bewerbungsvorbereitung und Vermittlung über die BildungsBar</li>
            <li>Ausbildungsdialog und vier Netzwerktreffen im Jahr</li>
            <li>Partner-Login mit Ansprechpartnern und Chatbot</li>
            <li>Social Media: Instagram, LinkedIn und Spotify</li>
          </ul>
        </div>
        <div class="np-incl-box np-incl-box--zu reveal">
          <div class="np-incl-title">${TAG_ZU} Exklusiv für Partner zubuchbar</div>
          <div class="np-addon">
            <b>NEST Explore</b>
            <span>290 € pro Termin zzgl. MwSt. (bis Ende 2026 Pilotpreis 100 €)</span>
            <span class="np-addon-gift">🎁 Erster Termin für neue Partner kostenfrei</span>
          </div>
          <div class="np-addon">
            <b>NEST AzubiConnect</b>
            <span>Workshop-Tag ab 990 € zzgl. MwSt., offene Workshops ab 176 € pro Person</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GEMEINWOHL -->
  <section class="section-navy np-impact">
    <div class="container">
      <div class="np-impact-inner reveal">
        <div>
          <span class="section-label">Euer Beitrag wirkt doppelt</span>
          <h2>Gut für euren Betrieb, gut für die Region</h2>
          <p>Mit eurem Partnerbeitrag finanziert ihr die kostenfreie Berufsorientierung in der BildungsBar und an Schulen. Genau aus diesen jungen Menschen kommen eure Bewerbenden.</p>
        </div>
        <div class="np-impact-stats">
          <div><strong>70+</strong><span>Unternehmen im Netzwerk</span></div>
          <div><strong>500+</strong><span>junge Menschen pro Jahr</span></div>
          <div><strong>4</strong><span>Standorte: Wuppertal, Essen, Solingen, Remscheid</span></div>
        </div>
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
        <div class="faq-item"><button class="faq-question"><span>Was kostet eine Partnerschaft?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Partnerschaft kostet 79,90 € pro Monat bis 5 Auszubildende, 139,90 € bis 10 und 199,90 € ab 11 Auszubildenden. NEST Explore und die Workshops von NEST AzubiConnect bucht ihr bei Bedarf dazu.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Können wir NEST Explore oder AzubiConnect auch ohne Partnerschaft buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Nein. Beide Angebote sind exklusiv für NEST-Partner. Die Websites könnt ihr euch jederzeit ansehen, buchen können nur Partner.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Was ist der Willkommensgutschein?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Als neuer Partner ist euer erster NEST Explore-Termin kostenfrei. Wählt im <a href="https://nest-explore.de/terminkalender" target="_blank" rel="noopener">Terminkalender</a> einen Termin und kreuzt im Buchungsformular „Willkommensgutschein einlösen“ an. Es wird dann keine Rechnung erstellt.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Mit welchen Talenten werden wir vernetzt?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir begleiten junge Menschen von der Berufsorientierung bis zum Vorstellungsgespräch und vernetzen passende, motivierte Kandidat:innen direkt mit euch.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Was ist NESTplay?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">NESTplay ist unser Live-Quiz für den Unterricht. Ihr erstellt einmal ein Quiz über euren Betrieb, Lehrkräfte setzen es in der Berufsorientierung immer wieder ein. Mehr auf <a href="https://nest-play.de" target="_blank" rel="noopener">nest-play.de</a>.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wie werden wir NEST-Partner?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten in einem unverbindlichen Kennenlerngespräch. Meldet euch über das Kontaktformular oder telefonisch, wir finden gemeinsam das passende Paket.</div></div></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section on-white">
    <div class="container">
      <div class="cta-inner">
        <span class="section-label" style="display:flex;justify-content:center;">NEST-Partner werden</span>
        <h2>Azubis finden.<br /><em>Azubis halten.</em></h2>
        <p>Lernt uns in einem kurzen Gespräch kennen. Wir zeigen euch, was die Partnerschaft für euren Betrieb bringt.</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/kontakt#termin">Gespräch vereinbaren</a>
          <a class="btn btn-ghost" href="/referenzen">Referenzen ansehen</a>
        </div>
        <p class="np-cta-login">Schon Partner? <a href="/partner-portal">Zum Partner-Login →</a></p>
      </div>
    </div>
  </section>

`;
export default html;
