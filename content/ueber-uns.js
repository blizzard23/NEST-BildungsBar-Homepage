const html = `

<style>
/* Reset NUR innerhalb der About-Sektion (lässt Header/Footer unberührt) */
.nest-about, .nest-about *, .nest-about *::before, .nest-about *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Jost', sans-serif;
}

.nest-about { background: #ffffff; overflow-x: hidden; }

.nest-about .section-label,
.nest-about .section-label-light {
  display: block; font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: #EFA500; margin-bottom: 14px;
}

/* HERO */
.nest-about .about-hero { background: #0c1829; padding: 110px 40px 140px; position: relative; overflow: hidden; color: #fff; }
.nest-about .about-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 70px; background: #EFA500; clip-path: polygon(0 100%, 100% 35%, 100% 100%); }
.nest-about .about-hero::before { content: ''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: rgba(239,165,0,0.05); pointer-events: none; }
.nest-about .about-hero-inner { max-width: 860px; margin: 0 auto; }
.nest-about .about-hero h1 { font-size: clamp(34px, 5.5vw, 56px); font-weight: 800; line-height: 1.15; margin-bottom: 24px; color: #fff; }
.nest-about .about-hero h1 em { color: #EFA500; font-style: normal; }
.nest-about .about-hero p { font-size: clamp(15px, 2vw, 18px); max-width: 580px; line-height: 1.75; color: rgba(255,255,255,0.82); }

/* STORY */
.nest-about .story-section { background: #fff; padding: 90px 40px 80px; }
.nest-about .story-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
.nest-about .story-text h2 { font-size: clamp(26px, 3.8vw, 38px); font-weight: 800; color: #0F2145; line-height: 1.2; margin-bottom: 22px; }
.nest-about .story-text p { font-size: 15px; color: #666; line-height: 1.85; margin-bottom: 16px; }
.nest-about .story-text p:last-child { margin-bottom: 0; }
.nest-about .story-image-block { display: flex; flex-direction: column; gap: 16px; }
.nest-about .story-image-main { border-radius: 14px; overflow: hidden; box-shadow: 0 8px 32px rgba(15,33,69,0.13); }
.nest-about .story-image-main img { width: 100%; height: 380px; object-fit: cover; display: block; }
.nest-about .story-image-detail { border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15,33,69,0.10); }
.nest-about .story-image-detail img { width: 100%; height: 160px; object-fit: cover; display: block; transition: transform 0.4s ease; }
.nest-about .story-image-detail:hover img { transform: scale(1.04); }

/* QUOTE */
.nest-about .quote-section { background: #0F2145; padding: 80px 40px; text-align: center; }
.nest-about .quote-inner { max-width: 800px; margin: 0 auto; }
.nest-about .quote-mark { font-size: 96px; line-height: 0.5; color: #EFA500; font-weight: 900; display: block; margin-bottom: 28px; font-family: Georgia, serif; }
.nest-about .quote-text { font-size: clamp(20px, 3vw, 28px); font-weight: 600; color: #fff; line-height: 1.5; margin-bottom: 22px; font-style: italic; }
.nest-about .quote-source { font-size: 14px; color: rgba(255,255,255,0.55); font-weight: 600; letter-spacing: 0.5px; }

/* GRÜNDER */
.nest-about .founders-section { background: #F3F7F7; padding: 90px 40px 100px; }
.nest-about .founders-inner { max-width: 1100px; margin: 0 auto; }
.nest-about .founders-header { text-align: center; max-width: 600px; margin: 0 auto 60px; }
.nest-about .founders-header h2 { font-size: clamp(26px, 3.8vw, 38px); font-weight: 800; color: #0F2145; line-height: 1.2; margin-bottom: 14px; }
.nest-about .founders-header p { font-size: 16px; color: #666; line-height: 1.7; }
.nest-about .founders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.nest-about .founder-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 20px rgba(15,33,69,0.08); transition: box-shadow 0.25s ease, transform 0.25s ease; }
.nest-about .founder-card:hover { box-shadow: 0 8px 32px rgba(15,33,69,0.14); transform: translateY(-4px); }
.nest-about .founder-photo { width: 100%; aspect-ratio: 1/1; height: auto; object-fit: cover; object-position: top center; display: block; transition: transform 0.4s ease; }
.nest-about .founder-card:hover .founder-photo { transform: scale(1.03); }
.nest-about .founder-info { padding: 28px 28px 32px; }
.nest-about .founder-role { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #EFA500; display: block; margin-bottom: 8px; }
.nest-about .founder-name { font-size: 22px; font-weight: 800; color: #0F2145; margin-bottom: 14px; line-height: 1.2; }
.nest-about .founder-bio { font-size: 14px; color: #666; line-height: 1.85; }

/* STATS BAR */
.nest-about .stats-bar { background: #EFA500; padding: 44px 40px; }
.nest-about .stats-bar-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; }
.nest-about .stat-bar-number { font-size: 44px; font-weight: 900; color: #0F2145; line-height: 1; margin-bottom: 8px; }
.nest-about .stat-bar-label { font-size: 14px; color: rgba(15,33,69,0.75); font-weight: 600; line-height: 1.4; }

/* WERTE */
.nest-about .values-section { background: #fff; padding: 90px 40px; }
.nest-about .values-inner { max-width: 1100px; margin: 0 auto; }
.nest-about .values-header { max-width: 560px; margin-bottom: 56px; }
.nest-about .values-header h2 { font-size: clamp(26px, 3.8vw, 38px); font-weight: 800; color: #0F2145; margin-bottom: 14px; line-height: 1.2; }
.nest-about .values-header p { font-size: 16px; color: #666; line-height: 1.7; }
.nest-about .values-manifesto { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #dde3ec; border-left: 1px solid #dde3ec; }
.nest-about .value-manifesto-item { padding: 44px 40px; border-right: 1px solid #dde3ec; border-bottom: 1px solid #dde3ec; transition: background 0.25s ease; }
.nest-about .value-manifesto-item:hover { background: #F3F7F7; }
.nest-about .value-num { font-size: 72px; font-weight: 900; color: rgba(239,165,0,0.18); line-height: 1; display: block; margin-bottom: 20px; letter-spacing: -2px; transition: color 0.25s ease; }
.nest-about .value-manifesto-item:hover .value-num { color: rgba(239,165,0,0.38); }
.nest-about .value-manifesto-title { font-size: clamp(18px, 2vw, 22px); font-weight: 800; color: #0F2145; margin-bottom: 14px; line-height: 1.2; }
.nest-about .value-manifesto-text { font-size: 15px; color: #666; line-height: 1.8; }

/* TEAM */
.nest-about .team-section { background: #F3F7F7; padding: 90px 40px 100px; }
.nest-about .team-inner { max-width: 1100px; margin: 0 auto; }
.nest-about .team-section-header { margin-bottom: 56px; }
.nest-about .team-section-header h2 { font-size: clamp(24px, 3.5vw, 36px); font-weight: 800; color: #0F2145; margin-bottom: 10px; line-height: 1.2; }
.nest-about .team-section-header p { font-size: 16px; color: #666; line-height: 1.7; max-width: 520px; }
.nest-about .team-interactive { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
.nest-about .team-list-col { display: flex; flex-direction: column; gap: 6px; }
.nest-about .team-member-item { display: flex; align-items: center; gap: 20px; padding: 20px 24px; background: #fff; border-radius: 10px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 1px 6px rgba(15,33,69,0.05); user-select: none; }
.nest-about .team-member-item:hover { border-color: rgba(239,165,0,0.4); box-shadow: 0 4px 16px rgba(15,33,69,0.09); }
.nest-about .team-member-item.active { border-color: #EFA500; box-shadow: 0 4px 20px rgba(239,165,0,0.18); }
.nest-about .tm-indicator { width: 4px; height: 36px; border-radius: 2px; background: #dde3ec; flex-shrink: 0; transition: background 0.2s ease; }
.nest-about .team-member-item.active .tm-indicator,
.nest-about .team-member-item:hover .tm-indicator { background: #EFA500; }
.nest-about .tm-name { font-size: 16px; font-weight: 700; color: #0F2145; margin-bottom: 3px; }
.nest-about .tm-role { font-size: 13px; color: #999; font-weight: 500; transition: color 0.2s ease; }
.nest-about .team-member-item.active .tm-role { color: #EFA500; font-weight: 600; }
.nest-about .team-photo-col { position: sticky; top: 40px; }
.nest-about .team-photo-display { border-radius: 14px; overflow: hidden; background: #dce4f0; box-shadow: 0 8px 32px rgba(15,33,69,0.13); position: relative; }
.nest-about .team-photo-display img { width: 100%; aspect-ratio: 1/1; height: auto; object-fit: cover; object-position: top center; display: block; transition: opacity 0.25s ease; }
.nest-about .team-photo-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 28px 24px; background: linear-gradient(to top, rgba(15,33,69,0.88) 0%, transparent 100%); }
.nest-about .team-overlay-name { font-size: 20px; font-weight: 800; color: #fff; display: block; margin-bottom: 4px; transition: opacity 0.25s ease; }
.nest-about .team-overlay-role { font-size: 13px; font-weight: 600; color: #EFA500; letter-spacing: 0.5px; display: block; transition: opacity 0.25s ease; }
.nest-about .team-photo-display.fading img,
.nest-about .team-photo-display.fading .team-overlay-name,
.nest-about .team-photo-display.fading .team-overlay-role { opacity: 0; }

/* STANDORTE */
.nest-about .locations-section { background: #0F2145; padding: 80px 40px; }
.nest-about .locations-inner { max-width: 1100px; margin: 0 auto; }
.nest-about .locations-header { text-align: center; margin-bottom: 50px; }
.nest-about .locations-header h2 { font-size: clamp(24px, 3.5vw, 36px); font-weight: 800; color: #fff; margin-bottom: 12px; }
.nest-about .locations-header p { font-size: 16px; color: rgba(255,255,255,0.62); max-width: 500px; margin: 0 auto; line-height: 1.6; }
.nest-about .locations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.nest-about .location-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; display: flex; gap: 20px; align-items: flex-start; transition: background 0.2s ease; }
.nest-about .location-card:hover { background: rgba(255,255,255,0.09); }
.nest-about .location-accent { width: 6px; align-self: stretch; min-height: 70px; background: #EFA500; border-radius: 4px; flex-shrink: 0; }
.nest-about .location-city { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.nest-about .location-address { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.7; }
.nest-about .location-tag { display: inline-block; margin-top: 12px; background: rgba(239,165,0,0.18); color: #EFA500; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 12px; border-radius: 9999px; }

/* RESPONSIVE */
@media (max-width: 860px) {
  .nest-about .story-inner { grid-template-columns: 1fr; gap: 40px; }
  .nest-about .story-image-block { order: -1; }
  .nest-about .story-image-main img { height: 280px; }
  .nest-about .story-image-detail img { height: 130px; }
  .nest-about .founders-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  .nest-about .values-manifesto { grid-template-columns: 1fr; }
  .nest-about .team-interactive { grid-template-columns: 1fr; gap: 32px; }
  .nest-about .team-photo-col { position: static; order: -1; }
  .nest-about .team-photo-display img { height: 340px; }
}
@media (max-width: 768px) {
  .nest-about .about-hero { padding: 80px 24px 110px; }
  .nest-about .story-section, .nest-about .quote-section, .nest-about .founders-section,
  .nest-about .stats-bar, .nest-about .values-section, .nest-about .team-section,
  .nest-about .locations-section { padding-left: 24px; padding-right: 24px; }
  .nest-about .stats-bar-inner { grid-template-columns: 1fr; gap: 30px; }
  .nest-about .value-manifesto-item { padding: 32px 24px; }
  .nest-about .value-num { font-size: 52px; }
}
@media (max-width: 480px) {
  .nest-about .locations-grid { grid-template-columns: 1fr; }
  .nest-about .stat-bar-number { font-size: 36px; }
  .nest-about .team-member-item { padding: 16px 18px; }
}
</style>

<div class="nest-about">

  <!-- ======== HERO ======== -->
  <div class="about-hero">
    <div class="about-hero-inner">
      <span class="section-label">Über uns</span>
      <h1>Menschen, die<br>Ausbildung wirklich<br><em>verstehen.</em></h1>
      <p>Wir sind Patrick und Mike – zwei Menschen, die selbst als Azubis gestartet sind und heute wissen: Gute Ausbildung braucht mehr als Fachwissen. Sie braucht echte Begegnungen.</p>
    </div>
  </div>

  <!-- ======== STORY ======== -->
  <div class="story-section">
    <div class="story-inner">
      <div class="story-text">
        <span class="section-label">Wie alles begann</span>
        <h2>Ein gemeinsamer Ausflug. Eine Idee. Ein Ökosystem.</h2>
        <p>Bei einem gemeinsamen Ausflug während des Studiums entdeckten wir unsere Gemeinsamkeiten – und merkten schnell: Obwohl wir beide technische Ausbildungshintergründe haben, schlägt unser Herz für etwas anderes. Für Menschen. Für echte Orientierung. Für Ausbildung, die wirklich wirkt.</p>
        <p>Aus dieser Erkenntnis entstand die NEST BildungsBar – ein kostenfreies Beratungsangebot in Café Atmosphäre, das Schüler:innen unabhängig und auf Augenhöhe bei der Berufswahl begleitet. Heute hat sich daraus ein ganzes Ökosystem entwickelt: mit NEST Explore, AzubiConnect und über 500 begleiteten Schüler:innen pro Jahr.</p>
        <p>Wir verbinden Einrichtungen, Unternehmen und Schüler:innen zu einem starken Netzwerk und gestalten aktives Generationsmanagement, das Ausbildung gemeinsam voranbringt.</p>
      </div>
      <div class="story-image-block">
        <div class="story-image-main">
          <img src="/assets/img/team/story-patrick-mike.jpg" alt="NEST BildungsBar Patrick und Mike">
        </div>
        <div class="story-image-detail">
          <img src="/assets/img/team/bildungsbar-aussen.jpg" alt="NEST BildungsBar – Außenansicht">
        </div>
      </div>
    </div>
  </div>

  <!-- ======== QUOTE ======== -->
  <div class="quote-section">
    <div class="quote-inner">
      <span class="quote-mark">&ldquo;</span>
      <p class="quote-text">Gute Ausbildung lebt von Menschen,<br>die sich verstehen, unterstützen<br>und gemeinsam wachsen.</p>
      <span class="quote-source">Patrick Nekola-Ossé &amp; Mike Stoeck, Gründer NEST</span>
    </div>
  </div>

  <!-- ======== GRÜNDER ======== -->
  <div class="founders-section">
    <div class="founders-inner">
      <div class="founders-header">
        <span class="section-label">Die Gründer</span>
        <h2>Zwei, die es selbst erlebt haben.</h2>
        <p>Wir haben beide als Azubis angefangen und wissen aus eigener Erfahrung, was gute Ausbildung ausmacht – und wie Generationen erfolgreich zusammenarbeiten.</p>
      </div>
      <div class="founders-grid">

        <div class="founder-card">
          <div style="overflow:hidden;">
            <img class="founder-photo" src="/assets/img/team/patrick.jpg" alt="Patrick Nekola-Ossé">
          </div>
          <div class="founder-info">
            <span class="founder-role">Gründer &amp; Geschäftsführer</span>
            <h3 class="founder-name">Patrick Nekola-Ossé</h3>
            <p class="founder-bio">Patrick startete seine berufliche Laufbahn mit einer Ausbildung zum Elektriker und qualifizierte sich anschließend berufsbegleitend zum Elektrotechniker weiter. Im Unternehmen übernahm er früh Verantwortung in der Geschäftsleitung mit einem klaren Fokus auf das Thema Ausbildung. Zuletzt war er im Bereich Personalmanagement und Personalentwicklung tätig und hat dort insbesondere das Generationsmanagement im Unternehmen aktiv mitgestaltet und weiterentwickelt.</p>
          </div>
        </div>

        <div class="founder-card">
          <div style="overflow:hidden;">
            <img class="founder-photo" src="/assets/img/team/mike.jpg" alt="Mike Stoeck">
          </div>
          <div class="founder-info">
            <span class="founder-role">Gründer &amp; Geschäftsführer</span>
            <h3 class="founder-name">Mike Stoeck</h3>
            <p class="founder-bio">Mike startete seine berufliche Laufbahn mit einer Ausbildung zum Mechatroniker und entwickelte sich anschließend berufsbegleitend zum Elektrotechniker weiter. Bereits während seiner Ausbildung engagierte er sich als Jugendvertreter und setzte sich im Betriebsrat sowie in der Gewerkschaftsarbeit für junge Menschen ein. Im weiteren Verlauf übernahm er Verantwortung in der Begleitung von Nachwuchskräften und bringt seine Erfahrungen heute in Workshops und Coachings praxisnah, auf Augenhöhe und mit echter Leidenschaft ein.</p>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- ======== STATS BAR ======== -->
  <div class="stats-bar">
    <div class="stats-bar-inner">
      <div>
        <div class="stat-bar-number">500+</div>
        <div class="stat-bar-label">Schüler:innen begleitet pro Jahr</div>
      </div>
      <div>
        <div class="stat-bar-number">2021</div>
        <div class="stat-bar-label">Gründungsjahr in Wuppertal</div>
      </div>
      <div>
        <div class="stat-bar-number">4</div>
        <div class="stat-bar-label">Standorte: Wuppertal, Essen, Solingen &amp; Remscheid</div>
      </div>
    </div>
  </div>

  <!-- ======== WERTE ======== -->
  <div class="values-section">
    <div class="values-inner">
      <div class="values-header">
        <span class="section-label">Was uns ausmacht</span>
        <h2>Werte, die wir wirklich leben.</h2>
        <p>Keine leeren Versprechen – Grundsätze, nach denen wir täglich arbeiten.</p>
      </div>
      <div class="values-manifesto">
        <div class="value-manifesto-item">
          <span class="value-num">01</span>
          <h3 class="value-manifesto-title">Auf Augenhöhe</h3>
          <p class="value-manifesto-text">Wir begegnen Schüler:innen, Azubis und Ausbilder:innen respektvoll und offen – ohne Hierarchiedenken, ohne Schubladen. Jeder Mensch verdient echte Aufmerksamkeit.</p>
        </div>
        <div class="value-manifesto-item">
          <span class="value-num">02</span>
          <h3 class="value-manifesto-title">Echte Leidenschaft</h3>
          <p class="value-manifesto-text">Ausbildung ist nicht nur unser Job – sie ist unser Antrieb. Wir sind dabei, weil wir wirklich etwas verändern wollen. Das spüren alle, die mit uns arbeiten.</p>
        </div>
        <div class="value-manifesto-item">
          <span class="value-num">03</span>
          <h3 class="value-manifesto-title">Praxisnah &amp; konkret</h3>
          <p class="value-manifesto-text">Keine leeren Versprechen, keine generischen Konzepte. Wir entwickeln Lösungen, die im Ausbildungsalltag wirklich funktionieren – weil wir diesen Alltag selbst kennen.</p>
        </div>
        <div class="value-manifesto-item">
          <span class="value-num">04</span>
          <h3 class="value-manifesto-title">Nachhaltig wirksam</h3>
          <p class="value-manifesto-text">Wir denken langfristig – für Azubis, für Betriebe und für die Zukunft der Ausbildung in der Region. Wirkung, die bleibt, ist uns wichtiger als kurzfristige Ergebnisse.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ======== TEAM ======== -->
  <div class="team-section">
    <div class="team-inner">
      <div class="team-section-header">
        <span class="section-label">Das Team</span>
        <h2>Starke Köpfe hinter NEST.</h2>
        <p>Neben unseren Gründern arbeitet ein engagiertes Team täglich daran, das NEST-Ökosystem weiterzuentwickeln.</p>
      </div>

      <div class="team-interactive">

        <div class="team-list-col">
          <div class="team-member-item active"
            data-img="/assets/img/team/pascal.png"
            data-name="Pascal Lapuente" data-role="Berater">
            <div class="tm-indicator"></div>
            <div><div class="tm-name">Pascal Lapuente</div><div class="tm-role">Berater</div></div>
          </div>

          <div class="team-member-item"
            data-img="/assets/img/team/sarah.jpg"
            data-name="Sarah Dubois" data-role="Beraterin">
            <div class="tm-indicator"></div>
            <div><div class="tm-name">Sarah Dubois</div><div class="tm-role">Beraterin</div></div>
          </div>

          <div class="team-member-item"
            data-img="/assets/img/team/samuel.jpg"
            data-name="Samuel Baukhage" data-role="Berater">
            <div class="tm-indicator"></div>
            <div><div class="tm-name">Samuel Baukhage</div><div class="tm-role">Berater</div></div>
          </div>

          <div class="team-member-item"
            data-img="/assets/img/team/sevda.jpg"
            data-name="Sevda Askin" data-role="Sales- &amp; Marketing Managerin">
            <div class="tm-indicator"></div>
            <div><div class="tm-name">Sevda Askin</div><div class="tm-role">Sales- &amp; Marketing Managerin</div></div>
          </div>
        </div>

        <div class="team-photo-col">
          <div class="team-photo-display" id="teamPhotoDisplay">
            <img id="teamPhoto" src="/assets/img/team/pascal.png" alt="Pascal Lapuente">
            <div class="team-photo-overlay">
              <span class="team-overlay-name" id="teamOverlayName">Pascal Lapuente</span>
              <span class="team-overlay-role" id="teamOverlayRole">Berater</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- ======== STANDORTE ======== -->
  <div class="locations-section">
    <div class="locations-inner">
      <div class="locations-header">
        <span class="section-label-light">Wo ihr uns findet</span>
        <h2>Unsere Standorte</h2>
        <p>Vor Ort – nah an den Menschen, für die wir arbeiten.</p>
      </div>
      <div class="locations-grid">
        <div class="location-card">
          <div class="location-accent"></div>
          <div>
            <div class="location-city">Wuppertal</div>
            <div class="location-address">Hochstraße 65<br>42105 Wuppertal</div>
            <span class="location-tag">Unser Standort im Bergischen</span>
          </div>
        </div>
        <div class="location-card">
          <div class="location-accent"></div>
          <div>
            <div class="location-city">Essen</div>
            <div class="location-address">Kopstadtplatz 12<br>45127 Essen</div>
            <span class="location-tag">Unser Standort im Ruhrgebiet</span>
          </div>
        </div>
        <div class="location-card">
          <div class="location-accent"></div>
          <div>
            <div class="location-city">Solingen</div>
            <div class="location-address">Grünewalder Straße 29-31<br>42657 Solingen</div>
            <span class="location-tag">Im Gründerzentrum</span>
          </div>
        </div>
        <div class="location-card">
          <div class="location-accent"></div>
          <div>
            <div class="location-city">Remscheid</div>
            <div class="location-address">Hindenburgstraße 10a<br>42853 Remscheid</div>
            <span class="location-tag">In der Gründerschmiede</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>




`;
export default html;
