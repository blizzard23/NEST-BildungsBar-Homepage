// Partnerseite für Unternehmen: ansteigende Kurve mit drei Stationen (An Schulen,
// In der BildungsBar, In eurer Ausbildung), Partner-Login, Pakete und FAQ. Preise für weitere Explore-Termine und AzubiConnect stehen auf deren Websites.
// Gestaltung nach dem Redesign (public/assets/bb.css) plus partner.css.
// NEST Explore und NEST AzubiConnect sind exklusiv für Partner. Ein Explore-Termin
// pro Jahr ist im Partnerbeitrag enthalten, weitere Termine und AzubiConnect werden
// zusätzlich gebucht.
import IC from "./icons";

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
          <text class="np-curve-label np-curve-label--finden" x="225" y="210" text-anchor="middle">AZUBIS GEWINNEN</text>
          <text class="np-curve-label np-curve-label--halten" x="900" y="98" text-anchor="middle">AZUBIS HALTEN</text>
          <line class="np-drop" x1="46" y1="266.7" x2="46" y2="280" />
          <circle class="np-dot-halo np-dot-halo--finden" cx="46" cy="252.7" r="16" />
          <circle class="np-dot np-dot--finden" cx="46" cy="252.7" r="8" />
          <line class="np-drop" x1="405" y1="232.0" x2="405" y2="280" />
          <circle class="np-dot-halo np-dot-halo--finden" cx="405" cy="218.0" r="16" />
          <circle class="np-dot np-dot--finden" cx="405" cy="218.0" r="8" />
          <line class="np-drop" x1="763" y1="171.8" x2="763" y2="280" />
          <circle class="np-dot-halo np-dot-halo--halten" cx="763" cy="157.8" r="16" />
          <circle class="np-dot np-dot--halten" cx="763" cy="157.8" r="8" />
        </svg>
      </div>

      <div class="np-stops">
        <!-- 1 · An Schulen -->
        <article class="np-stop np-stop--finden">
          <h3><span class="np-stop-ic">${IC.cap}</span>An Schulen</h3>
          <p class="np-stop-lead">Schüler:innen lernen euch kennen.</p>
          <ul class="np-offers">
            <li><span class="np-offer-ic">${IC.people}</span><b>Schul-Workshops</b><span>Bei Berufsfelderkundungen an Schulen stellen wir euren Betrieb und eure Ausbildungsberufe vor.</span></li>
            <li><span class="np-offer-ic">${IC.play}</span><b><a class="np-offer-link" href="https://nest-play.de" target="_blank" rel="noopener">NESTplay${IC.external}</a></b><span>Euer Betrieb als Live-Quiz im Unterricht: einmal erstellt, setzen Lehrkräfte es immer wieder ein.</span></li>
            <li><span class="np-offer-ic">${IC.compass}</span><b><a class="np-offer-link" href="https://nest-explore.de" target="_blank" rel="noopener">NEST Explore${IC.external}</a></b><span>Einmal im Jahr inklusive: Ihr trefft bis zu 150 Schüler:innen, Ablauf und Moderation machen wir.</span></li>
          </ul>
        </article>

        <!-- 2 · In der BildungsBar -->
        <article class="np-stop np-stop--finden">
          <h3><span class="np-stop-ic">${IC.coffee}</span>In der BildungsBar</h3>
          <p class="np-stop-lead">Beratung fürs Gemeinwohl.</p>
          <ul class="np-offers">
            <li><span class="np-offer-ic">${IC.chat}</span><b>Beratung</b><span>Wir beraten junge Menschen kostenfrei, schreiben mit ihnen Bewerbungen und üben Gespräche.</span></li>
            <li><span class="np-offer-ic">${IC.network}</span><b>Vernetzen</b><span>Passt jemand zu eurem Betrieb, stellen wir den Kontakt direkt her, für Praktikum oder Ausbildung.</span></li>
            <li><span class="np-offer-ic">${IC.globe}</span><b><a class="np-offer-link" href="/berufswelt">Berufswelt${IC.arrow}</a></b><span>Euer Profil und eure Stellen in der NEST Berufswelt, wo Jugendliche über 150 Berufe entdecken.</span></li>
          </ul>
        </article>

        <!-- 3 · In eurer Ausbildung -->
        <article class="np-stop np-stop--halten">
          <h3><span class="np-stop-ic">${IC.briefcase}</span>In eurer Ausbildung</h3>
          <p class="np-stop-lead">Probleme lösen, bevor jemand abbricht.</p>
          <ul class="np-offers">
            <li><span class="np-offer-ic">${IC.user}</span><b>Unterstützung</b><span>Bei Fehlzeiten, Konflikten oder Abbruchgedanken klären wir mit euch die Ursache und finden Hilfe.</span></li>
            <li><span class="np-offer-ic">${IC.heart}</span><b>Mentale Gesundheit</b><span>Unser Partner, das Soul Space Center, berät eure Azubis und euch bei Stress oder Überforderung.</span></li>
            <li><span class="np-offer-ic">${IC.calendar}</span><b>Veranstaltungen</b><span>Fachinput beim Ausbildungsdialog und viermal im Jahr Austausch mit über 70 Ausbildungsbetrieben.</span></li>
          </ul>
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

  <!-- PAKETE · heller Abschnitt zwischen Kurve (dunkel) und Gemeinwohl (gold); Karten in Form der Stationen -->
  <section class="bb-sec" id="preise">
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
          <div class="bb-plan__head"><span class="np-plan-ic">${IC.user}</span>Kleine Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">79,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>bis 5</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
          </div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head"><span class="np-plan-ic">${IC.people}</span>Mittlere Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">139,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>6 bis 10</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
          </div>
        </div>
        <div class="bb-plan">
          <div class="bb-plan__head"><span class="np-plan-ic">${IC.building}</span>Große Partnerschaft</div>
          <div class="bb-plan__body">
            <div class="bb-plan__price">199,90 € <small>/ Monat</small></div>
            <div class="np-plan-seats"><b>ab 11</b> Azubis im Betrieb</div>
            <a class="bb-btn bb-btn--light" href="/kontakt#termin">Anfragen</a>
          </div>
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
        <div class="bb-trust__item"><b>4</b><span>Standorte</span></div>
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
        <div class="faq-item"><button class="faq-question"><span>Was kostet eine Partnerschaft?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Partnerschaft kostet 79,90 € pro Monat bis 5 Azubis, 139,90 € bis 10 und 199,90 € ab 11 Azubis. Gezählt werden die Auszubildenden, die bei euch beschäftigt sind. Ein Termin NEST Explore pro Jahr ist enthalten. Weitere Explore-Termine und die Workshops von NEST AzubiConnect bucht ihr bei Bedarf dazu. Die Preise dafür findet ihr auf <a href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de</a> und <a href="https://nest-azubiconnect.de" target="_blank" rel="noopener">nest-azubiconnect.de</a>.</div></div></div>
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
