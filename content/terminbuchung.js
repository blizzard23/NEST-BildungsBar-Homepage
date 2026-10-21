const IC = {
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  euro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 7a7 7 0 1 0 0 10"/><line x1="4" y1="10" x2="13" y2="10"/><line x1="4" y1="14" x2="13" y2="14"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
};

const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Termin buchen</span>
        <h1>Sichere dir deinen<br /><em>Beratungstermin</em></h1>
        <p class="lead">Kostenfrei, locker und auf Augenhöhe – wähl einfach Standort, Tag und Uhrzeit. Wir beraten dich in Wuppertal (Di &amp; Do), in Essen (ab Oktober Mo), in Solingen (Mo) und in Remscheid (Mi) – jeweils von 17 bis 19 Uhr.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#buchen">Jetzt Termin wählen →</a>
          <a class="btn btn-ghost" href="#anfrage">Lieber anfragen</a>
        </div>
      </div>
      <div class="hero-visual hero-visual--phone">
        <div class="hero-phone">
          <span class="hp-notch"></span>
          <div class="hp-screen">
            <span class="hp-badge">Termine</span>
            <div class="hp-title">Wähle deinen Termin</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin:2px 0 6px;">
              <span style="font-size:9px;font-weight:800;color:var(--navy);">Juni 2026</span>
              <div style="display:flex;gap:4px;font-size:10px;color:var(--text-mute);">&#8249; &#8250;</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:5px;">
              <span style="text-align:center;font-size:9px;font-weight:800;color:var(--navy);background:#f4f5f7;border-radius:5px;padding:3px 0;">Di</span>
              <span style="text-align:center;font-size:9px;font-weight:800;color:var(--navy);background:#f4f5f7;border-radius:5px;padding:3px 0;">Do</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;flex:1;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                <div style="background:#d4eddf;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #a8dfc0;">
                  <div style="font-size:14px;font-weight:900;color:#1a8550;line-height:1;">3</div>
                  <div style="font-size:7px;font-weight:700;color:#1a8550;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
                <div style="background:#d4eddf;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #a8dfc0;">
                  <div style="font-size:14px;font-weight:900;color:#1a8550;line-height:1;">5</div>
                  <div style="font-size:7px;font-weight:700;color:#1a8550;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                <div style="background:#fdeaed;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #f5b0bc;">
                  <div style="font-size:14px;font-weight:900;color:#c2415a;line-height:1;">10</div>
                  <div style="font-size:7px;font-weight:700;color:#c2415a;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
                <div style="background:#fef3d0;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #f5d98a;">
                  <div style="font-size:14px;font-weight:900;color:#b06800;line-height:1;">12</div>
                  <div style="font-size:7px;font-weight:700;color:#b06800;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                <div style="background:#d4eddf;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #a8dfc0;">
                  <div style="font-size:14px;font-weight:900;color:#1a8550;line-height:1;">17</div>
                  <div style="font-size:7px;font-weight:700;color:#1a8550;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
                <div style="background:var(--navy);border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid var(--navy);">
                  <div style="font-size:14px;font-weight:900;color:var(--gold);line-height:1;">19</div>
                  <div style="font-size:7px;font-weight:700;color:rgba(239,165,0,0.7);text-transform:uppercase;">Jun</div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                <div style="background:#d4eddf;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #a8dfc0;">
                  <div style="font-size:14px;font-weight:900;color:#1a8550;line-height:1;">24</div>
                  <div style="font-size:7px;font-weight:700;color:#1a8550;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
                <div style="background:#d4eddf;border-radius:7px;padding:6px 4px;text-align:center;border:1.5px solid #a8dfc0;">
                  <div style="font-size:14px;font-weight:900;color:#1a8550;line-height:1;">26</div>
                  <div style="font-size:7px;font-weight:700;color:#1a8550;opacity:0.7;text-transform:uppercase;">Jun</div>
                </div>
              </div>
            </div>
            <div style="background:var(--gold-soft);border-radius:8px;padding:7px 10px;display:flex;align-items:center;gap:8px;margin-top:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span style="font-size:9px;font-weight:700;color:var(--gold-dark);">Do, 19. Juni · 17:00 Uhr</span>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  </section>

  <!-- SO LÄUFT'S -->
  <section class="bg-white">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">So einfach geht's</span>
          <h2>In wenigen Klicks zum Termin</h2>
        </div>
        <p>Kein langes Formular, kein Account. Du wählst aus, was dir passt – den Rest klären wir gemeinsam vor Ort.</p>
      </div>
      <ol class="steps-track">
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">01</span><span class="step-ic">${IC.pin}</span></div>
          <h3>Standort wählen</h3>
          <p>Wuppertal, Essen, Solingen oder Remscheid – such dir aus, wo du uns am liebsten triffst.</p>
          <span class="step-meta">4 Standorte</span>
        </li>
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">02</span><span class="step-ic">${IC.calendar}</span></div>
          <h3>Tag &amp; Uhrzeit</h3>
          <p>Je nach Standort sind wir montags bis donnerstags da. Pick dir einen freien Slot.</p>
          <span class="step-meta">17–19 Uhr</span>
        </li>
        <li class="step-card reveal">
          <div class="step-top"><span class="step-no">03</span><span class="step-ic">${IC.user}</span></div>
          <h3>Kurz Daten rein</h3>
          <p>Name &amp; E-Mail genügen. Wir bestätigen deinen Termin schnellstmöglich.</p>
          <span class="step-meta">Kein Account nötig</span>
        </li>
      </ol>
    </div>
  </section>

  <!-- BUCHUNG -->
  <section class="bg-light tb-section" id="buchen">
    <div class="container">
      <div class="home-head reveal">
        <div class="home-head-main">
          <span class="section-label">Dein Termin</span>
          <h2>Wähl deinen Wunschtermin</h2>
        </div>
        <p class="tb-head-note"><span class="tb-head-note-ic">${IC.clock}</span>Wir sind oft weit im Voraus ausgebucht – bitte frühzeitig buchen.</p>
      </div>

      <div class="termin-wrap" id="termin-app">

        <!-- Fortschritt: rein per CSS (:has) aus dem Zustand der Schritte abgeleitet -->
        <ol class="tb-progress" aria-hidden="true">
          <li class="tb-prog tb-prog--ort"><span class="tb-prog-dot"></span><span class="tb-prog-label">Standort</span></li>
          <li class="tb-prog tb-prog--tag"><span class="tb-prog-dot"></span><span class="tb-prog-label">Tag</span></li>
          <li class="tb-prog tb-prog--zeit"><span class="tb-prog-dot"></span><span class="tb-prog-label">Uhrzeit</span></li>
          <li class="tb-prog tb-prog--daten"><span class="tb-prog-dot"></span><span class="tb-prog-label">Deine Daten</span></li>
        </ol>

        <form id="termin-form">
          <div id="tb-formcard">
            <div class="tb-grid">

              <div class="tb-main">
                <!-- Schritt 1: Standort -->
                <div class="tb-step" id="step-ort">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.pin}</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 1</span><h3>Wo möchtest du uns treffen?</h3></div></div>
                  <div class="tb-choices">
                    <button type="button" class="tb-ort" data-ort="Wuppertal" data-adr="Hochstraße 65, 42105 Wuppertal">
                      <span class="o-photo"><img src="/assets/img/standort-wuppertal.jpg" alt="" loading="lazy"></span>
                      <span class="o-text">
                        <span class="o-header-label">Wuppertal</span>
                        <span class="o-adr">Hochstraße 65 · 42105 Wuppertal</span>
                        <span class="o-header-badge">Di &amp; Do · 17–19 Uhr</span>
                      </span>
                      <span class="o-radio" aria-hidden="true"></span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Essen" data-adr="Kopstadtplatz 12, 45127 Essen">
                      <span class="o-photo"><img src="/assets/img/standort-essen.png" alt="" loading="lazy"></span>
                      <span class="o-text">
                        <span class="o-header-label">Essen</span>
                        <span class="o-adr">Kopstadtplatz 12 · 45127 Essen</span>
                        <span class="o-header-badge">ab Okt. Mo · 17–19 Uhr</span>
                      </span>
                      <span class="o-radio" aria-hidden="true"></span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Solingen" data-adr="Grünewalder Straße 29-31, 42657 Solingen (im Gründerzentrum)">
                      <span class="o-photo"><img src="/assets/img/standort-solingen.jpg" alt="" loading="lazy"></span>
                      <span class="o-text">
                        <span class="o-header-label">Solingen</span>
                        <span class="o-adr">Grünewalder Straße 29-31 · 42657 Solingen<small>im Gründerzentrum</small></span>
                        <span class="o-header-badge">Mo · 17–19 Uhr</span>
                      </span>
                      <span class="o-radio" aria-hidden="true"></span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Remscheid" data-adr="Hindenburgstraße 10a, 42853 Remscheid (in der Gründerschmiede)">
                      <span class="o-photo"><img src="/assets/img/standort-remscheid.webp" alt="" loading="lazy"></span>
                      <span class="o-text">
                        <span class="o-header-label">Remscheid</span>
                        <span class="o-adr">Hindenburgstraße 10a · 42853 Remscheid<small>in der Gründerschmiede</small></span>
                        <span class="o-header-badge">Mi · 17–19 Uhr</span>
                      </span>
                      <span class="o-radio" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>

                <!-- Schritt 2: Monat & Datum (Kalender) -->
                <div class="tb-step tb-locked" id="step-date">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.calendar}</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 2</span><h3>Welcher Tag passt?</h3></div><span class="tb-hint" id="tb-day-hint">je nach Standort</span></div>

                  <!-- Monatskalender -->
                  <div class="tb-cal-wrap">
                    <div class="tb-cal-nav" id="tb-cal-nav">
                      <button type="button" class="tb-cal-btn" id="tb-cal-prev" aria-label="Vorheriger Monat">&#8249;</button>
                      <span class="tb-cal-month-label" id="tb-cal-label">Lädt …</span>
                      <button type="button" class="tb-cal-btn" id="tb-cal-next" aria-label="Nächster Monat">&#8250;</button>
                    </div>
                    <div class="tb-cal-body">
                      <div class="tb-cal-wd-row" id="tb-cal-wd-row">
                        <span class="tb-cal-wd">Dienstag</span>
                        <span class="tb-cal-wd">Donnerstag</span>
                      </div>
                      <div class="tb-cal-weeks" id="tb-cal-weeks"></div>
                      <div class="tb-cal-legend">
                        <span class="tb-cal-legend-item"><span class="tb-cal-legend-dot tb-cal-legend-dot--free"></span>Frei</span>
                        <span class="tb-cal-legend-item"><span class="tb-cal-legend-dot tb-cal-legend-dot--knapp"></span>1 Platz frei</span>
                        <span class="tb-cal-legend-item"><span class="tb-cal-legend-dot tb-cal-legend-dot--full"></span>Ausgebucht</span>
                      </div>
                    </div>
                  </div>

                  <div class="tb-dates" id="tb-date-list" style="display:none;"></div>
                </div>

                <!-- Schritt 3: Uhrzeit -->
                <div class="tb-step tb-locked" id="step-time">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.clock}</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 3</span><h3>Welche Uhrzeit?</h3></div><span class="tb-hint">ab 17 Uhr</span></div>
                  <div class="tb-times" id="tb-time-list"></div>
                </div>

                <!-- Schritt 4: Daten -->
                <div class="tb-step" id="step-form">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.user}</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 4</span><h3>Deine Kontaktdaten</h3></div></div>
                  <div class="tb-form">
                    <div class="row2">
                      <div class="field"><label for="tb-name">Name *</label><input type="text" id="tb-name" placeholder="Vor- und Nachname" autocomplete="name" required></div>
                      <div class="field"><label for="tb-email">E-Mail *</label><input type="email" id="tb-email" placeholder="dein@email.de" autocomplete="email" required></div>
                    </div>
                    <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
                    <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="tb-website">Website</label><input type="text" id="tb-website" name="website" tabindex="-1" autocomplete="off"></div>
                    <div class="row2">
                      <div class="field"><label for="tb-phone">Telefon</label><input type="tel" id="tb-phone" placeholder="optional" autocomplete="tel"></div>
                      <div class="field"><label for="tb-schule">Schule &amp; Klasse</label><input type="text" id="tb-schule" placeholder="optional"></div>
                    </div>
                    <fieldset class="field tb-fieldset">
                      <legend>Was möchtest du machen?</legend>
                      <div class="tb-chips">
                        <label class="tb-chip"><input type="radio" name="tb-ziel" value="Ausbildung"><span>Ausbildung</span></label>
                        <label class="tb-chip"><input type="radio" name="tb-ziel" value="Duales Studium"><span>Duales Studium</span></label>
                        <label class="tb-chip"><input type="radio" name="tb-ziel" value="Praktikum"><span>Praktikum</span></label>
                        <label class="tb-chip"><input type="radio" name="tb-ziel" value="Freiwilligendienst"><span>Freiwilligendienst</span></label>
                      </div>
                    </fieldset>
                    <fieldset class="field tb-fieldset">
                      <legend>Wie können wir dich unterstützen? <small>Mehrfachauswahl</small></legend>
                      <div class="tb-chips">
                        <label class="tb-chip tb-chip--multi"><input type="checkbox" name="tb-support" value="Berufsorientierung"><span>Berufsorientierung</span></label>
                        <label class="tb-chip tb-chip--multi"><input type="checkbox" name="tb-support" value="Bewerbungsunterlagen"><span>Bewerbungsunterlagen</span></label>
                        <label class="tb-chip tb-chip--multi"><input type="checkbox" name="tb-support" value="Vorbereitung Vorstellungsgespräch"><span>Vorstellungsgespräch</span></label>
                      </div>
                    </fieldset>
                    <div class="field"><label for="tb-msg">Worum geht's? (optional)</label><textarea id="tb-msg" placeholder="z. B. Ich weiß noch nicht, welcher Beruf zu mir passt."></textarea></div>
                    <label class="tb-check"><input type="checkbox" id="tb-privacy" required> Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verarbeitet werden (Datenschutz).</label>
                  </div>
                </div>

                <!-- Buchen direkt am Formularende: erscheint, sobald Standort,
                     Tag, Uhrzeit und Kontaktdaten stehen. Spart auf dem Desktop
                     den Weg zurück nach oben zur Zusammenfassung. -->
                <div class="tb-bottom-cta" id="tb-bottom-cta" hidden>
                  <div class="tb-bottom-cta-info">
                    <span class="tb-bottom-cta-label">Alles ausgewählt</span>
                    <span class="tb-bottom-cta-recap" id="tb-bottom-recap"></span>
                  </div>
                  <button type="submit" class="btn btn-primary" id="tb-submit-bottom">Jetzt verbindlich buchen</button>
                  <p class="tb-bottom-cta-err" id="tb-fehler-bottom" style="display:none;"></p>
                </div>
              </div>

              <!-- Zusammenfassung -->
              <aside>
                <div class="tb-summary">
                  <span class="tb-summary-kicker">Kostenfreie Beratung</span>
                  <h4>Deine Auswahl</h4>
                  <div class="tb-sum-row"><span class="k">Standort</span><span class="v empty" id="sum-ort">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Datum</span><span class="v empty" id="sum-datum">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Uhrzeit</span><span class="v empty" id="sum-zeit">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Name</span><span class="v empty" id="sum-name">noch offen</span></div>
                  <button type="submit" class="btn btn-primary" id="tb-submit" disabled>Jetzt verbindlich buchen</button>
                  <p id="tb-fehler" style="display:none;color:#ffd2dc;background:rgba(232,64,85,0.25);border-radius:8px;padding:8px 12px;font-size:13px;margin-top:12px;"></p>
                  <ul class="tb-trust">
                    <li>0 € – komplett kostenfrei</li>
                    <li>Bestätigung per E-Mail</li>
                    <li>Erinnerung am Vortag</li>
                  </ul>
                </div>
              </aside>

            </div>
          </div>
        </form>

        <!-- Erfolg / Senden -->
        <div class="tb-success" id="tb-success">
          <div class="tb-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Termin gebucht! 🎉</h3>
          <p>Dein Platz ist reserviert. Du bekommst gleich eine Bestätigung per E-Mail – am Tag vorher erinnern wir dich nochmal.</p>
          <div class="tb-recap" id="tb-recap"></div>
          <div class="tb-actions">
            <a class="btn btn-primary" id="tb-send-mail" href="#" style="display:none">Bestätigung per E-Mail senden</a>
            <a class="btn btn-ghost" href="tel:017641933496">Fragen? Ruf uns an</a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- SONDERANFRAGE -->
  <section class="bg-white" id="anfrage">
    <div class="container">
      <div class="tb-ask-grid">
        <div class="tb-ask-side reveal">
          <span class="section-label">Passt kein Termin?</span>
          <h2>Stell uns deine Anfrage</h2>
          <p>Kein passender Slot dabei, eine Frage vorab oder ein anderes Anliegen? Schreib uns einfach – wir melden uns zeitnah bei dir zurück.</p>
          <div class="tb-facts">
            <span class="tb-facts-title">Gut zu wissen</span>
            <div class="tb-fact"><span class="tb-fact-ic">${IC.clock}</span><div><b>Wann?</b><span>Wuppertal: Di &amp; Do · Essen: ab Okt. Mo · Solingen: Mo · Remscheid: Mi · jeweils 17–19 Uhr</span></div></div>
            <div class="tb-fact"><span class="tb-fact-ic">${IC.euro}</span><div><b>Kosten</b><span>0 € – komplett kostenfrei</span></div></div>
            <div class="tb-fact"><span class="tb-fact-ic">${IC.bag}</span><div><b>Mitbringen</b><span>nur dich – Unterlagen sind optional</span></div></div>
            <div class="tb-fact"><span class="tb-fact-ic">${IC.phone}</span><div><b>Telefon</b><a href="tel:017641933496">0176 419 334 96</a></div></div>
            <div class="tb-fact"><span class="tb-fact-ic">${IC.chat}</span><div><b>WhatsApp</b><a href="https://wa.me/4915753934038">01575 393 4038</a></div></div>
          </div>
        </div>

        <div class="tb-ask-card reveal">
          <form id="anfrage-form" class="tb-form">
            <div class="form-note" hidden>Danke! Wir melden uns bald. ✅ <a id="an-send-mail" href="#" style="color:var(--gold-dark);font-weight:700;">Anfrage senden</a></div>
            <div class="row2">
              <div class="field"><label for="an-name">Name *</label><input type="text" id="an-name" placeholder="Vor- und Nachname" autocomplete="name" required></div>
              <div class="field"><label for="an-email">E-Mail *</label><input type="email" id="an-email" placeholder="dein@email.de" autocomplete="email" required></div>
            </div>
            <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
            <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="an-website">Website</label><input type="text" id="an-website" name="website" tabindex="-1" autocomplete="off"></div>
            <div class="row2">
              <div class="field"><label for="an-phone">Telefon</label><input type="tel" id="an-phone" placeholder="optional" autocomplete="tel"></div>
              <div class="field"><label for="an-herkunft">Woher kommst du?</label><input type="text" id="an-herkunft" placeholder="z. B. Wuppertal, Essen, Solingen …"></div>
            </div>
            <fieldset class="field tb-fieldset">
              <legend>Was möchtest du machen?</legend>
              <div class="tb-chips">
                <label class="tb-chip"><input type="radio" name="an-ziel" value="Ausbildung"><span>Ausbildung</span></label>
                <label class="tb-chip"><input type="radio" name="an-ziel" value="Duales Studium"><span>Duales Studium</span></label>
                <label class="tb-chip"><input type="radio" name="an-ziel" value="Praktikum"><span>Praktikum</span></label>
                <label class="tb-chip"><input type="radio" name="an-ziel" value="Freiwilligendienst"><span>Freiwilligendienst</span></label>
              </div>
            </fieldset>
            <fieldset class="field tb-fieldset">
              <legend>Wie können wir dich unterstützen? <small>Mehrfachauswahl</small></legend>
              <div class="tb-chips">
                <label class="tb-chip tb-chip--multi"><input type="checkbox" name="an-support" value="Berufsorientierung"><span>Berufsorientierung</span></label>
                <label class="tb-chip tb-chip--multi"><input type="checkbox" name="an-support" value="Bewerbungsunterlagen"><span>Bewerbungsunterlagen</span></label>
                <label class="tb-chip tb-chip--multi"><input type="checkbox" name="an-support" value="Vorbereitung Vorstellungsgespräch"><span>Vorstellungsgespräch</span></label>
              </div>
            </fieldset>
            <div class="row2">
              <div class="field">
                <label for="an-abschluss">Welchen Schulabschluss hast du?</label>
                <select id="an-abschluss">
                  <option value="">Bitte wählen …</option>
                  <option>Hauptschulabschluss</option>
                  <option>Fachoberschulreife (FOR)</option>
                  <option>Fachhochschulreife</option>
                  <option>Abitur / Allgemeine Hochschulreife</option>
                  <option>Noch in der Schule</option>
                  <option>Kein Abschluss</option>
                </select>
              </div>
              <div class="field">
                <label for="an-quelle">Wie bist du auf uns aufmerksam geworden?</label>
                <select id="an-quelle">
                  <option value="">Bitte wählen …</option>
                  <option>Partnerunternehmen</option>
                  <option>Social Media</option>
                  <option>Lehrkraft</option>
                  <option>Freunde und Bekannte</option>
                  <option>Sonstige</option>
                </select>
              </div>
            </div>
            <div class="field"><label for="an-msg">Deine Nachricht *</label><textarea id="an-msg" placeholder="Worum geht's? Stell uns einfach deine Frage." required></textarea></div>
            <label class="tb-check"><input type="checkbox" id="an-privacy" required> Ich bin mit der Verarbeitung meiner Angaben einverstanden (Datenschutz).</label>
            <button type="submit" class="btn btn-primary tb-ask-submit">Anfrage abschicken →</button>
          </form>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
