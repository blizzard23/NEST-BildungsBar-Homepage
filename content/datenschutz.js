const html = `
<style>
  .nest-legal *, .nest-legal *::before, .nest-legal *::after { margin: 0; padding: 0; box-sizing: border-box; }
  .nest-legal { font-family: 'Jost', sans-serif; color: #333; background: #fff; }

  @keyframes nestSlideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }

  /* HERO */
  .nest-legal .nest-hero { background: #0f2145; padding: 100px 40px 130px; position: relative; overflow: hidden; }
  .nest-legal .nest-hero::before {
    content: ''; position: absolute; top: 20%; right: 8%; width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(239,165,0,.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .nest-legal .nest-hero::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 70px;
    background: #EFA500; clip-path: polygon(0 100%, 100% 35%, 100% 100%);
  }
  .nest-legal .nest-hero__inner { max-width: 700px; position: relative; z-index: 2; }
  .nest-legal .section-label {
    display: block; color: #EFA500; font-size: 11px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 20px;
  }
  .nest-legal .nest-hero h1 { font-size: clamp(36px, 6vw, 64px); font-weight: 900; color: #fff; line-height: 1.1; margin: 8px 0 20px; }
  .nest-legal .nest-hero h1 em { color: #EFA500; font-style: normal; }
  .nest-legal .nest-hero p { font-size: clamp(15px, 2vw, 17px); color: rgba(255,255,255,.72); line-height: 1.7; max-width: 540px; }

  /* INHALT · Textspalte mit Trennlinien, keine Karten */
  .nest-legal .page-body { max-width: 800px; margin: 0 auto; padding: 96px 20px 110px; }
  .nest-legal .toc {
    background: #f4f6fa; border: 0; border-radius: 20px;
    padding: 26px 30px; margin-bottom: 56px;
  }
  .nest-legal .toc h3 { color: #0f2145; font-size: 17px; font-weight: 700; margin-bottom: 14px; }
  .nest-legal .toc ol { margin: 0 0 0 22px; columns: 2; column-gap: 32px; }
  .nest-legal .toc li { margin-bottom: 8px; color: #697186; font-size: 15px; break-inside: avoid; }
  .nest-legal .toc a { color: #0f2145; font-size: 15px; font-weight: 600; text-decoration: underline; text-decoration-color: #cfd4dc; text-underline-offset: 3px; }
  .nest-legal .toc a:hover { text-decoration-color: #0f2145; }

  .nest-legal .dse-section { padding: 32px 0; border-top: 1px solid #e1e4ea; scroll-margin-top: 120px; }
  .nest-legal .dse-section:first-of-type, .nest-legal .toc + .dse-section { border-top: 1px solid #d3d9e3; }
  .nest-legal .section-heading {
    font-size: clamp(20px, 2.4vw, 24px); font-weight: 700; line-height: 1.3; color: #0f2145; margin-bottom: 14px;
    display: flex; align-items: baseline; gap: 12px; letter-spacing: -0.01em;
  }
  .nest-legal .section-heading .num { color: #a96b00; font-size: 17px; font-weight: 700; flex-shrink: 0; }
  .nest-legal .card { background: none; border: 0; border-radius: 0; box-shadow: none; padding: 0; line-height: 1.75; transition: none; }
  .nest-legal .card:hover { box-shadow: none; transform: none; }
  .nest-legal .card p { color: #3d4455; font-size: 16px; margin-bottom: 14px; }
  .nest-legal .card p:last-child { margin-bottom: 0; }
  .nest-legal .card strong { color: #0f2145; }
  .nest-legal .card ul, .nest-legal .card ol { margin: 10px 0 16px 22px; }
  .nest-legal .card li { color: #3d4455; font-size: 16px; margin-bottom: 8px; line-height: 1.65; }
  .nest-legal .card a { color: #0f2145; font-weight: 600; text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 3px; }
  .nest-legal .card a:hover { color: #a96b00; }

  .nest-legal .rights-grid { display: grid; gap: 0; margin: 14px 0; border: 1px solid #e1e4ea; border-radius: 14px; overflow: hidden; }
  .nest-legal .right-row { display: flex; gap: 14px; align-items: flex-start; padding: 14px 16px; border-top: 1px solid #e1e4ea; }
  .nest-legal .right-row:first-child { border-top: 0; }
  .nest-legal .right-tag {
    background: #e8ecf4; color: #0f2145; font-size: 12px; font-weight: 700;
    padding: 3px 10px; border-radius: 9999px; white-space: nowrap; flex-shrink: 0; margin-top: 2px;
  }
  .nest-legal .right-desc { font-size: 15px; color: #3d4455; line-height: 1.6; }
  .nest-legal .right-desc strong { color: #0f2145; font-size: 15px; }

  .nest-legal .info-box { background: #f4f5f7; border-radius: 14px; padding: 22px 26px; margin-top: 40px; }
  .nest-legal .info-box p { margin: 0; color: #3d4455; font-size: 15px; line-height: 1.7; }
  .nest-legal .info-box strong { color: #0f2145; }
  .nest-legal .info-box a { color: #0f2145; font-weight: 600; }
  .nest-legal .question-box { margin-top: 28px; padding-top: 24px; border-top: 1px solid #e1e4ea; }
  .nest-legal .question-box p { margin: 0; color: #3d4455; font-size: 16px; line-height: 1.7; }
  .nest-legal .question-box strong { color: #0f2145; font-size: 17px; }
  .nest-legal .question-box a { color: #0f2145; font-weight: 600; text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 3px; }

  @media (max-width: 760px) {
    .nest-legal .page-body { padding: 64px 20px 80px; }
    .nest-legal .toc ol { columns: 1; }
    .nest-legal .right-row { flex-direction: column; gap: 6px; }
  }
  @media (max-width: 768px) { .nest-legal .nest-hero { padding: 80px 24px 110px; } }
</style>

<div class="nest-legal">

  <section class="nest-hero">
    <div class="nest-hero__inner">
      <span class="section-label">Rechtliches</span>
      <h1>Daten&shy;schutz&shy;<em>erklärung</em></h1>
      <p>Transparenz &amp; Vertrauen — Ihre Daten in sicheren Händen.</p>
    </div>
  </section>

  <div class="page-body">

    <div class="toc">
      <h3>Inhaltsverzeichnis</h3>
      <ol>
        <li><a href="#verantwortliche">Verantwortliche Stelle</a></li>
        <li><a href="#datenerfassung">Erfassung und Verarbeitung personenbezogener Daten</a></li>
        <li><a href="#kontaktformular">Kontaktformular</a></li>
        <li><a href="#cookies">Cookies und Tracking</a></li>
        <li><a href="#weitergabe">Weitergabe von Daten</a></li>
        <li><a href="#speicherdauer">Speicherdauer</a></li>
        <li><a href="#rechte">Ihre Rechte</a></li>
        <li><a href="#sicherheit">Datensicherheit</a></li>
      </ol>
    </div>

    <div class="dse-section" id="verantwortliche">
      <h2 class="section-heading"><span class="num">1</span> Verantwortliche Stelle</h2>
      <div class="card">
        <p>Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:</p>
        <p><strong>NEST GmbH</strong><br>Hochstraße 65<br>42105 Wuppertal<br>Deutschland</p>
        <p>
          <strong>Vertreter:</strong> Mike Stoeck, Patrick Nekola-Ossé<br>
          <strong>E-Mail:</strong> <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a><br>
          <strong>Telefon:</strong> <a href="tel:+491764193396">+49 176 419 33 96</a>
        </p>
      </div>
    </div>

    <div class="dse-section" id="datenerfassung">
      <h2 class="section-heading"><span class="num">2</span> Erfassung und Verarbeitung personenbezogener Daten</h2>
      <div class="card">
        <p>Personenbezogene Daten werden von uns nur erhoben und verarbeitet, soweit dies notwendig ist, um die Funktionalität unserer Website zu gewährleisten und Sie mit unserem Service optimal zu versorgen. Die Verarbeitung geschieht auf Grundlage von Art. 6 DSGVO.</p>
        <p><strong>Automatisch erfasste Daten:</strong></p>
        <ul>
          <li>IP-Adresse</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Besuchte Seiten und Unterseiten</li>
          <li>Uhrzeit und Dauer des Besuchs</li>
        </ul>
        <p>Diese Daten werden nicht Ihrer Person zugeordnet, es sei denn, Sie stellen uns freiwillig Informationen zur Verfügung.</p>
      </div>
    </div>

    <div class="dse-section" id="kontaktformular">
      <h2 class="section-heading"><span class="num">3</span> Kontaktformular</h2>
      <div class="card">
        <p>Wenn Sie unser Kontaktformular ausfüllen und abschicken, werden die folgenden Daten erfasst:</p>
        <ul>
          <li>Unternehmensname</li>
          <li>Kontaktperson</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer (optional)</li>
          <li>Unternehmensgröße (optional)</li>
          <li>Anzahl offener Ausbildungsplätze (optional)</li>
          <li>Nachricht (optional)</li>
        </ul>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 Buchst. a DSGVO (Einwilligung)<br>
          <strong>Zweck:</strong> Beantwortung Ihrer Anfrage und Kontaktaufnahme
        </p>
        <p>Ihre Daten werden ausschließlich für die Bearbeitung Ihrer Anmeldung verwendet. Eine Weitergabe an Dritte erfolgt nicht.</p>
      </div>
    </div>

    <div class="dse-section" id="cookies">
      <h2 class="section-heading"><span class="num">4</span> Cookies und Tracking</h2>
      <div class="card">
        <p>Diese Website verwendet Cookies, um Ihr Nutzungserlebnis zu verbessern. Cookies sind kleine Dateien, die auf Ihrem Gerät gespeichert werden.</p>
        <p><strong>Notwendige Cookies:</strong> Diese sind erforderlich für die Funktionalität der Website und können ohne Einwilligung gesetzt werden.</p>
        <p><strong>Analyse-Cookies:</strong> Mit Ihrer Zustimmung können wir Analyse-Tools nutzen, um Besucherdaten anonym zu erfassen und die Website zu optimieren.</p>
        <p><strong>Vercel Web Analytics:</strong> Nur wenn Sie im Cookie-Banner der Kategorie „Statistik“ zustimmen, laden wir die Reichweitenmessung „Web Analytics“ unseres Hosting-Anbieters Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). Erfasst werden dabei aufgerufene Seite, Referrer, ungefähre Herkunft (Land), Gerätetyp, Betriebssystem und Browser. Das Tool setzt <strong>keine Cookies</strong> und speichert nichts auf Ihrem Gerät; Ihre IP-Adresse wird nicht gespeichert, sondern nur zur Bildung einer anonymen, täglich wechselnden Besucher-Kennung verwendet. Eine Wiedererkennung über den Tag hinaus oder die Bildung von Nutzerprofilen findet nicht statt. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 Buchst. a DSGVO, § 25 Abs. 1 TDDDG), die Sie jederzeit über die <a href="#cookie-einstellungen">Cookie-Einstellungen</a> widerrufen können. Mit Vercel besteht ein Auftragsverarbeitungsvertrag; die Übermittlung in die USA erfolgt auf Basis der EU-Standardvertragsklauseln. Details: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">vercel.com/legal/privacy-policy</a>.</p>
        <p>Sie können Cookies jederzeit in Ihren Browsereinstellungen deaktivieren. Beachten Sie jedoch, dass dies die Funktionalität der Website beeinträchtigen kann.</p>
      </div>
    </div>

    <div class="dse-section" id="weitergabe">
      <h2 class="section-heading"><span class="num">5</span> Weitergabe von Daten</h2>
      <div class="card">
        <p>Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nicht, es sei denn:</p>
        <ul>
          <li>Sie haben explizit in die Weitergabe eingewilligt</li>
          <li>Wir sind gesetzlich zur Weitergabe verpflichtet</li>
          <li>Die Weitergabe ist notwendig zur Erfüllung unserer Leistungspflichten</li>
        </ul>
        <p>Wir arbeiten ausschließlich mit Dienstleistern zusammen, die personenbezogene Daten im Rahmen einer Auftragsverarbeitung (Art. 28 DSGVO) verarbeiten.</p>
      </div>
    </div>

    <div class="dse-section" id="speicherdauer">
      <h2 class="section-heading"><span class="num">6</span> Speicherdauer</h2>
      <div class="card">
        <p>Personenbezogene Daten, die Sie uns im Kontaktformular übermitteln, werden so lange gespeichert, wie es für die Bearbeitung Ihrer Anfrage notwendig ist. Danach werden diese gelöscht.</p>
        <p><strong>Ausnahmen:</strong> Sollten gesetzliche Aufbewahrungsfristen (z.&nbsp;B. Steuerrecht, Handelsgesetzbuch) Anwendung finden, werden Ihre Daten entsprechend diesen Fristen gespeichert.</p>
      </div>
    </div>

    <div class="dse-section" id="rechte">
      <h2 class="section-heading"><span class="num">7</span> Ihre Rechte</h2>
      <div class="card">
        <p>Gemäß DSGVO haben Sie folgende Rechte:</p>
        <div class="rights-grid">
          <div class="right-row">
            <span class="right-tag">Art. 15</span>
            <div class="right-desc"><strong>Auskunftsrecht</strong> — Sie können jederzeit eine Kopie Ihrer gespeicherten Daten anfordern.</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Art. 16</span>
            <div class="right-desc"><strong>Berichtigungsrecht</strong> — Sie können fehlerhafte Daten korrigieren lassen.</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Art. 17</span>
            <div class="right-desc"><strong>Löschungsrecht</strong> — Sie können die Löschung Ihrer Daten verlangen („Recht auf Vergessenwerden").</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Art. 18</span>
            <div class="right-desc"><strong>Einschränkungsrecht</strong> — Sie können die Verarbeitung Ihrer Daten einschränken lassen.</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Art. 20</span>
            <div class="right-desc"><strong>Datenportabilität</strong> — Sie können Ihre Daten in einem strukturierten, maschinenlesbaren Format erhalten.</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Art. 21</span>
            <div class="right-desc"><strong>Widerspruchsrecht</strong> — Sie können der Verarbeitung Ihrer Daten widersprechen.</div>
          </div>
          <div class="right-row">
            <span class="right-tag">Beschwerde</span>
            <div class="right-desc"><strong>Beschwerderecht</strong> — Sie haben das Recht, sich bei einer zuständigen Datenschutzbehörde zu beschweren.</div>
          </div>
        </div>
        <p style="margin-top:20px;">Um eines dieser Rechte geltend zu machen, kontaktieren Sie uns unter <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>.</p>
      </div>
    </div>

    <div class="dse-section" id="sicherheit">
      <h2 class="section-heading"><span class="num">8</span> Datensicherheit</h2>
      <div class="card">
        <p>Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten vor Verlust, Zerstörung, unberechtigtem Zugriff, Veränderung oder Verbreitung zu schützen.</p>
        <p><strong>Sichere Übertragung:</strong> Diese Website verwendet SSL/TLS-Verschlüsselung (erkennbar am „https://" in der Adresszeile).</p>
        <p><strong>Zugriffskontrolle:</strong> Nur autorisierte Mitarbeitende haben Zugriff auf personenbezogene Daten.</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Änderungen dieser Datenschutzerklärung</h2>
      <div class="card">
        <p>Wir behalten uns das Recht vor, diese Datenschutzerklärung zu aktualisieren, um sie an geänderte Rechtslagen oder Leistungsangebote anzupassen. Wesentliche Änderungen werden wir Ihnen mitteilen.</p>
      </div>
    </div>

    <div class="info-box">
      <p>
        <strong>Verantwortlich für Datenschutz:</strong> <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a><br>
        <strong>Stand:</strong> März 2026 &nbsp;·&nbsp; <strong>Letzte Aktualisierung:</strong> 24. März 2026
      </p>
    </div>

    <div class="question-box">
      <p>
        <strong>Fragen zum Datenschutz?</strong><br>
        Wenn Sie Fragen zu dieser Datenschutzerklärung oder unseren Datenschutzpraktiken haben, kontaktieren Sie uns jederzeit unter
        <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>.
        Wir helfen gerne weiter!
      </p>
    </div>

  </div>
</div>
`;
export default html;
