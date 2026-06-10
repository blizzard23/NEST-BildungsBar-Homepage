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
  .nest-legal .dse-section { margin-bottom: 40px; animation: nestSlideInLeft .7s ease-out both; }
  .nest-legal .section-heading {
    font-size: clamp(1.05rem, 3vw, 1.25rem); font-weight: 800; color: #0f2145; margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .nest-legal .section-heading::before {
    content: ''; display: block; width: 4px; height: 22px;
    background: linear-gradient(180deg, #EFA500, #f5b830); border-radius: 2px; flex-shrink: 0;
  }
  .nest-legal .card {
    background: white; border-radius: 14px; box-shadow: 0 4px 20px rgba(15,33,69,.07);
    padding: clamp(22px, 4vw, 32px); line-height: 1.85;
  }
  .nest-legal .card p { color: #555; font-size: clamp(14px, 1.8vw, 15.5px); margin-bottom: 14px; }
  .nest-legal .card p:last-child { margin-bottom: 0; }
  .nest-legal .card strong { color: #0f2145; }
  .nest-legal .card ul { margin: 10px 0 14px 22px; }
  .nest-legal .card li { color: #555; font-size: clamp(14px, 1.8vw, 15.5px); margin-bottom: 8px; line-height: 1.7; }
  .nest-legal .card a { color: #EFA500; text-decoration: none; font-weight: 600; transition: color .2s; }
  .nest-legal .card a:hover { color: #0f2145; }
  .nest-legal .info-box {
    background: linear-gradient(135deg, rgba(239,165,0,.08) 0%, rgba(100,200,255,.08) 100%);
    border-left: 4px solid #EFA500; border-radius: 12px; padding: 20px 24px; margin-top: 40px;
  }
  .nest-legal .info-box p { margin: 0; color: #555; font-size: .88rem; line-height: 1.8; }
  .nest-legal .info-box strong { color: #0f2145; }

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
