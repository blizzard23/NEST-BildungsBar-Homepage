import IC from "./icons";

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

  <!-- NESTplay · Handy-Mock + Liste -->
  <section class="bb-sec" id="nestplay">
    <div class="container">
      <div class="bb-head bb-head--center">
        <h2 class="bb-h2">NESTplay. – Berufsorientierung <span class="bb-hl">neu denken</span></h2>
        <p class="bb-lead">Mit NESTplay präsentieren Unternehmen ihren Betrieb direkt im Unterricht – als interaktives Live-Quiz, das Schüler:innen aktiviert und nachhaltig im Gedächtnis bleibt.</p>
      </div>
      <div class="bb-split">
        <div class="bb-phone" aria-hidden="true">
          <div class="bb-phone__screen">
            <div class="bb-phone__notch"></div>
            <span class="bb-badge bb-badge--soft" style="align-self:flex-start;">Live-Quiz · Frage 2 / 5</span>
            <div class="np-q"><small>Maier &amp; Söhne</small><b>Wie lange dauert die Ausbildung zum Mechatroniker?</b></div>
            <div class="np-answers"><span>2 Jahre</span><span class="is-right">3,5 Jahre</span><span>4 Jahre</span><span>5 Jahre</span></div>
            <div class="np-score"><span>Team Fuchs</span><b>20 Pkt.</b></div>
            <div class="np-rank">
              <div><span>Team Fuchs</span><b>40</b></div>
              <div><span>Team Wolf</span><b>35</b></div>
              <div><span>Team Adler</span><b>28</b></div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="bb-h2" style="font-size:clamp(24px,2.6vw,32px);">Spielerisch in die Klasse</h3>
          <p class="bb-lead" style="margin-top:14px;">Schüler:innen spielen ein Live-Quiz zu echten Unternehmen und lernen spielerisch alles über Ausbildungsberufe – kAoA-konform und vollständig gamifiziert.</p>
          <ul class="bb-ilist">
            <li><span class="bb-ilist__ic">${IC.people}</span><div><b>Die ganze Klasse spielt mit</b><span>Das Live-Quiz aktiviert alle Schüler:innen gleichzeitig.</span></div></li>
            <li><span class="bb-ilist__ic">${IC.target}</span><div><b>Unternehmen bleiben im Kopf</b><span>Statt Flyern erleben die Schüler:innen echte Betriebe aus der Region.</span></div></li>
            <li><span class="bb-ilist__ic">${IC.cap}</span><div><b>kAoA-konform</b><span>Für alle Schulstufen geeignet.</span></div></li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--ink" href="https://nest-play.de" target="_blank" rel="noopener">Zu NESTplay.</a></div>
        </div>
      </div>
    </div>
  </section>

  <!-- NEST EXPLORE · dunkle Sektion, Bild + Text -->
  <section class="bb-sec bb-sec--dark" id="nestmesse">
    <div class="container">
      <div class="bb-split bb-split--rev">
        <div class="bb-frame bb-frame--43"><img src="/assets/img/nest-explore.png" alt="NEST Explore – Schüler:innen entdecken Berufe an einem interaktiven NEST-Stand" loading="lazy"></div>
        <div>
          <h2 class="bb-h2">NEST Explore – Ausbildung <span class="bb-hl">live erleben</span></h2>
          <p class="bb-lead" style="margin-top:16px;">NEST Explore bringt regionale Unternehmen direkt in eure Schule – spielerisch, strukturiert und komplett von uns organisiert. Für Schulen kostenfrei.</p>
          <ul class="bb-bullets">
            <li>6 regionale Unternehmen kommen direkt in eure Schule</li>
            <li>Komplett von NEST organisiert – keine Vorbereitung nötig</li>
            <li>Spielerisches Format – aktiviert auch ruhige Schüler:innen</li>
            <li>Kostenfrei · ab Klasse 9 · 60 Min pro Klasse</li>
          </ul>
          <div class="bb-actions"><a class="bb-btn bb-btn--ink" href="https://nest-explore.de" target="_blank" rel="noopener">Zu NEST Explore</a></div>
        </div>
      </div>
    </div>
  </section>

  <!-- WORKSHOPS · Liste mit Trennlinien -->
  <section class="bb-sec" id="workshops">
    <div class="container">
      <div class="bb-head bb-head--row">
        <div>
          <h2 class="bb-h2">Konkrete Angebote für Schulen</h2>
          <p class="bb-lead" style="margin-top:14px;max-width:640px;">Unsere Workshops laufen 45–90 Minuten direkt bei euch in der Klasse oder als Tagesworkshop an der Junioruni.</p>
        </div>
      </div>
      <div class="bb-paths">
        <div class="bb-path">
          <span class="bb-path__ic">${IC.compass}</span>
          <div class="bb-path__title"><span class="bb-badge bb-badge--soft">45–90 Min.</span><b>Persönlichkeitscheck</b></div>
          <p class="bb-path__desc">„Welches Berufsfeld passt zu mir?“ – Schüler:innen lernen ihre Stärken kennen und entdecken passende Berufsperspektiven.</p>
          <a class="bb-btn bb-btn--light bb-btn--sm" href="/kontakt#termin">Anfragen</a>
        </div>
        <div class="bb-path">
          <span class="bb-path__ic">${IC.file}</span>
          <div class="bb-path__title"><span class="bb-badge bb-badge--soft">45–90 Min.</span><b>Bewerbungstraining</b></div>
          <p class="bb-path__desc">„Fit für die Jobsuche“ – von der Bewerbung bis zum Vorstellungsgespräch werden Schüler:innen praxisnah vorbereitet.</p>
          <a class="bb-btn bb-btn--light bb-btn--sm" href="/kontakt#termin">Anfragen</a>
        </div>
        <div class="bb-path">
          <span class="bb-path__ic">${IC.globe}</span>
          <div class="bb-path__title"><span class="bb-badge bb-badge--soft">Partner</span><b>Junioruni und regionale Partner</b></div>
          <p class="bb-path__desc">Unsere Workshops führen wir in Kooperation mit der Junioruni Wuppertal und der Junioruni Essen durch – als Tagesworkshop oder mehrstündiges Format. Zusätzlich arbeiten wir eng mit Schulen, der IHK und weiteren regionalen Bildungseinrichtungen zusammen.</p>
          <span></span>
        </div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Navy-Karte mit Gold-Kante -->
  <section class="bb-sec bb-sec--flush-top">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Workshop für Ihre Schule anfragen</h2>
          <p class="bb-lead">Bringen Sie moderne, erlebbare Berufsorientierung in Ihre Klassen. Wir freuen uns auf Ihre Anfrage.</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/kontakt#termin">Jetzt anfragen</a><a class="bb-btn bb-btn--light" href="/kooperation">Für Unternehmen</a></div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="mailto:info@nest-bildungsbar.de"><small>E-Mail</small><b>info@nest-bildungsbar.de</b></a><span>Schreiben Sie uns</span></div>
          <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Rufen Sie uns an</span></div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
