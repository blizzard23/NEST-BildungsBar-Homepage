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

  <!-- KENNZAHLEN · Vorlage: Brilliant „Join over 10 million people learning on Brilliant" -->
  <div class="bb-trust">
    <div class="container">
      <p class="bb-trust__title">Über 500 Gäste pro Jahr – allein in Wuppertal</p>
      <div class="bb-trust__row">
        <div class="bb-trust__item"><b>70+</b><span>Unternehmen im Netzwerk</span></div>
        <div class="bb-trust__item"><b>150+</b><span>Ausbildungsberufe in der Beratung</span></div>
        <div class="bb-trust__item"><b>4</b><span>Standorte von Essen bis Remscheid</span></div>
        <div class="bb-trust__item"><b>0 €</b><span>für dich – die Beratung ist kostenfrei</span></div>
      </div>
    </div>
  </div>

  <!-- ANGEBOT · Vorlage: Brilliant „Supercharge your learning" -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-split">
        <div>
          <h2 class="bb-h2">Deine Berufsorientierung auf Augenhöhe</h2>
          <p class="bb-lead" style="margin-top:16px;">In der BildungsBar bekommst du kostenfreie Unterstützung rund um Ausbildung und Karriereplanung. Wir nehmen uns Zeit für dich – ganz ohne Druck.</p>
          <ul class="bb-ilist">
            <li><span class="bb-ilist__ic">${IC.compass}</span><div><b>Berufe entdecken</b><span>Wir finden gemeinsam deine Stärken und Motive heraus – und welche Berufsfelder wirklich zu dir passen.</span></div></li>
            <li><span class="bb-ilist__ic">${IC.file}</span><div><b>Bewerbung meistern</b><span>Vom Anschreiben bis zum Lebenslauf: Wir helfen dir, überzeugende Bewerbungsunterlagen zu erstellen.</span></div></li>
            <li><span class="bb-ilist__ic">${IC.people}</span><div><b>Vorstellungsgespräch üben</b><span>In simulierten Gesprächen üben wir den Ernstfall – für mehr Sicherheit und Selbstvertrauen.</span></div></li>
            <li><span class="bb-ilist__ic">${IC.network}</span><div><b>Direkte Kontakte zu Betrieben</b><span>Wir vernetzen dich mit regionalen Unternehmen – komplett kostenfrei und ohne Hintergedanken.</span></div></li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/terminbuchung">Termin buchen</a></div>
        </div>
        <div class="bb-frame bb-frame--43"><img src="/assets/img/team/story-patrick-mike.jpg" alt="Patrick und Mike, die Gründer von NEST, in der BildungsBar" loading="lazy"></div>
      </div>
    </div>
  </section>

  <!-- BERUFE · Vorlage: Brilliant „What can they learn on Brilliant?" -->
  <section class="bb-sec bb-sec--flush-top">
    <div class="container">
      <div class="bb-ruled">
        <div class="bb-head bb-head--row">
          <div>
            <h2 class="bb-h2">Was kannst du bei uns entdecken?</h2>
            <p class="bb-lead" style="margin-top:14px;max-width:640px;">Über 150 Ausbildungsberufe und duale Studiengänge – von Gesundheit über Handwerk bis IT. Wir helfen dir, im Dschungel der Möglichkeiten den richtigen Weg zu finden.</p>
          </div>
          <a class="bb-btn bb-btn--light" href="/berufswelt">Zur Berufswelt</a>
        </div>
        <div class="bb-catalog">
        <div class="bb-catalog__group">
          <h3>Gesundheit</h3>
          <ul>
            <li><a href="/beruf?b=medizinische-fachangestellte">Medizinische:r Fachangestellte:r</a></li>
            <li><a href="/beruf?b=pflegefachkraft">Pflegefachkraft</a></li>
            <li><a href="/beruf?b=physiotherapeut">Physiotherapeut:in</a></li>
            <li><a href="/beruf?b=notfallsanitaeter">Notfallsanitäter:in</a></li>
            <li><a href="/beruf?b=augenoptiker">Augenoptiker:in</a></li>
            <li><a href="/beruf?b=hoergeraeteakustiker">Hörgeräteakustiker:in</a></li>
            <li><a href="/beruf?b=operationstechnische-assistent">Operationstechnische:r Assistent:in</a></li>
            <li><a href="/beruf?b=kaufleute-im-gesundheitswesen">Kaufleute im Gesundheitswesen</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Gesundheitswesen">Alle 15 Berufe ansehen</a>
        </div>
        <div class="bb-catalog__group">
          <h3>Handwerk</h3>
          <ul>
            <li><a href="/beruf?b=kfz-mechatroniker">Kfz-Mechatroniker:in</a></li>
            <li><a href="/beruf?b=tischler">Tischler:in</a></li>
            <li><a href="/beruf?b=elektroniker-energie-und-gebaeudetechnik">Elektroniker:in Energie- und Gebäudetechnik</a></li>
            <li><a href="/beruf?b=anlagenmechaniker-fuer-sanitaer-heizungs-und-klimatechnik">Anlagenmechaniker:in für Sanitär-, Heizungs- und Klimatechnik</a></li>
            <li><a href="/beruf?b=dachdecker">Dachdecker:in</a></li>
            <li><a href="/beruf?b=baecker">Bäcker:in</a></li>
            <li><a href="/beruf?b=koch-koechin">Koch / Köchin</a></li>
            <li><a href="/beruf?b=gaertner-fachrichtung-garten-und-landschaftsbau">Gärtner:in – Fachrichtung Garten- und Landschaftsbau</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Handwerk">Alle 32 Berufe ansehen</a>
        </div>
        <div class="bb-catalog__group">
          <h3>Soziales</h3>
          <ul>
            <li><a href="/beruf?b=erzieher">Erzieher:in</a></li>
            <li><a href="/beruf?b=heilerziehungspfleger">Heilerziehungspfleger:in</a></li>
            <li><a href="/beruf?b=kinderpfleger">Kinderpfleger:in</a></li>
            <li><a href="/beruf?b=sozialassistent">Sozialassistent:in</a></li>
            <li><a href="/beruf?b=hauswirtschafter">Hauswirtschafter:in</a></li>
            <li><a href="/beruf?b=tierpfleger">Tierpfleger:in</a></li>
            <li><a href="/beruf?b=freiwilligendienst">Freiwilligendienst</a></li>
            <li><a href="/beruf?b=studium-soziale-arbeit">Studium Soziale Arbeit</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Sozialer%20Bereich">Alle 8 Berufe ansehen</a>
        </div>
        <div class="bb-catalog__group">
          <h3>Technik &amp; IT</h3>
          <ul>
            <li><a href="/beruf?b=fachinformatiker-anwendungsentwicklung">Fachinformatiker:in Anwendungsentwicklung</a></li>
            <li><a href="/beruf?b=fachinformatiker-systemintegration">Fachinformatiker:in Systemintegration</a></li>
            <li><a href="/beruf?b=industriemechaniker">Industriemechaniker:in</a></li>
            <li><a href="/beruf?b=it-systemelektroniker">IT-Systemelektroniker:in</a></li>
            <li><a href="/beruf?b=geomatiker">Geomatiker:in</a></li>
            <li><a href="/beruf?b=fachkraft-fuer-veranstaltungstechnik">Fachkraft für Veranstaltungstechnik</a></li>
            <li><a href="/beruf?b=duales-studium-informatik">Duales Studium Informatik</a></li>
            <li><a href="/beruf?b=duales-studium-maschinenbau">Duales Studium Maschinenbau</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Technische%20Berufe">Alle 54 Berufe ansehen</a>
        </div>
        <div class="bb-catalog__group">
          <h3>Verkauf &amp; Vertrieb</h3>
          <ul>
            <li><a href="/beruf?b=einzelhandelskaufleute">Einzelhandelskaufleute</a></li>
            <li><a href="/beruf?b=automobilkaufleute">Automobilkaufleute</a></li>
            <li><a href="/beruf?b=kaufleute-im-e-commerce">Kaufleute im E-Commerce</a></li>
            <li><a href="/beruf?b=hotelfachleute">Hotelfachleute</a></li>
            <li><a href="/beruf?b=veranstaltungskaufleute">Veranstaltungskaufleute</a></li>
            <li><a href="/beruf?b=kaufleute-marketingkommunikation">Kaufleute Marketingkommunikation</a></li>
            <li><a href="/beruf?b=kaufleute-spedition-logistikdienstleistung">Kaufleute Spedition / Logistikdienstleistung</a></li>
            <li><a href="/beruf?b=fachverkaeufer-lebensmittelhandwerk">Fachverkäufer:in Lebensmittelhandwerk</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Verkauf%20und%20Vertrieb">Alle 12 Berufe ansehen</a>
        </div>
        <div class="bb-catalog__group">
          <h3>Wirtschaft &amp; Verwaltung</h3>
          <ul>
            <li><a href="/beruf?b=kaufleute-bueromanagement">Kaufleute Büromanagement</a></li>
            <li><a href="/beruf?b=bankkaufleute">Bankkaufleute</a></li>
            <li><a href="/beruf?b=verwaltungsfachangestellte">Verwaltungsfachangestellte</a></li>
            <li><a href="/beruf?b=fachkraft-fuer-lagerlogistik">Fachkraft für Lagerlogistik</a></li>
            <li><a href="/beruf?b=kaufleute-fuer-versicherungen-und-finanzanlagen">Kaufleute für Versicherungen und Finanzanlagen</a></li>
            <li><a href="/beruf?b=kaufleute-fuer-digitalisierungsmanagement">Kaufleute für Digitalisierungsmanagement</a></li>
            <li><a href="/beruf?b=duales-studium-bwl">Duales Studium BWL</a></li>
            <li><a href="/beruf?b=duales-studium-bachelor-of-laws">Duales Studium Bachelor of Laws</a></li>
          </ul>
          <a class="bb-link bb-catalog__more" href="/berufswelt?feld=Wirtschaft%20%26%20Verwaltung">Alle 33 Berufe ansehen</a>
        </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABLAUF · Vorlage: Brilliant „How educators like you use Brilliant" -->
  <section class="bb-sec bb-sec--band">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">In drei Schritten zu <span class="bb-hl">deiner Ausbildung</span></h2>
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
  <section class="bb-sec" hidden>
    <div class="container">
      <div id="stellen-section"></div>
    </div>
  </section>

  <!-- STANDORTE · Vorlage: Brilliant Kurskatalog (Kachel + Bildunterschrift) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Vier BildungsBars in deiner Nähe</h2>
        <p class="bb-lead">Komm vorbei: Wir sind von 17 bis 19 Uhr für dich da.</p>
      </div>
      <div class="bb-cards">
        <a class="bb-card" href="/terminbuchung">
          <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal (Innenansicht)" loading="lazy"></span>
          <span class="bb-card__title">Wuppertal</span>
          <span class="bb-card__meta">Hochstraße 65</span>
        </a>
        <a class="bb-card" href="/terminbuchung">
          <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-essen.png" alt="BildungsBar Essen (Innenansicht)" loading="lazy"></span>
          <span class="bb-card__title">Essen</span>
          <span class="bb-card__meta">Kopstadtplatz 12</span>
        </a>
        <a class="bb-card" href="/terminbuchung">
          <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen im Gründerzentrum" loading="lazy"></span>
          <span class="bb-card__title">Solingen</span>
          <span class="bb-card__meta">Grünewalder Straße 29-31 · im Gründerzentrum</span>
        </a>
        <a class="bb-card" href="/terminbuchung">
          <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid in der Gründerschmiede" loading="lazy"></span>
          <span class="bb-card__title">Remscheid</span>
          <span class="bb-card__meta">Hindenburgstraße 10a · in der Gründerschmiede</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ZIELGRUPPEN · Vorlage: Brilliant „Brilliant Premium is a great gift for …" -->
  <section class="bb-sec bb-sec--flush-top">
    <div class="container">
      <div class="bb-ruled">
        <div class="bb-head">
          <h2 class="bb-h2">Gemeinsam für die Ausbildung</h2>
        </div>
        <div class="bb-cols">
          <a class="bb-col" href="/berufswelt">
            <span class="bb-col__media"><img src="/assets/img/standort-solingen.jpg" alt="Sitzecke in der BildungsBar Solingen" loading="lazy"></span>
            <div class="bb-col__body"><h3>Schüler:innen</h3><p>Kostenfreie Orientierung, Bewerbungshilfe und der direkte Draht zu Ausbildungsbetrieben.</p><span class="bb-link">Mehr erfahren</span></div>
          </a>
          <a class="bb-col" href="/fuer-schulen">
            <span class="bb-col__media"><img src="/assets/img/nest-explore.png" alt="Schüler:innen an einem NEST-Explore-Stand" loading="lazy"></span>
            <div class="bb-col__body"><h3>Schulen</h3><p>Workshops und Berufsorientierung, die kAoA-Kriterien erfüllen – jugendgerecht &amp; gamifiziert.</p><span class="bb-link">Für Schulen</span></div>
          </a>
          <a class="bb-col" href="/kooperation">
            <span class="bb-col__media"><img src="/assets/img/team/bildungsbar-aussen.jpg" alt="Eingang der NEST BildungsBar" loading="lazy"></span>
            <div class="bb-col__body"><h3>Unternehmen</h3><p>Werdet sichtbar bei motivierten Talenten und gestaltet die Ausbildung von morgen mit.</p><span class="bb-link">Kooperieren</span></div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ · Vorlage: Brilliant „FAQs" -->
  <section class="bb-sec bb-sec--band bb-faq">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">Häufig gestellte Fragen</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question"><span>Was kostet die Beratung?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Die Beratung in der BildungsBar ist für Schüler:innen und junge Menschen komplett kostenfrei.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Wann und wo habt ihr geöffnet?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Wir sind von 17 bis 19 Uhr für dich da: dienstags und donnerstags in Wuppertal (Hochstraße 65) und Essen (Kopstadtplatz 12), montags in Solingen (Grünewalder Straße 29-31, im Gründerzentrum) und mittwochs in Remscheid (Hindenburgstraße 10a, in der Gründerschmiede). Termine in Solingen und Remscheid sind ab Oktober buchbar.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Muss ich einen Termin buchen?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Am besten buchst du online einen Termin – so können wir uns optimal Zeit für dich nehmen.</div></div></div>
        <div class="faq-item"><button class="faq-question"><span>Für wen ist das Angebot gedacht?</span><span class="faq-toggle">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Für alle jungen Menschen, die sich beruflich orientieren möchten – egal ob noch in der Schule, kurz vor dem Abschluss oder auf der Suche nach einer Ausbildung.</div></div></div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Vorlage: Brilliant „Join over 10 million people learning on Brilliant" -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Bereit, deinen Partner zu entdecken?</h2>
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
