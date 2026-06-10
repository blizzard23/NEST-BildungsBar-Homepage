const IC = {
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="12" r="1"/><circle cx="18" cy="10" r="1"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Schulen</span>
        <h1>Der Weg zum Beruf<br /><em>jugendgerecht &amp; wirksam</em></h1>
        <p class="lead">Wir unterstützen Schulen bei der Erfüllung der kAoA-Kriterien – mit modernen, spielerischen Workshops auf Augenhöhe mit den Schüler:innen.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/kontakt#termin">Workshop anfragen →</a>
          <a class="btn btn-ghost" href="#nestplay">NESTplay entdecken</a>
        </div>
      </div>
      <div class="hero-visual hero-visual--phone">
        <a class="hero-phone" href="#nestplay" aria-label="NESTplay – Gamifizierte Berufsorientierung">
          <span class="hp-notch"></span>
          <div class="hp-screen">
            <span class="hp-badge">NESTplay</span>
            <div class="hp-title">Live-Quiz · Klasse 9b</div>
            <div class="hp-chips">
              <span class="hp-chip hp-chip--on">Live-Quiz</span>
              <span class="hp-chip">Ergebnisse</span>
            </div>
            <div style="background:#fff;border-radius:9px;padding:8px;margin-top:2px;">
              <div style="font-size:8px;font-weight:700;color:var(--gold-dark);letter-spacing:1px;margin-bottom:3px;">FRAGE 3 / 5</div>
              <div style="font-size:10px;font-weight:700;color:var(--navy);line-height:1.4;">Wie lange dauert die Ausbildung zum Mechatroniker?</div>
            </div>
            <div class="hp-grid" style="gap:5px;margin-top:4px;">
              <div style="background:rgba(194,65,90,0.15);color:#c2415a;border-radius:8px;padding:7px 6px;font-size:9px;font-weight:800;text-align:center;">2 Jahre</div>
              <div style="background:var(--navy);color:var(--gold);border-radius:8px;padding:7px 6px;font-size:9px;font-weight:800;text-align:center;">3,5 Jahre ✓</div>
              <div style="background:#fff;border:1px solid var(--line);color:var(--text-mute);border-radius:8px;padding:7px 6px;font-size:9px;font-weight:700;text-align:center;">4 Jahre</div>
              <div style="background:#fff;border:1px solid var(--line);color:var(--text-mute);border-radius:8px;padding:7px 6px;font-size:9px;font-weight:700;text-align:center;">5 Jahre</div>
            </div>
            <div style="background:var(--navy);border-radius:8px;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:8.5px;color:rgba(255,255,255,0.6);">Team Fuchs</span>
              <span style="font-size:12px;font-weight:900;color:var(--gold);">40 Pkt.</span>
            </div>
            <div style="background:#fff;border-radius:8px;padding:7px 8px;display:flex;flex-direction:column;gap:4px;">
              <div style="font-size:7.5px;font-weight:800;color:var(--text-mute);letter-spacing:1px;text-transform:uppercase;margin-bottom:1px;">Rangliste</div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;">
                <span style="font-weight:700;color:var(--navy);">🥇 Team Fuchs</span>
                <span style="font-weight:900;color:var(--gold-dark);">40 Pkt.</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;">
                <span style="font-weight:700;color:var(--navy);">🥈 Team Wolf</span>
                <span style="font-weight:700;color:var(--text-soft);">35 Pkt.</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;">
                <span style="font-weight:700;color:var(--navy);">🥉 Team Adler</span>
                <span style="font-weight:700;color:var(--text-soft);">28 Pkt.</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div></div>
  </section>

  <!-- ====== NESTplay ====== -->
  <section class="bg-white" id="nestplay">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label" style="color:var(--gold-dark);">Innovation</span>
        <h2>NESTplay. – Berufsorientierung <em>neu denken</em></h2>
        <p>Mit NESTplay präsentieren Unternehmen ihren Betrieb direkt im Unterricht – als interaktives Live-Quiz, das Schüler:innen aktiviert und nachhaltig im Gedächtnis bleibt.</p>
      </div>

      <div class="split" style="margin-bottom:0;">
        <div class="split-media" style="background:none;">
          <div class="wf-feat-media">
            <div class="np-mini-phone" style="width:200px;">
              <div class="np-phone-screen">
                <div class="np-phone-head" style="padding:22px 12px 12px;">
                  <div class="np-phone-pl">NESTplay · Frage 2/5</div>
                  <div class="np-phone-h4" style="font-size:13px;">Maier &amp; Söhne</div>
                </div>
                <div class="np-phone-body" style="padding:10px;">
                  <div class="np-phone-q">Wie lange dauert die Ausbildung zum Mechatroniker?</div>
                  <div class="np-phone-opts">
                    <div class="np-phone-opt np-o-a">2 Jahre</div>
                    <div class="np-phone-opt np-o-b">3,5 Jahre</div>
                    <div class="np-phone-opt np-o-c">4 Jahre</div>
                    <div class="np-phone-opt np-o-d">5 Jahre</div>
                  </div>
                  <div style="background:var(--navy);padding:8px 10px;display:flex;justify-content:space-between;margin-top:8px;border-radius:6px;">
                    <span style="font-size:9px;color:rgba(255,255,255,0.5);">Team Fuchs</span>
                    <b style="font-size:11px;color:#EFA500;font-weight:900;">20 Pkt.</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="split-text reveal">
          <span class="section-label">Für Schulen &amp; Unternehmen</span>
          <h2>Spielerisch in <em>die Klasse</em></h2>
          <p>Schüler:innen spielen ein Live-Quiz zu echten Unternehmen und lernen spielerisch alles über Ausbildungsberufe – kAoA-konform und vollständig gamifiziert.</p>
          <ul class="list-check">
            <li>Live-Quiz aktiviert die gesamte Klasse</li>
            <li>Unternehmen bleiben im Kopf – nicht Flyer</li>
            <li>Kursformat: 45–90 Minuten direkt an der Schule</li>
            <li>Tagesworkshop auch an der Junioruni möglich</li>
            <li>kAoA-konform für alle Schulstufen</li>
          </ul>
          <a class="btn btn-primary mt-2" href="https://nestplay.de" target="_blank" rel="noopener">Zu NESTplay. →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== NEST MESSE ====== -->
  <section class="bg-light" id="nestmesse" style="padding-top:80px;">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Ausbildungsmesse</span>
        <h2>NEST Messe – Ausbildung <em>live erleben</em></h2>
        <p>Die NEST Messe bringt Schüler:innen, Schulen und Unternehmen zusammen – ein besonderes Format für echte Begegnungen auf Augenhöhe.</p>
      </div>

      <div class="split rev" style="margin-bottom:0;">
        <div class="split-text reveal">
          <span class="section-label">Messe-Format</span>
          <h2>Wo Berufe <em>lebendig werden</em></h2>
          <p>Auf der NEST Messe präsentieren regionale Unternehmen ihre Ausbildungsberufe – interaktiv, persönlich und für Schüler:innen wirklich erlebbar.</p>
          <ul class="list-check">
            <li>Direkter Kontakt zu 70+ Ausbildungsunternehmen</li>
            <li>Interaktive Berufsfelder zum Anfassen</li>
            <li>Ideal für Klassen-Ausflüge und Schulgruppen</li>
            <li>Termine vorab buchbar für Schulen</li>
          </ul>
          <a class="btn btn-navy mt-2" href="/kontakt#termin">Schultermin anfragen →</a>
        </div>
        <div class="split-media" style="background:none;">
          <div class="wf-laptop-outer" style="transform:perspective(1200px) rotateY(8deg);">
            <div class="wf-laptop" style="transform:none;">
              <div class="wf-lap-screen">
                <div class="br-bar">
                  <div class="br-dots"><div class="br-dot br-dot-r"></div><div class="br-dot br-dot-y"></div><div class="br-dot br-dot-g"></div></div>
                  <div class="br-url">nest-messe.de</div>
                </div>
                <div class="lap-app">
                  <div class="lap-header" style="background:var(--navy);">
                    <div class="lap-logo" style="background:#162d5e;color:#EFA500;font-weight:900;font-size:10px;">M</div>
                    <div><div class="lap-co-name" style="color:#fff;">NEST Messe</div><div class="lap-co-jobs" style="color:rgba(255,255,255,0.5);">Ausbildungsmesse Wuppertal</div></div>
                    <div class="lap-tabs">
                      <div class="lap-tab--active lap-tab" style="color:#EFA500;border-color:#EFA500;">Aussteller</div>
                      <div class="lap-tab" style="color:rgba(255,255,255,0.35);">Programm</div>
                    </div>
                  </div>
                  <div class="lap-body">
                    <div class="la-label" style="color:#EFA500;">25 Aussteller · Halle 3</div>
                    <div class="la-job"><div class="ji" style="background:var(--navy);color:#EFA500;font-weight:900;font-size:13px;">M</div><div class="jt"><strong>Maier &amp; Söhne</strong><span>Mechatronik · Elektro</span></div><div class="jb">Besuchen</div></div>
                    <div class="la-job"><div class="ji" style="background:#162d5e;color:#EFA500;font-weight:900;font-size:13px;">D</div><div class="jt"><strong>DigiSystems</strong><span>IT · Digitalisierung</span></div><div class="jb">Besuchen</div></div>
                  </div>
                </div>
              </div>
              <div class="wf-lap-base"></div><div class="wf-lap-foot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== WORKSHOPS ====== -->
  <section class="bg-white" id="workshops" style="padding-top:80px;">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Workshops</span>
        <h2>Konkrete Angebote <em>für Schulen</em></h2>
        <p>Unsere Workshops laufen 45–90 Minuten direkt bei euch in der Klasse oder als Tagesworkshop an der Junioruni.</p>
      </div>

      <div class="card-grid cols-2">
        <div class="card reveal"><div class="icon icon-svg">${IC.compass}</div><h3>Persönlichkeitscheck</h3><p>„Welches Berufsfeld passt zu mir?" – Schüler:innen lernen ihre Stärken kennen und entdecken passende Berufsperspektiven.</p><span class="badge">Berufsorientierung</span><span class="badge" style="margin-left:6px;background:rgba(239,165,0,0.1);color:var(--gold-dark);">45–90 Min.</span></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.briefcase}</div><h3>Bewerbungstraining</h3><p>„Fit für die Jobsuche" – von der Bewerbung bis zum Vorstellungsgespräch werden Schüler:innen praxisnah vorbereitet.</p><span class="badge">Bewerbung</span><span class="badge" style="margin-left:6px;background:rgba(239,165,0,0.1);color:var(--gold-dark);">45–90 Min.</span></div>
      </div>

      <div style="background:var(--bg-light);border-radius:14px;padding:28px 32px;margin-top:20px;" class="reveal">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div class="icon icon-svg" style="flex-shrink:0;">${IC.globe}</div>
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold-dark);margin-bottom:4px;">Enge Zusammenarbeit</div>
            <h3 style="margin:0 0 6px;font-size:18px;">Junioruni Wuppertal &amp; Regionale Partner</h3>
            <p style="margin:0;color:var(--text-soft);font-size:14px;">Unsere Workshops führen wir in Kooperation mit der Junioruni Wuppertal durch – als Tagesworkshop oder mehrstündiges Format. Zusätzlich arbeiten wir eng mit Schulen, der IHK und weiteren regionalen Bildungseinrichtungen zusammen.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section on-white">
    <div class="container"><div class="cta-inner">
      <span class="section-label" style="display:flex;justify-content:center;">Für Lehrkräfte</span>
      <h2>Workshop für Ihre <em>Schule</em> anfragen</h2>
      <p>Bringen Sie moderne, erlebbare Berufsorientierung in Ihre Klassen. Wir freuen uns auf Ihre Anfrage.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="/kontakt#termin">Jetzt anfragen</a>
        <a class="btn btn-ghost" href="/kooperation">Für Unternehmen</a>
      </div>
    </div></div>
  </section>


`;
export default html;
