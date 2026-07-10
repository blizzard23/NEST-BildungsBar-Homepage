const IC = {
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Termin buchen</span>
        <h1>Sichere dir deinen<br /><em>Beratungstermin</em></h1>
        <p class="lead">Kostenfrei, locker und auf Augenhöhe – wähl einfach Standort, Tag und Uhrzeit. Wir beraten dich in Wuppertal und Essen (Di &amp; Do), in Solingen (Mo) und in Remscheid (Mi) – jeweils von 17 bis 19 Uhr.</p>
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
      <div class="section-head centered reveal">
        <span class="section-label">So einfach geht's</span>
        <h2>In wenigen Klicks zum Termin</h2>
        <p>Kein langes Formular, kein Account. Du wählst aus, was dir passt – den Rest klären wir gemeinsam vor Ort.</p>
      </div>
      <div class="card-grid cols-3">
        <div class="card reveal"><div class="icon icon-svg">${IC.pin}</div><h3>Standort wählen</h3><p>Wuppertal, Essen, Solingen oder Remscheid – such dir aus, wo du uns am liebsten triffst.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.calendar}</div><h3>Tag &amp; Uhrzeit</h3><p>Je nach Standort sind wir montags bis donnerstags da. Pick dir einen freien Slot.</p></div>
        <div class="card reveal"><div class="icon icon-svg">${IC.user}</div><h3>Kurz Daten rein</h3><p>Name &amp; E-Mail genügen. Wir bestätigen deinen Termin schnellstmöglich.</p></div>
      </div>
    </div>
  </section>

  <!-- BUCHUNG -->
  <section class="bg-light" id="buchen">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Dein Termin</span>
        <h2>Wähl deinen Wunschtermin</h2>
        <p style="color:var(--text-soft);font-size:14px;">Wir sind oft weit im Voraus ausgebucht – bitte frühzeitig buchen.</p>
      </div>

      <div class="termin-wrap" id="termin-app">

        <form id="termin-form">
          <div id="tb-formcard">
            <div class="tb-grid">

              <div>
                <!-- Schritt 1: Standort -->
                <div class="tb-step" id="step-ort">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.pin}</span><h3>Wo möchtest du uns treffen?</h3></div>
                  <div class="tb-choices">
                    <button type="button" class="tb-ort" data-ort="Wuppertal" data-adr="Hochstraße 65, 42105 Wuppertal">
                      <div class="o-header">
                        <span class="o-header-label">Wuppertal</span>
                        <span class="o-header-badge">Di &amp; Do · 17–19 Uhr</span>
                      </div>
                      <div class="o-body">
                        <span class="o-city">BildungsBar Wuppertal</span>
                        <span class="o-adr">Hochstraße 65 · 42105 Wuppertal</span>
                        <span class="o-check">✓ Ausgewählt</span>
                      </div>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Essen" data-adr="Kopstadtplatz 12, 45127 Essen">
                      <div class="o-header">
                        <span class="o-header-label">Essen</span>
                        <span class="o-header-badge">Di &amp; Do · 17–19 Uhr</span>
                      </div>
                      <div class="o-body">
                        <span class="o-city">BildungsBar Essen</span>
                        <span class="o-adr">Kopstadtplatz 12 · 45127 Essen</span>
                        <span class="o-check">✓ Ausgewählt</span>
                      </div>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Solingen" data-adr="Grünewalder Straße 29-31, 42657 Solingen (im Gründerzentrum)">
                      <div class="o-header">
                        <span class="o-header-label">Solingen</span>
                        <span class="o-header-badge">Mo · 17–19 Uhr</span>
                      </div>
                      <div class="o-body">
                        <span class="o-city">BildungsBar Solingen · im Gründerzentrum</span>
                        <span class="o-adr">Grünewalder Straße 29-31 · 42657 Solingen</span>
                        <span class="o-soon">Buchbar ab September</span>
                        <span class="o-check">✓ Ausgewählt</span>
                      </div>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Remscheid" data-adr="Hindenburgstraße 10a, 42853 Remscheid (in der Gründerschmiede)">
                      <div class="o-header">
                        <span class="o-header-label">Remscheid</span>
                        <span class="o-header-badge">Mi · 17–19 Uhr</span>
                      </div>
                      <div class="o-body">
                        <span class="o-city">BildungsBar Remscheid · in der Gründerschmiede</span>
                        <span class="o-adr">Hindenburgstraße 10a · 42853 Remscheid</span>
                        <span class="o-soon">Buchbar ab September</span>
                        <span class="o-check">✓ Ausgewählt</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Schritt 2: Monat & Datum (Kalender) -->
                <div class="tb-step tb-locked" id="step-date">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.calendar}</span><h3>Welcher Tag passt?</h3><span class="tb-hint" id="tb-day-hint">je nach Standort</span></div>

                  <!-- Monatskalender -->
                  <div class="tb-cal-wrap">
                    <div class="tb-cal-nav" id="tb-cal-nav">
                      <button type="button" class="tb-cal-btn" id="tb-cal-prev">&#8249;</button>
                      <span class="tb-cal-month-label" id="tb-cal-label">Lädt …</span>
                      <button type="button" class="tb-cal-btn" id="tb-cal-next">&#8250;</button>
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
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.clock}</span><h3>Welche Uhrzeit?</h3><span class="tb-hint">ab 17 Uhr</span></div>
                  <div class="tb-times" id="tb-time-list"></div>
                </div>

                <!-- Schritt 4: Daten -->
                <div class="tb-step" id="step-form">
                  <div class="tb-step-head"><span class="tb-step-n step-icon">${IC.user}</span><h3>Deine Kontaktdaten</h3></div>
                  <div class="tb-form">
                    <div class="row2">
                      <div class="field"><label for="tb-name">Name *</label><input type="text" id="tb-name" placeholder="Vor- und Nachname" required></div>
                      <div class="field"><label for="tb-email">E-Mail *</label><input type="email" id="tb-email" placeholder="dein@email.de" required></div>
                    </div>
                    <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
                    <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="tb-website">Website</label><input type="text" id="tb-website" name="website" tabindex="-1" autocomplete="off"></div>
                    <div class="row2">
                      <div class="field"><label for="tb-phone">Telefon</label><input type="tel" id="tb-phone" placeholder="optional"></div>
                      <div class="field"><label for="tb-schule">Schule &amp; Klasse</label><input type="text" id="tb-schule" placeholder="optional"></div>
                    </div>
                    <div class="field">
                      <label>Was möchtest du machen?</label>
                      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;">
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="tb-ziel" value="Ausbildung"> Ausbildung</label>
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="tb-ziel" value="Duales Studium"> Duales Studium</label>
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="tb-ziel" value="Praktikum"> Praktikum</label>
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="tb-ziel" value="Freiwilligendienst"> Freiwilligendienst</label>
                      </div>
                    </div>
                    <div class="field">
                      <label>Wie können wir dich unterstützen?</label>
                      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;">
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="tb-support" value="Berufsorientierung"> Berufsorientierung</label>
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="tb-support" value="Bewerbungsunterlagen"> Bewerbungsunterlagen</label>
                        <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="tb-support" value="Vorbereitung Vorstellungsgespräch"> Vorstellungsgespräch</label>
                      </div>
                    </div>
                    <div class="field"><label for="tb-msg">Worum geht's? (optional)</label><textarea id="tb-msg" placeholder="z. B. Ich weiß noch nicht, welcher Beruf zu mir passt."></textarea></div>
                    <label class="tb-check"><input type="checkbox" id="tb-privacy" required> Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verarbeitet werden (Datenschutz).</label>
                  </div>
                </div>
              </div>

              <!-- Zusammenfassung -->
              <aside>
                <div class="tb-summary">
                  <h4>Deine Auswahl</h4>
                  <div class="tb-sum-row"><span class="k">Standort</span><span class="v empty" id="sum-ort">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Datum</span><span class="v empty" id="sum-datum">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Uhrzeit</span><span class="v empty" id="sum-zeit">noch offen</span></div>
                  <div class="tb-sum-row"><span class="k">Name</span><span class="v empty" id="sum-name">noch offen</span></div>
                  <button type="submit" class="btn btn-primary" id="tb-submit" disabled>Jetzt verbindlich buchen</button>
                  <p id="tb-fehler" style="display:none;color:#ffd2dc;background:rgba(232,64,85,0.25);border-radius:8px;padding:8px 12px;font-size:13px;margin-top:12px;"></p>
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
      <div class="contact-grid">
        <div class="reveal">
          <span class="section-label">Passt kein Termin?</span>
          <h2 style="font-size:clamp(24px,3.4vw,32px);font-weight:800;color:var(--navy);margin-bottom:8px;">Stell uns deine Anfrage</h2>
          <p style="color:var(--text-soft);margin-bottom:24px;line-height:1.7;">Kein passender Slot dabei, eine Frage vorab oder ein anderes Anliegen? Schreib uns einfach – wir melden uns zeitnah bei dir zurück.</p>
          <form id="anfrage-form" class="tb-form">
            <div class="form-note" hidden>Danke! Wir melden uns bald. ✅ <a id="an-send-mail" href="#" style="color:var(--gold-dark);font-weight:700;">Anfrage senden</a></div>
            <div class="row2">
              <div class="field"><label for="an-name">Name *</label><input type="text" id="an-name" placeholder="Vor- und Nachname" required></div>
              <div class="field"><label for="an-email">E-Mail *</label><input type="email" id="an-email" placeholder="dein@email.de" required></div>
            </div>
            <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
            <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="an-website">Website</label><input type="text" id="an-website" name="website" tabindex="-1" autocomplete="off"></div>
            <div class="row2">
              <div class="field"><label for="an-phone">Telefon</label><input type="tel" id="an-phone" placeholder="optional"></div>
              <div class="field"><label for="an-herkunft">Woher kommst du?</label><input type="text" id="an-herkunft" placeholder="z. B. Wuppertal, Essen, Solingen …"></div>
            </div>
            <div class="field">
              <label>Was möchtest du machen?</label>
              <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;">
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="an-ziel" value="Ausbildung"> Ausbildung</label>
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="an-ziel" value="Duales Studium"> Duales Studium</label>
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="an-ziel" value="Praktikum"> Praktikum</label>
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="radio" name="an-ziel" value="Freiwilligendienst"> Freiwilligendienst</label>
              </div>
            </div>
            <div class="field">
              <label>Wie können wir dich unterstützen?</label>
              <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;">
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="an-support" value="Berufsorientierung"> Berufsorientierung</label>
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="an-support" value="Bewerbungsunterlagen"> Bewerbungsunterlagen</label>
                <label style="display:flex;align-items:center;gap:6px;font-weight:500;color:var(--text);cursor:pointer;"><input type="checkbox" name="an-support" value="Vorbereitung Vorstellungsgespräch"> Vorstellungsgespräch</label>
              </div>
            </div>
            <div class="row2">
              <div class="field">
                <label for="an-abschluss">Welchen Schulabschluss hast du?</label>
                <select id="an-abschluss" style="width:100%;padding:12px 14px;border:1.5px solid var(--line);border-radius:10px;font-family:var(--font);font-size:15px;background:#fff;color:var(--text);">
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
                <select id="an-quelle" style="width:100%;padding:12px 14px;border:1.5px solid var(--line);border-radius:10px;font-family:var(--font);font-size:15px;background:#fff;color:var(--text);">
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
            <button type="submit" class="btn btn-primary" style="margin-top:16px;">Anfrage abschicken</button>
          </form>
        </div>

        <div class="reveal">
          <div class="contact-info-card">
            <h3>Gut zu wissen</h3>
            <div class="row"><div class="ic"></div><div><b>Wann?</b><span>Wuppertal &amp; Essen: Di &amp; Do · Solingen: Mo · Remscheid: Mi · jeweils 17–19 Uhr</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Neu!</b><span>Solingen &amp; Remscheid sind ab September buchbar</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Kosten</b><span>0 € – komplett kostenfrei</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Mitbringen</b><span>nur dich – Unterlagen sind optional</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Telefon</b><a href="tel:017641933496">0176 419 334 96</a></div></div>
            <div class="row"><div class="ic"></div><div><b>WhatsApp</b><a href="https://wa.me/4915753934038">01575 393 4038</a></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
