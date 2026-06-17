const IC = {
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  institution: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
};

const html = `

  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Referenzen</span>
        <h1>Erfolg braucht<br /><em>starke Partner!</em></h1>
        <p class="lead">Die Vernetzung mit zuverlässigen und innovativen Unternehmen ist ein wesentlicher Baustein für den Erfolg von NEST und die hochwertige Betreuung junger Menschen bei ihrem beruflichen Werdegang.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/kooperation">Partner werden →</a>
          <a class="btn btn-ghost" href="#partner">Partner ansehen</a>
        </div>
      </div>
      <div class="hero-visual hero-visual--phone">
        <div class="hero-phone">
          <span class="hp-notch"></span>
          <div class="hp-screen">
            <span class="hp-badge">Netzwerk</span>
            <div class="hp-title">70+ Partner</div>
            <div class="hp-search">Partner suchen …</div>
            <div class="hp-chips">
              <span class="hp-chip hp-chip--on">Alle</span>
              <span class="hp-chip">Handwerk</span>
              <span class="hp-chip">IT</span>
              <span class="hp-chip">Karriere</span>
            </div>
            <div class="hp-grid">
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#0F2145,#162d5e);display:flex;align-items:center;justify-content:center;"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EFA500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div><span class="hp-name">Maier &amp; Söhne</span></div>
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#1a8550,#1f9d63);display:flex;align-items:center;justify-content:center;"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/></svg></div><span class="hp-name">DigiSystems</span></div>
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#b06800,#EFA500);display:flex;align-items:center;justify-content:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg></div><span class="hp-name">Rhenag</span></div>
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#4a3fc5,#6c5fd3);display:flex;align-items:center;justify-content:center;"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"/><circle cx="12" cy="12" r="2.6" fill="#fff" stroke="none"/></svg></div><span class="hp-name">TechWorks</span></div>
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#c2415a,#e05573);display:flex;align-items:center;justify-content:center;"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4" fill="#fff" stroke="none"/><line x1="12" y1="3.2" x2="12" y2="9.6"/><line x1="4.6" y1="16.5" x2="9.9" y2="13.5"/><line x1="19.4" y1="16.5" x2="14.1" y2="13.5"/></svg></div><span class="hp-name">KFZ-Welt</span></div>
              <div class="hp-card"><div style="height:46px;background:linear-gradient(135deg,#1a6070,#2a8fa8);display:flex;align-items:center;justify-content:center;"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 20h18L12 3z"/><line x1="8" y1="14" x2="16" y2="14"/></svg></div><span class="hp-name">ATC GmbH</span></div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  </section>

  <section class="bg-white">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Gemeinsam stark</span>
        <h2>Die Herausforderungen meistern wir gemeinsam</h2>
        <p>Mit den folgenden Kooperationspartnern verbindet uns eine vertrauensvolle und langfristige Zusammenarbeit. Die Herausforderungen der modernen Ausbildung und Ausbildungssuche bewältigen wir am besten gemeinsam.</p>
      </div>
      <div class="card-grid cols-3" id="partner">
        <div class="card reveal"><div class="icon icon-svg">${IC.briefcase}</div><h3>Unternehmen</h3><p>Regionale Betriebe aus Handwerk, Technik, Wirtschaft und mehr – unsere Basis für passgenaue Vernetzung.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.building}</div><h3>Einrichtungen</h3><p>Bildungs- und soziale Einrichtungen, mit denen wir Hand in Hand junge Menschen begleiten.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.institution}</div><h3>Institutionen</h3><p>Öffentliche Einrichtungen, Kammern und Verbände, die die Ausbildung in der Region mitgestalten und unterstützen.</p></div>
      </div>
    </div>
  </section>

  <section class="bg-light">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Vertrauensvolle Zusammenarbeit</span>
        <h2>Über 70 Partner im Netzwerk</h2>
        <p>Ein Auszug aus den Unternehmen, Einrichtungen und Institutionen, mit denen wir zusammenarbeiten – klick für die jeweilige Karriereseite.</p>
      </div>
      <div class="logo-wall reveal">
        <a class="logo-wall-item" href="https://career-vorwerkgroups.com/" target="_blank" rel="noopener">Vorwerk</a>
        <a class="logo-wall-item" href="https://www.die-lehre-deines-lebens.de/" target="_blank" rel="noopener">KNIPEX</a>
        <a class="logo-wall-item" href="https://stahlwille.com/de_de/karriere/ausbildung/6c637dad" target="_blank" rel="noopener">STAHLWILLE</a>
        <a class="logo-wall-item" href="https://www.schmersal.com/karriere/ausbildung" target="_blank" rel="noopener">Schmersal</a>
        <a class="logo-wall-item" href="https://jobs.vaillant-group.com/content/schueler/?locale=de_DE" target="_blank" rel="noopener">Vaillant</a>
        <a class="logo-wall-item" href="https://jobs.coroplast.de/" target="_blank" rel="noopener">Coroplast</a>
        <a class="logo-wall-item" href="https://karriere.barmenia.blog/innendienst/ausbildung/" target="_blank" rel="noopener">Barmenia</a>
        <a class="logo-wall-item" href="https://karriere.ede.de/Ausbildung" target="_blank" rel="noopener">E/D/E</a>
        <a class="logo-wall-item" href="https://www.wsw-online.de/ueber-uns/karriere/ausbildung/ausbildungsangebote/" target="_blank" rel="noopener">Wuppertaler Stadtwerke</a>
        <a class="logo-wall-item" href="https://sparkasse.mein-check-in.de/sparkasse-wuppertal" target="_blank" rel="noopener">Stadtsparkasse Wuppertal</a>
        <a class="logo-wall-item" href="https://www.wuppertal.de/microsite/wuppertalent/ausbildungsberufe/" target="_blank" rel="noopener">Stadt Wuppertal</a>
        <a class="logo-wall-item" href="https://karriere.essen.de/" target="_blank" rel="noopener">Stadt Essen</a>
        <a class="logo-wall-item" href="https://www.helios-gesundheit.de/kliniken/wuppertal/unser-haus-karriere-presse/karriere/stellenangebote/" target="_blank" rel="noopener">Helios Kliniken</a>
        <a class="logo-wall-item" href="https://www.gepa.de/karriere/ausbildung" target="_blank" rel="noopener">GEPA</a>
        <a class="logo-wall-item" href="https://www.wut.de/jobs/" target="_blank" rel="noopener">Wiesemann &amp; Theis</a>
        <a class="logo-wall-item" href="https://www.wkw.de/karriere/ausbildung-1/unsere-ausbildungsberufe" target="_blank" rel="noopener">WKW Group</a>
        <a class="logo-wall-item" href="https://www.minimax.com/de/de/karriere/ausbildung-bei-minimax/" target="_blank" rel="noopener">Minimax</a>
        <a class="logo-wall-item" href="https://www.wupperverband.de/ueber-uns/personal/ausbildung" target="_blank" rel="noopener">Wupperverband</a>
        <a class="logo-wall-item" href="https://www.bergische-volksbank.de/karriere/ausbildung_duales_studium.html" target="_blank" rel="noopener">Volksbank im Bergischen Land</a>
        <a class="logo-wall-item" href="https://rundum-akzenta.de/karriere/ausbildung/" target="_blank" rel="noopener">akzenta</a>
        <a class="logo-wall-item" href="https://www.radprax.de/karriere/ausbildung-bei-radprax/" target="_blank" rel="noopener">radprax</a>
        <a class="logo-wall-item" href="https://karriere.wuppertal.de/jobs" target="_blank" rel="noopener">Jobcenter Wuppertal</a>
      </div>
      <p class="text-center mt-2" style="color:var(--text-mute);font-size:13px;">… und über 50 weitere Partner aus Wuppertal, Essen und der Region.</p>
    </div>
  </section>

  <section class="cta-section on-white">
    <div class="container"><div class="cta-inner">
      <span class="section-label" style="display:flex;justify-content:center;">Gemeinsam für die Ausbildung</span>
      <h2>Werdet Teil unseres <em>Netzwerks</em></h2>
      <p>Erfolg braucht starke Partner. Lasst uns gemeinsam die Ausbildung von morgen gestalten.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="/kooperation">Partner werden</a>
        <a class="btn btn-ghost" href="/kontakt">Kontakt aufnehmen</a>
      </div>
    </div></div>
  </section>


`;
export default html;
