const html = `
<style>
  .nest-legal *, .nest-legal *::before, .nest-legal *::after { margin: 0; padding: 0; box-sizing: border-box; }
  .nest-legal { font-family: 'Jost', sans-serif; color: #333; background: #f8faff; }

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

  /* CONTENT */
  .nest-legal .page-body { max-width: 900px; margin: 0 auto; padding: clamp(50px, 7vw, 80px) 20px clamp(60px, 8vw, 100px); }

  .nest-legal .toc {
    background: linear-gradient(135deg, rgba(239,165,0,.08) 0%, rgba(100,200,255,.08) 100%);
    border-left: 4px solid #EFA500; border-radius: 12px; padding: 24px 28px; margin-bottom: 48px;
  }
  .nest-legal .toc h3 { color: #0f2145; font-size: 1rem; font-weight: 800; margin-bottom: 12px; }
  .nest-legal .toc ol { margin: 0 0 0 20px; }
  .nest-legal .toc li { margin-bottom: 7px; }
  .nest-legal .toc a { color: #EFA500; text-decoration: none; font-size: .88rem; font-weight: 600; transition: color .2s; }
  .nest-legal .toc a:hover { color: #0f2145; text-decoration: underline; }

  .nest-legal .dse-section { margin-bottom: 48px; animation: nestSlideInLeft .7s ease-out both; }
  .nest-legal .section-heading {
    font-size: clamp(1.1rem, 3vw, 1.35rem); font-weight: 800; color: #0f2145; margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .nest-legal .section-heading .num {
    background: linear-gradient(135deg, #EFA500, #f5b830); color: white; font-size: .78rem; font-weight: 900;
    width: 28px; height: 28px; border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .nest-legal .card {
    background: white; border-radius: 14px; box-shadow: 0 4px 20px rgba(15,33,69,.07);
    padding: clamp(24px, 4vw, 36px); line-height: 1.85;
  }
  .nest-legal .card p { color: #555; font-size: clamp(14px, 1.8vw, 15.5px); margin-bottom: 16px; }
  .nest-legal .card p:last-child { margin-bottom: 0; }
  .nest-legal .card strong { color: #0f2145; }
  .nest-legal .card ul, .nest-legal .card ol { margin: 12px 0 16px 24px; }
  .nest-legal .card li { color: #555; font-size: clamp(14px, 1.8vw, 15.5px); margin-bottom: 10px; line-height: 1.7; }
  .nest-legal .card a { color: #EFA500; text-decoration: none; font-weight: 600; transition: color .2s; }
  .nest-legal .card a:hover { color: #0f2145; }

  .nest-legal .rights-grid { display: grid; gap: 10px; margin: 12px 0; }
  .nest-legal .right-row { display: flex; gap: 10px; align-items: flex-start; }
  .nest-legal .right-tag {
    background: rgba(239,165,0,.12); color: #0f2145; font-size: .72rem; font-weight: 700;
    padding: 3px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; margin-top: 2px;
  }
  .nest-legal .right-desc { font-size: .88rem; color: #555; line-height: 1.6; }
  .nest-legal .right-desc strong { color: #0f2145; font-size: .78rem; }

  .nest-legal .info-box {
    background: linear-gradient(135deg, rgba(239,165,0,.08) 0%, rgba(100,200,255,.08) 100%);
    border-left: 4px solid #EFA500; border-radius: 12px; padding: 20px 24px; margin-top: 32px;
  }
  .nest-legal .info-box p { margin: 0; color: #555; font-size: .88rem; line-height: 1.8; }
  .nest-legal .info-box a { color: #EFA500; font-weight: 600; text-decoration: none; }

  .nest-legal .question-box {
    background: linear-gradient(135deg, rgba(100,200,255,.08) 0%, rgba(239,165,0,.08) 100%);
    border-left: 4px solid #64C8FF; border-radius: 12px; padding: 22px 26px; margin-top: 20px;
  }
  .nest-legal .question-box p { margin: 0; color: #555; font-size: .88rem; line-height: 1.8; }
  .nest-legal .question-box strong { color: #0f2145; }
  .nest-legal .question-box a { color: #EFA500; text-decoration: none; font-weight: 600; }

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
      <h3>📋 Inhaltsverzeichnis</h3>
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
        Wir helfen gerne weiter! 📧
      </p>
    </div>

  </div>
</div>
`;
export default html;
