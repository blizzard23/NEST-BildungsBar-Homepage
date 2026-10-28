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
      <h1><em>Impressum</em></h1>
      <p>Angaben gemäß § 5 TMG und § 55 Abs. 2 RStV.</p>
    </div>
  </section>

  <div class="page-body">

    <div class="dse-section">
      <h2 class="section-heading">Angaben gemäß § 5 TMG</h2>
      <div class="card">
        <p><strong>NEST GmbH</strong></p>
        <p>Hochstraße 65<br>42105 Wuppertal<br>Deutschland</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Vertreten durch</h2>
      <div class="card">
        <p><strong>Geschäftsführer:</strong></p>
        <p>Mike Stoeck<br>Patrick Nekola-Ossé</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Kontakt</h2>
      <div class="card">
        <p>
          <strong>Telefon:</strong> <a href="tel:+491764193396">+49 176 419 33 96</a><br>
          <strong>E-Mail:</strong> <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>
        </p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Registereintrag</h2>
      <div class="card">
        <p>
          <strong>Eingetragen im Handelsregister</strong><br>
          <strong>Registergericht:</strong> Amtsgericht Wuppertal<br>
          <strong>Registernummer:</strong> HRB 35438
        </p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)</h2>
      <div class="card">
        <p>Mike Stoeck<br>Patrick Nekola-Ossé<br>Hochstraße 65<br>42105 Wuppertal</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Redaktionell verantwortlich</h2>
      <div class="card">
        <p>NEST BildungsBar Mike Stoeck &amp; Patrick Nekola GbR</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">EU-Streitschlichtung</h2>
      <div class="card">
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>
        </p>
        <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Verbraucherschlichtung</h2>
      <div class="card">
        <p><strong>Verbraucherschlichtungsstelle / Universalschlichtungsstelle</strong></p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
    </div>

    <div class="dse-section">
      <h2 class="section-heading">Haftungsausschluss</h2>
      <div class="card">
        <p><strong>Haftung für Inhalte</strong></p>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.</p>
        <p><strong>Haftung für Links</strong></p>
        <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        <p>Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        <p><strong>Urheberrecht</strong></p>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
      </div>
    </div>

    <div class="info-box">
      <p><strong>Stand:</strong> März 2026 &nbsp;·&nbsp; <strong>Letzte Aktualisierung:</strong> 24. März 2026</p>
    </div>

  </div>
</div>
`;
export default html;
