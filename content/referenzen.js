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
          <div class="hp-screen hp-screen--partner">
            <div class="hp-partner-topbar">
              <div class="hp-partner-label">Netzwerk</div>
              <div class="hp-partner-title">Unsere Partner</div>
              <div class="hp-partner-sub">70+ Unternehmen im Netzwerk</div>
            </div>
            <div class="hp-partner-grid">
              <div class="hp-partner-chip">Maier &amp; Söhne</div>
              <div class="hp-partner-chip">DigiSystems</div>
              <div class="hp-partner-chip">Rhenag</div>
              <div class="hp-partner-chip">TechWorks</div>
              <div class="hp-partner-chip">GreenCare</div>
              <div class="hp-partner-chip">Stadtwerke</div>
              <div class="hp-partner-chip hp-partner-chip--wide">+ 64 weitere Partner</div>
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
      </div>
      <div class="logo-strip reveal">
        <div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div>
        <div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div><div class="logo-chip">Partner-Logo</div>
      </div>
      <p class="text-center mt-2"><span class="badge-pill">Platzhalter – echte Partnerlogos einfügen</span></p>
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
