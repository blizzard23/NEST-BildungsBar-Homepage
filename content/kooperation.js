// Partnerseite für Unternehmen: zwei Kernpunkte (Azubis finden / Azubis halten)
// im Kreislauf, Partner-Login, die drei Angebote, Pakete und FAQ.
// Gestaltung nach dem Redesign (public/assets/bb.css) plus partner.css.
// NEST Explore und NEST AzubiConnect sind exklusiv für Partner und werden
// zusätzlich zum Partnerbeitrag gebucht.
import IC from "./icons";

const TAG_INKL = `<span class="np-tag np-tag--inkl">im Beitrag</span>`;
const TAG_ZU = `<span class="np-tag np-tag--zu">zubuchbar</span>`;

const html = `

  <!-- HERO (wie Startseite und Schulen: Text links, Phone-Mockup rechts) -->
  <section class="hero np-hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Unternehmen</span>
        <h1>Ihr bildet aus.<br /><em>Wir machen den Rest.</em></h1>
        <p class="lead">Als NEST-Partner findet ihr passende Azubis und haltet sie im Betrieb. Wir nehmen euch die Arbeit dabei ab: von der Schule über die Bewerbung bis in eure Ausbildung.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/kontakt#termin">Gespräch vereinbaren →</a>
          <a class="btn btn-ghost" href="#kreislauf">So greift alles ineinander</a>
        </div>
        <div class="np-hero-points">
          <a class="np-hero-point" href="#kreislauf"><span class="np-hero-n">1</span><span><b>Azubis finden</b><small>Schulen · Explore · NESTplay</small></span></a>
          <a class="np-hero-point np-hero-point--halten" href="#kreislauf"><span class="np-hero-n">2</span><span><b>Azubis halten</b><small>Workshops · Dialog · Netzwerk</small></span></a>
        </div>
      </div>
      <div class="hero-visual hero-visual--phone np-hero-visual">
        <a class="hero-phone" href="#partner-login" aria-label="Partner-Login: alle Angebote, Buchungen und Ansprechpartner auf einen Blick">
          <span class="hp-notch"></span>
          <div class="hp-screen np-hp">
            <span class="hp-badge">Partner-Login</span>
            <div class="hp-title">Alles auf einen Blick</div>
            <div class="np-hp-booking">
              <div class="np-hp-booking-top"><span class="np-hp-ok">${IC.check} Gebucht</span><span>Do · 19.11.</span></div>
              <b>NEST Explore</b>
              <small>Schulbesuch · 8:30 Uhr</small>
            </div>
            <div class="np-hp-label">Angebote buchen</div>
            <div class="np-hp-tiles">
              <span class="np-hp-tile">${IC.compass}<b>Explore</b></span>
              <span class="np-hp-tile">${IC.play}<b>NESTplay</b></span>
              <span class="np-hp-tile">${IC.people}<b>Workshops</b></span>
              <span class="np-hp-tile">${IC.briefcase}<b>Stellen</b></span>
            </div>
            <div class="np-hp-contact">
              <span class="np-hp-avatar">${IC.user}</span>
              <span class="np-hp-contact-tx"><b>Euer Ansprechpartner</b><small>Direkt erreichbar</small></span>
              <span class="np-hp-contact-btn">${IC.chat}</span>
            </div>
            <div class="np-hp-ask">Frag unseren Assistenten …</div>
          </div>
        </a>
        <div class="np-float np-float--top" aria-hidden="true"><span class="np-float-ic">${IC.calendar}</span><span><b>Termin bestätigt</b><small>NEST Explore · 19.11.</small></span></div>
        <div class="np-float np-float--bottom" aria-hidden="true"><span class="np-float-ic np-float-ic--navy">${IC.chat}</span><span><b>Neue Nachricht</b><small>von eurem Ansprechpartner</small></span></div>
      </div>
    </div></div>
  </section>

  <!-- KREISLAUF: ZWEI KERNPUNKTE, VIER STATIONEN -->
  <section class="bb-sec bb-sec--band" id="kreislauf">
    <div class="container">
      <div class="bb-head bb-head--split">
        <div>
          <span class="bb-kicker">Zwei Kernpunkte, ein Kreislauf</span>
          <h2 class="bb-h2">Vom Klassenzimmer bis in eure <span class="bb-hl">Ausbildung</span></h2>
        </div>
        <p class="bb-lead">An den Schulen lernen euch Schüler:innen kennen, in der BildungsBar wird daraus eine Bewerbung, und in eurer Ausbildung sorgen wir mit euch dafür, dass die Azubis bleiben. Ihr steht im Zentrum, wir kümmern uns um die Wege dazwischen.</p>
      </div>

      <div class="np-cycle">
        <div class="np-ring-wrap">
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
        <article class="np-station np-station--finden np-station--1">
          <div class="np-station-top"><span class="np-station-ic">${IC.cap}</span><span class="np-station-kicker">1 · Azubis finden · An Schulen</span></div>
          <h3>Schüler:innen lernen euch kennen</h3>
          <ul class="np-offers">
            <li><div><b>NEST Explore</b> ${TAG_ZU}</div><span>Ihr trefft eine Schule, Ablauf und Moderation übernehmen wir.</span></li>
            <li><div><b>NESTplay</b> ${TAG_INKL}</div><span>Euer Quiz läuft im Unterricht, auch wenn ihr nicht dabei seid.</span></li>
            <li><div><b>Workshops an Schulen</b> ${TAG_INKL}</div><span>In unseren Berufsfelderkundungen machen wir auf euch aufmerksam.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de</a><a class="bb-link" href="https://nest-play.de" target="_blank" rel="noopener">nest-play.de</a></div>
        </article>

        <!-- 2 · In der BildungsBar -->
        <article class="np-station np-station--finden np-station--2">
          <div class="np-station-top"><span class="np-station-ic">${IC.coffee}</span><span class="np-station-kicker">2 · Azubis finden · In der BildungsBar</span></div>
          <h3>Aus Interesse wird eine Bewerbung</h3>
          <ul class="np-offers">
            <li><div><b>Beratung</b> ${TAG_INKL}</div><span>Wir beraten junge Menschen und bereiten Bewerbungen mit ihnen vor.</span></li>
            <li><div><b>Vernetzen</b> ${TAG_INKL}</div><span>Wir vernetzen passende Bewerbende mit euch und euren Ausbildungsplätzen.</span></li>
            <li><div><b>Stellenseite</b> ${TAG_INKL}</div><span>Euer Profil und eure Ausbildungsplätze in der NEST Berufswelt.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="/berufswelt">Zur Berufswelt</a></div>
        </article>

        <!-- 3 · In eurer Ausbildung -->
        <article class="np-station np-station--halten np-station--3">
          <div class="np-station-top"><span class="np-station-ic">${IC.people}</span><span class="np-station-kicker">3 · Azubis halten · In eurer Ausbildung</span></div>
          <h3>Eure Azubis bleiben</h3>
          <ul class="np-offers">
            <li><div><b>Workshops für Azubis</b> ${TAG_ZU}</div><span>Zum Beispiel Resilienz, Lernmotivation oder Kommunikation.</span></li>
            <li><div><b>Workshops für Ausbildende</b> ${TAG_ZU}</div><span>Die Generation Z verstehen und Azubis langfristig binden.</span></li>
            <li><div><b>Offene Workshops</b> ${TAG_ZU}</div><span>Einzelne Azubis anmelden und mit anderen Betrieben lernen.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="https://nest-azubiconnect.de" target="_blank" rel="noopener">nest-azubiconnect.de</a></div>
        </article>

        <!-- 4 · Im Netzwerk -->
        <article class="np-station np-station--halten np-station--4">
          <div class="np-station-top"><span class="np-station-ic">${IC.network}</span><span class="np-station-kicker">4 · Azubis halten · Im Netzwerk</span></div>
          <h3>Ihr seid nicht allein</h3>
          <ul class="np-offers">
            <li><div><b>Ausbildungsdialog</b> ${TAG_INKL}</div><span>Fachliche Themen rund um Ausbildung, mit Input von Expert:innen.</span></li>
            <li><div><b>Netzwerktreffen</b> ${TAG_INKL}</div><span>Viermal im Jahr Austausch mit über 70 Ausbildungsbetrieben.</span></li>
            <li><div><b>Partner-Login</b> ${TAG_INKL}</div><span>Alle Angebote, Buchungen und Ansprechpartner an einem Ort.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="/veranstaltungen">Nächste Veranstaltungen</a></div>
        </article>
      </div>

      <!-- PARTNER-LOGIN -->
      <div class="np-login" id="partner-login">
        <div class="np-login-text">
          <span class="bb-kicker">Euer Partner-Login</span>
          <h3 class="np-login-h">Alles auf einen Blick</h3>
          <p class="bb-p">Im Partner-Login seht ihr alle Angebote der Partnerschaft als Übersicht. Dort bucht ihr sie direkt und findet eure Ansprechpartner.</p>
        </div>
        <ul class="np-login-list">
          <li><span class="np-login-ic">${IC.layers}</span>Alle Angebote im Überblick</li>
          <li><span class="np-login-ic">${IC.calendar}</span>Explore-Termine, Workshops und Veranstaltungen buchen</li>
          <li><span class="np-login-ic">${IC.user}</span>Ansprechpartner und Chatbot mit unseren Erfahrungen</li>
          <li><span class="np-login-ic">${IC.monitor}</span>Eure Stellen und NESTplay-Quizze verwalten</li>
        </ul>
        <a class="bb-btn bb-btn--gold np-login-btn" href="/partner-portal">Zum Partner-Login</a>
      </div>
    </div>
  </section>

  <!-- DIE DREI ANGEBOTE -->
  <section class="bb-sec" id="angebote">
    <div class="container">
      <div class="bb-head bb-head--split">
        <div>
          <span class="bb-kicker">Drei Angebote, ein Partner</span>
          <h2 class="bb-h2">Alles aus einer <span class="bb-hl">Hand</span></h2>
        </div>
        <p class="bb-lead">Jedes Angebot hat seine eigene Website. Gebucht wird alles über eure Partnerschaft.</p>
      </div>
      <div class="bb-cards bb-cards--3">
        <a class="bb-card" href="https://nest-play.de" target="_blank" rel="noopener">
          <span class="bb-card__tile"><img src="/assets/img/broschueren/nestplay.jpg" alt="Schülerin spielt das NESTplay-Quiz auf dem Smartphone" loading="lazy"><span class="bb-badge bb-badge--soft">Im Partnerbeitrag</span></span>
          <span class="bb-card__title">NESTplay</span>
          <span class="bb-card__meta">Euer Betrieb als Live-Quiz im Unterricht: einmal erstellen, Lehrkräfte setzen es immer wieder ein.</span>
          <span class="bb-card__link bb-link">nest-play.de</span>
        </a>
        <a class="bb-card" href="https://nest-explore.de" target="_blank" rel="noopener">
          <span class="bb-card__tile"><img src="/assets/img/broschueren/nest-explore.jpg" alt="Schüler:innen im Gespräch mit einem Unternehmen bei NEST Explore" loading="lazy"><span class="bb-badge">Exklusiv · zubuchbar</span></span>
          <span class="bb-card__title">NEST Explore</span>
          <span class="bb-card__meta">Ausbildung live an der Schule: sechs Betriebe, bis zu 150 Schüler:innen, komplett von uns organisiert.</span>
          <span class="bb-card__link bb-link">nest-explore.de</span>
        </a>
        <a class="bb-card" href="https://nest-azubiconnect.de" target="_blank" rel="noopener">
          <span class="bb-card__tile"><img src="/assets/img/angebote/azubiconnect.jpg" alt="Azubis in einem Workshop von NEST AzubiConnect" loading="lazy"><span class="bb-badge">Exklusiv · zubuchbar</span></span>
          <span class="bb-card__title">NEST AzubiConnect</span>
          <span class="bb-card__meta">Praxisnahe Workshops für Azubis und Ausbildende: inhouse, in der BildungsBar oder als offener Workshop.</span>
          <span class="bb-card__link bb-link">nest-azubiconnect.de</span>
        </a>
      </div>
    </div>
  </section>

  <!-- PAKETE -->
  <section class="bb-sec bb-sec--dark" id="preise">
    <div class="container">
      <div class="bb-head bb-head--split">
        <div>
          <span class="bb-kicker">Partnerpakete</span>
          <h2 class="bb-h2">Ein Paket für jede <span class="bb-hl">Betriebsgröße</span></h2>
        </div>
        <p class="bb-lead">Monatliche Preise, alle Pakete enthalten dieselben Leistungen. Es zählt nur, wie viele Azubis bei euch beschäftigt sind.</p>
      </div>

      <div class="np-seat">
        <span class="np-seat-ic">${IC.people}</span>
        <p><b>So zählen wir:</b> Maßgeblich sind die Auszubildenden, die bereits in eurem Betrieb beschäftigt sind, nicht die Ausbildungsplätze, die ihr sucht.</p>
      </div>

      <div class="bb-plans">
        <div class="bb-plan">
          <div class="bb-plan__head">Kleine Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">79,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>bis 5</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
          </div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head">Mittlere Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">139,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>6 bis 10</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--gold" href="/kontakt#termin">Anfragen</a>
          </div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head">Große Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">199,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>ab 11</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
          </div>
        </div>
      </div>

      <div class="bb-included">
        <b>In jedem Paket enthalten</b>
        <ul>
          <li>Stellenseite in der NEST Berufswelt</li>
          <li>NESTplay im Unterricht</li>
          <li>Workshops an Schulen</li>
          <li>Beratung und Vernetzung über die BildungsBar</li>
          <li>Ausbildungsdialog und vier Netzwerktreffen</li>
          <li>Partner-Login mit Ansprechpartnern</li>
          <li>Social Media</li>
        </ul>
      </div>

      <div class="np-addons">
        <div class="np-addons-head"><b>Exklusiv für Partner zubuchbar</b></div>
        <div class="np-addon">
          <span class="np-addon-name">NEST Explore</span>
          <span class="np-addon-price">290 € <small>pro Termin zzgl. MwSt.</small></span>
          <span class="np-addon-note">Neue Partner erhalten von uns einen Gutscheincode für ihren ersten Termin.</span>
        </div>
        <div class="np-addon">
          <span class="np-addon-name">NEST AzubiConnect</span>
          <span class="np-addon-price">ab 790 € <small>pro Workshop-Tag zzgl. MwSt.</small></span>
          <span class="np-addon-note">Offene Workshops ab 176 € pro Person.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- GEMEINWOHL -->
  <section class="bb-trust">
    <div class="container">
      <p class="bb-trust__title">Euer Beitrag wirkt doppelt: Er finanziert die kostenfreie Berufsorientierung in der BildungsBar und an Schulen. Genau aus diesen jungen Menschen kommen eure Bewerbenden.</p>
      <div class="bb-trust__row bb-trust__row--3">
        <div class="bb-trust__item"><b>70+</b><span>Unternehmen im Netzwerk</span></div>
        <div class="bb-trust__item"><b>500+</b><span>junge Menschen pro Jahr</span></div>
        <div class="bb-trust__item"><b>4</b><span>Standorte: Wuppertal · Essen · Solingen · Remscheid</span></div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bb-sec bb-sec--band bb-faq">
    <div class="container">
      <div class="bb-head">
        <span class="bb-kicker">Fragen &amp; Antworten</span>
        <h2 class="bb-h2">Häufig gestellte Fragen</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question"><span>Was kostet eine Partnerschaft?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Partnerschaft kostet 79,90 € pro Monat bis 5 Azubis, 139,90 € bis 10 und 199,90 € ab 11 Azubis. Gezählt werden die Auszubildenden, die bei euch beschäftigt sind. NEST Explore und die Workshops von NEST AzubiConnect bucht ihr bei Bedarf dazu.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Können wir NEST Explore oder AzubiConnect auch ohne Partnerschaft buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Nein. Beide Angebote sind exklusiv für NEST-Partner. Die Websites könnt ihr euch jederzeit ansehen, buchen können nur Partner.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wie lösen wir einen Gutscheincode ein?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Neue Partner erhalten von uns einen Gutscheincode für NEST Explore. Wählt im <a href="https://nest-explore.de/terminkalender" target="_blank" rel="noopener">Terminkalender</a> einen Termin und gebt den Code im Buchungsformular ein. Der Rabatt wird sofort abgezogen.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Was finden wir im Partner-Login?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Alle Angebote der Partnerschaft als Übersicht. Dort bucht ihr sie, verwaltet eure Stellen und NESTplay-Quizze und findet eure Ansprechpartner.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Mit welchen Talenten werden wir vernetzt?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir begleiten junge Menschen von der Berufsorientierung bis zum Vorstellungsgespräch und vernetzen passende, motivierte Kandidat:innen mit euch.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wie werden wir NEST-Partner?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten in einem unverbindlichen Kennenlerngespräch. Meldet euch über das Kontaktformular oder telefonisch, wir finden gemeinsam das passende Paket.</div></div></div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Azubis finden.<br /><span class="bb-hl">Azubis halten.</span></h2>
          <p class="bb-lead">Lernt uns in einem kurzen Gespräch kennen. Wir zeigen euch, was die Partnerschaft für euren Betrieb bringt.</p>
          <div class="bb-actions">
            <a class="bb-btn bb-btn--gold" href="/kontakt#termin">Gespräch vereinbaren</a>
            <a class="bb-btn bb-btn--light" href="/referenzen">Referenzen ansehen</a>
          </div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="mailto:info@nest-bildungsbar.de"><small>E-Mail</small><b>info@nest-bildungsbar.de</b></a><span>Schreibt uns</span></div>
          <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Ruft uns an</span></div>
          <div class="bb-cta__item"><a href="/partner-portal"><small>Schon Partner?</small><b>Zum Partner-Login</b></a><span>Angebote, Buchungen, Ansprechpartner</span></div>
          <div class="bb-cta__item"><a href="/veranstaltungen"><small>Netzwerk</small><b>Veranstaltungen</b></a><span>Ausbildungsdialog und Treffen</span></div>
        </div>
      </div>
    </div>
  </section>

`;
export default html;
