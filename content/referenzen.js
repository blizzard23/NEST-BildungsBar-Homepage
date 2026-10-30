import IC from "./icons";

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

  <!-- PARTNERARTEN · Spalten mit Trennlinien (Linear) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--split">
        <h2 class="bb-h2">Die Herausforderungen meistern wir <span class="bb-hl">gemeinsam</span></h2>
        <p class="bb-lead">Mit den folgenden Kooperationspartnern verbindet uns eine vertrauensvolle und langfristige Zusammenarbeit. Die Herausforderungen der modernen Ausbildung und Ausbildungssuche bewältigen wir am besten gemeinsam.</p>
      </div>
      <div class="bb-cols">
        <div class="bb-col"><span class="bb-col__ic">${IC.briefcase}</span><div class="bb-col__body"><h3>Unternehmen</h3><p>Regionale Betriebe aus Handwerk, Technik, Wirtschaft und mehr – unsere Basis für passgenaue Vernetzung.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.building}</span><div class="bb-col__body"><h3>Einrichtungen</h3><p>Bildungs- und soziale Einrichtungen, mit denen wir Hand in Hand junge Menschen begleiten.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.globe}</span><div class="bb-col__body"><h3>Institutionen</h3><p>Öffentliche Einrichtungen, Kammern und Verbände, die die Ausbildung in der Region mitgestalten und unterstützen.</p></div></div>
      </div>
    </div>
  </section>

  <!-- LOGOS · Logo-Raster (Linear „Customers") -->
  <section class="bb-sec bb-sec--band" id="partner">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Über 70 Partner im Netzwerk</h2>
        <p class="bb-lead">Ein Auszug aus den Unternehmen, Einrichtungen und Institutionen, mit denen wir zusammenarbeiten.</p>
      </div>

      <div class="bb-logos-group">
        <h3>Partner</h3>
        <div class="bb-logos">
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_00.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_01.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_02.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_03.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_04.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_05.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/bs-rollen.png" alt="BS Rollen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_07.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_08.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_09.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_10.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_11.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_12.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_13.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p2_14.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_00.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_01.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_02.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_03.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_04.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_05.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_06.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_07.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_08.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_09.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_10.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_11.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_12.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_13.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_14.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_15.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_16.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_17.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_18.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_19.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_20.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_21.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_22.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_23.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_24.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_25.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_26.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/stadtwerke-remscheid.png" alt="Stadtwerke Remscheid Verbund" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_28.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_29.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_30.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_31.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_32.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_33.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_34.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_35.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_36.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_37.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_38.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_39.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_40.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_41.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_42.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_43.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_44.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_45.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_46.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_47.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_48.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_49.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_50.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_51.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_52.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_53.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_54.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_55.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_56.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_58.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_59.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_60.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_61.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_62.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/p1_63.png" alt="Partnerunternehmen" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/vorwerk-autotec.png" alt="Vorwerk Autotec" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/diakonische-altenhilfe-wuppertal.png" alt="Diakonische Altenhilfe Wuppertal" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/schulten.png" alt="Schulten Gebäudedienste" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/partner/jc-koenig.png" alt="J.C. König Präzisions-Tiefziehteile" loading="lazy"></div>
        </div>
      </div>

      <div class="bb-logos-group">
        <h3>Einrichtungen</h3>
        <div class="bb-logos">
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_01.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_02.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_03.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_04.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_05.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_06.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_07.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e1_08.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_00.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_01.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_02.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_03.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_04.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_05.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_06.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_07.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_08.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_09.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_10.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e2_11.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_00.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_01.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_02.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_03.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_04.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_05.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_06.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_07.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_08.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_09.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
          <div class="bb-logo"><img src="/assets/img/referenzen/einrichtungen/e3_10.png" alt="Einrichtung im NEST-Netzwerk" loading="lazy"></div>
        </div>
      </div>

      <div class="bb-logos-group">
        <h3>Gesundheitspartner</h3>
        <div class="bb-logos">
          <div class="bb-logo"><img src="/assets/img/referenzen/gesundheit/aok.png" alt="AOK – Gesundheitspartner" loading="lazy"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Navy-Karte mit Gold-Kante -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Werdet Teil unseres Netzwerks</h2>
          <p class="bb-lead">Erfolg braucht starke Partner. Lasst uns gemeinsam die Ausbildung von morgen gestalten.</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/kooperation">Partner werden</a><a class="bb-btn bb-btn--light" href="/kontakt">Kontakt aufnehmen</a></div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="mailto:info@nest-bildungsbar.de"><small>E-Mail</small><b>info@nest-bildungsbar.de</b></a><span>Schreibt uns</span></div>
          <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Ruft uns an</span></div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
