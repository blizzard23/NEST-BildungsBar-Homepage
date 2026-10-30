// Partnerseite für Unternehmen: zwei Kernpunkte (Azubis finden / Azubis halten)
// als ansteigende Kurve mit vier Stationen, Partner-Login, die drei Angebote, Pakete und FAQ.
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

  <!-- WEG DER PARTNERSCHAFT: ansteigende Kurve mit vier Stationen (Vorlage: Circle) -->
  <section class="bb-sec bb-sec--dark np-curve-sec" id="kreislauf">
    <div class="container">
      <div class="np-curve" aria-hidden="true">
        <svg class="np-curve-svg" viewBox="0 0 1052 280" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <linearGradient id="npCurveGrad" gradientUnits="userSpaceOnUse" x1="-260" y1="0" x2="1312" y2="0">
              <stop offset="0" stop-color="#EFA500" stop-opacity="0" />
              <stop offset="0.14" stop-color="#EFA500" />
              <stop offset="0.40" stop-color="#FFC94A" />
              <stop offset="0.50" stop-color="#8DB7FF" />
              <stop offset="1" stop-color="#C7DAFF" stop-opacity="0.55" />
            </linearGradient>
            <filter id="npCurveGlow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
          <path class="np-curve-glow" d="M-260 262.0 L-244 262.0 L-228 261.9 L-212 261.8 L-196 261.6 L-180 261.4 L-164 261.1 L-148 260.8 L-132 260.4 L-116 259.9 L-100 259.5 L-84 258.9 L-68 258.3 L-52 257.7 L-36 257.0 L-20 256.3 L-4 255.5 L12 254.6 L28 253.7 L44 252.8 L60 251.8 L76 250.8 L92 249.7 L108 248.5 L124 247.3 L140 246.1 L156 244.8 L172 243.4 L188 242.0 L204 240.6 L220 239.1 L236 237.5 L252 235.9 L268 234.2 L284 232.5 L300 230.8 L316 229.0 L332 227.1 L348 225.2 L364 223.2 L380 221.2 L396 219.2 L412 217.0 L428 214.9 L444 212.7 L460 210.4 L476 208.1 L492 205.7 L508 203.3 L524 200.8 L540 198.3 L556 195.7 L572 193.1 L588 190.4 L604 187.7 L620 184.9 L636 182.1 L652 179.2 L668 176.3 L684 173.3 L700 170.3 L716 167.2 L732 164.0 L748 160.9 L764 157.6 L780 154.3 L796 151.0 L812 147.6 L828 144.2 L844 140.7 L860 137.1 L876 133.5 L892 129.9 L908 126.2 L924 122.4 L940 118.7 L956 114.8 L972 110.9 L988 107.0 L1004 103.0 L1020 98.9 L1036 94.8 L1052 90.6 L1068 86.4 L1084 82.2 L1100 77.9 L1116 73.5 L1132 69.1 L1148 64.7 L1164 60.1 L1180 55.6 L1196 51.0 L1212 46.3 L1228 41.6 L1244 36.8 L1260 32.0 L1276 27.1 L1292 22.2 L1308 17.3" stroke="url(#npCurveGrad)" filter="url(#npCurveGlow)" />
          <path class="np-curve-line" d="M-260 262.0 L-244 262.0 L-228 261.9 L-212 261.8 L-196 261.6 L-180 261.4 L-164 261.1 L-148 260.8 L-132 260.4 L-116 259.9 L-100 259.5 L-84 258.9 L-68 258.3 L-52 257.7 L-36 257.0 L-20 256.3 L-4 255.5 L12 254.6 L28 253.7 L44 252.8 L60 251.8 L76 250.8 L92 249.7 L108 248.5 L124 247.3 L140 246.1 L156 244.8 L172 243.4 L188 242.0 L204 240.6 L220 239.1 L236 237.5 L252 235.9 L268 234.2 L284 232.5 L300 230.8 L316 229.0 L332 227.1 L348 225.2 L364 223.2 L380 221.2 L396 219.2 L412 217.0 L428 214.9 L444 212.7 L460 210.4 L476 208.1 L492 205.7 L508 203.3 L524 200.8 L540 198.3 L556 195.7 L572 193.1 L588 190.4 L604 187.7 L620 184.9 L636 182.1 L652 179.2 L668 176.3 L684 173.3 L700 170.3 L716 167.2 L732 164.0 L748 160.9 L764 157.6 L780 154.3 L796 151.0 L812 147.6 L828 144.2 L844 140.7 L860 137.1 L876 133.5 L892 129.9 L908 126.2 L924 122.4 L940 118.7 L956 114.8 L972 110.9 L988 107.0 L1004 103.0 L1020 98.9 L1036 94.8 L1052 90.6 L1068 86.4 L1084 82.2 L1100 77.9 L1116 73.5 L1132 69.1 L1148 64.7 L1164 60.1 L1180 55.6 L1196 51.0 L1212 46.3 L1228 41.6 L1244 36.8 L1260 32.0 L1276 27.1 L1292 22.2 L1308 17.3" stroke="url(#npCurveGrad)" />
          <text class="np-curve-label np-curve-label--finden" x="145" y="221.7" text-anchor="middle">AZUBIS FINDEN</text>
          <text class="np-curve-label np-curve-label--halten" x="687" y="148.7" text-anchor="middle">AZUBIS HALTEN</text>
            <line class="np-drop" x1="10" y1="268.7" x2="10" y2="280" />
            <circle class="np-dot-halo np-dot-halo--finden" cx="10" cy="254.7" r="16" />
            <circle class="np-dot np-dot--finden" cx="10" cy="254.7" r="8" />
            <line class="np-drop" x1="281" y1="246.9" x2="281" y2="280" />
            <circle class="np-dot-halo np-dot-halo--finden" cx="281" cy="232.9" r="16" />
            <circle class="np-dot np-dot--finden" cx="281" cy="232.9" r="8" />
            <line class="np-drop" x1="552" y1="210.4" x2="552" y2="280" />
            <circle class="np-dot-halo np-dot-halo--halten" cx="552" cy="196.4" r="16" />
            <circle class="np-dot np-dot--halten" cx="552" cy="196.4" r="8" />
            <line class="np-drop" x1="823" y1="159.2" x2="823" y2="280" />
            <circle class="np-dot-halo np-dot-halo--halten" cx="823" cy="145.2" r="16" />
            <circle class="np-dot np-dot--halten" cx="823" cy="145.2" r="8" />
        </svg>
      </div>

      <div class="np-stops">
        <!-- 1 · An Schulen -->
        <article class="np-stop np-stop--finden">
          <span class="np-stop-kicker">1 · Azubis finden</span>
          <h3>An Schulen</h3>
          <p class="np-stop-lead">Schüler:innen lernen euch kennen.</p>
          <ul class="np-offers">
            <li><div><b>NESTplay</b> ${TAG_INKL}</div><span>Euer Quiz läuft im Unterricht, auch ohne euch vor Ort.</span></li>
            <li><div><b>Schul-Workshops</b> ${TAG_INKL}</div><span>In Berufsfelderkundungen machen wir auf euch aufmerksam.</span></li>
            <li><div><b>NEST Explore</b> ${TAG_ZU}</div><span>Ihr trefft eine Schule, Ablauf und Moderation machen wir.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de</a><a class="bb-link" href="https://nest-play.de" target="_blank" rel="noopener">nest-play.de</a></div>
        </article>

        <!-- 2 · In der BildungsBar -->
        <article class="np-stop np-stop--finden">
          <span class="np-stop-kicker">2 · Azubis finden</span>
          <h3>In der BildungsBar</h3>
          <p class="np-stop-lead">Aus Interesse wird eine Bewerbung.</p>
          <ul class="np-offers">
            <li><div><b>Beratung</b> ${TAG_INKL}</div><span>Wir beraten junge Menschen und bereiten Bewerbungen vor.</span></li>
            <li><div><b>Vernetzen</b> ${TAG_INKL}</div><span>Wir bringen passende Bewerbende mit euch zusammen.</span></li>
            <li><div><b>Stellenseite</b> ${TAG_INKL}</div><span>Euer Profil und eure Stellen in der NEST Berufswelt.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="/berufswelt">Zur Berufswelt</a></div>
        </article>

        <!-- 3 · In eurer Ausbildung -->
        <article class="np-stop np-stop--halten">
          <span class="np-stop-kicker">3 · Azubis halten</span>
          <h3>In eurer Ausbildung</h3>
          <p class="np-stop-lead">Eure Azubis bleiben.</p>
          <ul class="np-offers">
            <li><div><b>Ansprechpartner</b> ${TAG_INKL}</div><span>Ein fester Kontakt für alle Fragen, direkt im Partner-Login.</span></li>
            <li><div><b>Chatbot</b> ${TAG_INKL}</div><span>Antworten aus unserer Erfahrung, jederzeit im Partner-Login.</span></li>
            <li><div><b>Workshops</b> ${TAG_ZU}</div><span>Für Azubis und Ausbildende, z. B. Resilienz oder Generation Z.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="https://nest-azubiconnect.de" target="_blank" rel="noopener">nest-azubiconnect.de</a></div>
        </article>

        <!-- 4 · Im Netzwerk -->
        <article class="np-stop np-stop--halten">
          <span class="np-stop-kicker">4 · Azubis halten</span>
          <h3>Im Netzwerk</h3>
          <p class="np-stop-lead">Ihr seid nicht allein.</p>
          <ul class="np-offers">
            <li><div><b>Ausbildungsdialog</b> ${TAG_INKL}</div><span>Fachthemen rund um Ausbildung, mit Input von Expert:innen.</span></li>
            <li><div><b>Netzwerktreffen</b> ${TAG_INKL}</div><span>Viermal im Jahr Austausch mit über 70 Ausbildungsbetrieben.</span></li>
            <li><div><b>Offene Workshops</b> ${TAG_ZU}</div><span>Einzelne Azubis anmelden und mit anderen Betrieben lernen.</span></li>
          </ul>
          <div class="np-station-links"><a class="bb-link" href="/veranstaltungen">Nächste Veranstaltungen</a></div>
        </article>
      </div>
      <div class="np-legend"><span>${TAG_INKL} im Partnerbeitrag enthalten</span><span>${TAG_ZU} exklusiv für Partner zubuchbar</span></div>

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

      <div class="bb-plans np-plans">
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
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
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
