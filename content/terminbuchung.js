import IC from "./icons";

const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Termin buchen</span>
        <h1>Sichere dir deinen<br /><em>Beratungstermin</em></h1>
        <p class="lead">Kostenfrei, locker und auf Augenhöhe – wähl einfach Standort, Tag und Uhrzeit. Wir beraten dich in Wuppertal (Di &amp; Do), in Essen (Mo), in Solingen (Mo) und in Remscheid (Mi) – jeweils von 17 bis 19 Uhr.</p>
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

  <!-- SO LÄUFT'S · Spalten mit Trennlinien (Linear) -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-head bb-head--split">
        <h2 class="bb-h2">In wenigen Klicks <span class="bb-hl">zum Termin</span></h2>
        <p class="bb-lead">Kein langes Formular, kein Account. Du wählst aus, was dir passt – den Rest klären wir gemeinsam vor Ort.</p>
      </div>
      <div class="bb-cols">
        <div class="bb-col"><span class="bb-col__ic">${IC.pin}</span><div class="bb-col__body"><h3>Standort wählen</h3><p>Wuppertal, Essen, Solingen oder Remscheid – such dir aus, wo du uns am liebsten triffst.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.calendar}</span><div class="bb-col__body"><h3>Tag &amp; Uhrzeit</h3><p>Je nach Standort sind wir montags bis donnerstags da. Pick dir einen freien Slot.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.user}</span><div class="bb-col__body"><h3>Kurz Daten rein</h3><p>Name &amp; E-Mail genügen. Wir bestätigen deinen Termin schnellstmöglich.</p></div></div>
      </div>
    </div>
  </section>

  <!-- BUCHUNG · Karte + Seitenleiste, Fortschrittsbalken, Auswahl-Pills -->
  <section class="bb-sec bb-sec--band tb-section" id="buchen">
    <div class="container">
      <div class="bb-head bb-head--row">
        <div>
          <h2 class="bb-h2">Wähl deinen Wunschtermin</h2>
          <p class="bb-lead" style="margin-top:12px;">Wir sind oft weit im Voraus ausgebucht – bitte frühzeitig buchen.</p>
        </div>
      </div>

      <div class="termin-wrap" id="termin-app">

        <!-- Fortschritt: rein per CSS (:has) aus dem Zustand der Schritte abgeleitet -->
        <div class="tb-progress" aria-hidden="true">
          <div class="tb-progress__track"><span class="tb-progress__fill"></span></div>
          <ol class="tb-progress__steps">
            <li class="tb-prog tb-prog--ort">Standort</li>
            <li class="tb-prog tb-prog--tag">Tag</li>
            <li class="tb-prog tb-prog--zeit">Uhrzeit</li>
            <li class="tb-prog tb-prog--daten">Deine Daten</li>
          </ol>
        </div>

        <form id="termin-form">
          <div id="tb-formcard">
            <div class="tb-grid">

              <div class="tb-main bb-tile">
                <!-- Schritt 1: Standort -->
                <div class="tb-step" id="step-ort">
                  <div class="tb-step-head"><span class="tb-step-n">1</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 1</span><h3>Wo möchtest du uns treffen?</h3></div></div>
                  <div class="tb-choices">
                    <button type="button" class="tb-ort" data-ort="Wuppertal" data-adr="Hochstraße 65, 42105 Wuppertal">
                      <span class="o-photo"><img src="/assets/img/standort-wuppertal.jpg" alt="" loading="lazy"></span>
                      <span class="o-header-label">Wuppertal</span>
                      <span class="o-adr">Hochstraße 65 · 42105 Wuppertal</span>
                      <span class="o-header-badge">Di &amp; Do · 17–19 Uhr</span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Essen" data-adr="Kopstadtplatz 12, 45127 Essen">
                      <span class="o-photo"><img src="/assets/img/standort-essen.png" alt="" loading="lazy"></span>
                      <span class="o-header-label">Essen</span>
                      <span class="o-adr">Kopstadtplatz 12 · 45127 Essen</span>
                      <span class="o-header-badge">Mo · 17–19 Uhr</span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Solingen" data-adr="Grünewalder Straße 29-31, 42657 Solingen (im Gründerzentrum)">
                      <span class="o-photo"><img src="/assets/img/standort-solingen.jpg" alt="" loading="lazy"></span>
                      <span class="o-header-label">Solingen</span>
                      <span class="o-adr">Grünewalder Straße 29-31 · 42657 Solingen · im Gründerzentrum</span>
                      <span class="o-header-badge">Mo · 17–19 Uhr</span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Remscheid" data-adr="Hindenburgstraße 10a, 42853 Remscheid (in der Gründerschmiede)">
                      <span class="o-photo"><img src="/assets/img/standort-remscheid.webp" alt="" loading="lazy"></span>
                      <span class="o-header-label">Remscheid</span>
                      <span class="o-adr">Hindenburgstraße 10a · 42853 Remscheid · in der Gründerschmiede</span>
                      <span class="o-header-badge">Mi · 17–19 Uhr</span>
                    </button>
                  </div>
                </div>

                <!-- Schritt 2: Monat & Datum (Kalender) -->
                <div class="tb-step tb-locked" id="step-date">
                  <div class="tb-step-head"><span class="tb-step-n">2</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 2</span><h3>Welcher Tag passt?</h3></div><span class="tb-hint" id="tb-day-hint">je nach Standort</span></div>

                  <!-- Monatskalender -->
                  <div class="tb-cal-wrap">
                    <div class="tb-cal-nav" id="tb-cal-nav">
                      <span class="tb-cal-month-label" id="tb-cal-label">Lädt …</span>
                      <div class="tb-cal-arrows">
                        <button type="button" class="tb-cal-btn" id="tb-cal-prev" aria-label="Vorheriger Monat">&#8249;</button>
                        <button type="button" class="tb-cal-btn" id="tb-cal-next" aria-label="Nächster Monat">&#8250;</button>
                      </div>
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
                  <div class="tb-step-head"><span class="tb-step-n">3</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 3</span><h3>Welche Uhrzeit?</h3></div><span class="tb-hint">ab 17 Uhr</span></div>
                  <div class="tb-times" id="tb-time-list"></div>
                </div>

                <!-- Schritt 4: Daten -->
                <div class="tb-step" id="step-form">
                  <div class="tb-step-head"><span class="tb-step-n">4</span><div class="tb-step-title"><span class="tb-step-kicker">Schritt 4</span><h3>Deine Kontaktdaten</h3></div></div>
                  <div class="bb-form">
                    <div class="bb-row">
                      <div class="bb-field"><label for="tb-name">Name *</label><input type="text" id="tb-name" placeholder="Vor- und Nachname" autocomplete="name" required></div>
                      <div class="bb-field"><label for="tb-email">E-Mail *</label><input type="email" id="tb-email" placeholder="dein@email.de" autocomplete="email" required></div>
                    </div>
                    <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
                    <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="tb-website">Website</label><input type="text" id="tb-website" name="website" tabindex="-1" autocomplete="off"></div>
                    <div class="bb-row">
                      <div class="bb-field"><label for="tb-phone">Telefon</label><input type="tel" id="tb-phone" placeholder="optional" autocomplete="tel"></div>
                      <div class="bb-field"><label for="tb-schule">Schule &amp; Klasse</label><input type="text" id="tb-schule" placeholder="optional"></div>
                    </div>
                    <fieldset class="bb-field">
                      <legend>Was möchtest du machen?</legend>
                      <div class="bb-pills">
                        <label class="bb-pill"><input type="radio" name="tb-ziel" value="Ausbildung"><span>Ausbildung</span></label>
                        <label class="bb-pill"><input type="radio" name="tb-ziel" value="Duales Studium"><span>Duales Studium</span></label>
                        <label class="bb-pill"><input type="radio" name="tb-ziel" value="Praktikum"><span>Praktikum</span></label>
                        <label class="bb-pill"><input type="radio" name="tb-ziel" value="Freiwilligendienst"><span>Freiwilligendienst</span></label>
                      </div>
                    </fieldset>
                    <fieldset class="bb-field">
                      <legend>Wie können wir dich unterstützen? <small>Mehrfachauswahl</small></legend>
                      <div class="bb-pills">
                        <label class="bb-pill"><input type="checkbox" name="tb-support" value="Berufsorientierung"><span>Berufsorientierung</span></label>
                        <label class="bb-pill"><input type="checkbox" name="tb-support" value="Bewerbungsunterlagen"><span>Bewerbungsunterlagen</span></label>
                        <label class="bb-pill"><input type="checkbox" name="tb-support" value="Vorbereitung Vorstellungsgespräch"><span>Vorstellungsgespräch</span></label>
                      </div>
                    </fieldset>
                    <div class="bb-field"><label for="tb-msg">Worum geht's? (optional)</label><textarea id="tb-msg" placeholder="z. B. Ich weiß noch nicht, welcher Beruf zu mir passt."></textarea></div>
                    <label class="bb-check"><input type="checkbox" id="tb-privacy" required> Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verarbeitet werden (Datenschutz).</label>
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
                  <button type="submit" class="bb-btn bb-btn--gold" id="tb-submit-bottom">Jetzt verbindlich buchen</button>
                  <p class="tb-err" id="tb-fehler-bottom" style="display:none;"></p>
                </div>
              </div>

              <!-- Zusammenfassung · Navy-Karte -->
              <aside>
                <div class="tb-summary bb-tile">
                  <h4 class="tb-summary__head">Deine Auswahl</h4>
                  <div class="tb-summary__body">
                    <div class="tb-sum-row"><span class="k">Standort</span><span class="v empty" id="sum-ort">noch offen</span></div>
                    <div class="tb-sum-row"><span class="k">Datum</span><span class="v empty" id="sum-datum">noch offen</span></div>
                    <div class="tb-sum-row"><span class="k">Uhrzeit</span><span class="v empty" id="sum-zeit">noch offen</span></div>
                    <div class="tb-sum-row"><span class="k">Name</span><span class="v empty" id="sum-name">noch offen</span></div>
                    <button type="submit" class="bb-btn bb-btn--ink bb-btn--block" id="tb-submit" disabled>Jetzt verbindlich buchen</button>
                    <p class="tb-err" id="tb-fehler" style="display:none;"></p>
                    <p class="tb-summary__note">Kostenfrei. Du bekommst eine Bestätigung per E-Mail und am Tag vorher eine Erinnerung.</p>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </form>

        <!-- Erfolg / Senden -->
        <div class="tb-success bb-tile" id="tb-success">
          <div class="tb-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Termin gebucht!</h3>
          <p>Dein Platz ist reserviert. Du bekommst gleich eine Bestätigung per E-Mail – am Tag vorher erinnern wir dich nochmal.</p>
          <div class="tb-recap" id="tb-recap"></div>
          <div class="tb-actions">
            <a class="bb-btn bb-btn--gold" id="tb-send-mail" href="#" style="display:none">Bestätigung per E-Mail senden</a>
            <a class="bb-btn bb-btn--light" href="tel:017641933496">Fragen? Ruf uns an</a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- SONDERANFRAGE · dunkle Sektion, Formular in Karte (Attio) -->
  <section class="bb-sec bb-sec--dark" id="anfrage">
    <div class="container">
      <div class="bb-split bb-split--top">
        <div>
          <h2 class="bb-h2">Passt kein Termin? Stell uns deine Anfrage</h2>
          <p class="bb-lead" style="margin-top:16px;">Kein passender Slot dabei, eine Frage vorab oder ein anderes Anliegen? Schreib uns einfach – wir melden uns zeitnah bei dir zurück.</p>
          <ul class="bb-ilist">
            <li><span class="bb-ilist__ic">${IC.clock}</span><div><b>Wann?</b><span>Wuppertal: Di &amp; Do · Essen: Mo · Solingen: Mo · Remscheid: Mi · jeweils 17–19 Uhr</span></div></li>
            <li><span class="bb-ilist__ic">${IC.euro}</span><div><b>Kosten</b><span>0 € – komplett kostenfrei</span></div></li>
            <li><span class="bb-ilist__ic">${IC.bag}</span><div><b>Mitbringen</b><span>nur dich – Unterlagen sind optional</span></div></li>
            <li><span class="bb-ilist__ic">${IC.phone}</span><div><b>Telefon</b><span><a class="bb-link" href="tel:017641933496">0176 419 334 96</a></span></div></li>
            <li><span class="bb-ilist__ic">${IC.chat}</span><div><b>WhatsApp</b><span><a class="bb-link" href="https://wa.me/4915753934038">01575 393 4038</a></span></div></li>
          </ul>
        </div>

        <div class="bb-tile tb-ask-card">
          <form id="anfrage-form" class="bb-form">
            <div class="form-note" hidden>Danke! Wir melden uns bald. ✅ <a id="an-send-mail" href="#" style="color:inherit;font-weight:700;">Anfrage senden</a></div>
            <div class="bb-row">
              <div class="bb-field"><label for="an-name">Name *</label><input type="text" id="an-name" placeholder="Vor- und Nachname" autocomplete="name" required></div>
              <div class="bb-field"><label for="an-email">E-Mail *</label><input type="email" id="an-email" placeholder="dein@email.de" autocomplete="email" required></div>
            </div>
            <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
            <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="an-website">Website</label><input type="text" id="an-website" name="website" tabindex="-1" autocomplete="off"></div>
            <div class="bb-row">
              <div class="bb-field"><label for="an-phone">Telefon</label><input type="tel" id="an-phone" placeholder="optional" autocomplete="tel"></div>
              <div class="bb-field"><label for="an-herkunft">Woher kommst du?</label><input type="text" id="an-herkunft" placeholder="z. B. Wuppertal, Essen, Solingen …"></div>
            </div>
            <fieldset class="bb-field">
              <legend>Was möchtest du machen?</legend>
              <div class="bb-pills">
                <label class="bb-pill"><input type="radio" name="an-ziel" value="Ausbildung"><span>Ausbildung</span></label>
                <label class="bb-pill"><input type="radio" name="an-ziel" value="Duales Studium"><span>Duales Studium</span></label>
                <label class="bb-pill"><input type="radio" name="an-ziel" value="Praktikum"><span>Praktikum</span></label>
                <label class="bb-pill"><input type="radio" name="an-ziel" value="Freiwilligendienst"><span>Freiwilligendienst</span></label>
              </div>
            </fieldset>
            <fieldset class="bb-field">
              <legend>Wie können wir dich unterstützen? <small>Mehrfachauswahl</small></legend>
              <div class="bb-pills">
                <label class="bb-pill"><input type="checkbox" name="an-support" value="Berufsorientierung"><span>Berufsorientierung</span></label>
                <label class="bb-pill"><input type="checkbox" name="an-support" value="Bewerbungsunterlagen"><span>Bewerbungsunterlagen</span></label>
                <label class="bb-pill"><input type="checkbox" name="an-support" value="Vorbereitung Vorstellungsgespräch"><span>Vorstellungsgespräch</span></label>
              </div>
            </fieldset>
            <div class="bb-row bb-row--end">
              <div class="bb-field">
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
              <div class="bb-field">
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
            <div class="bb-field"><label for="an-msg">Deine Nachricht *</label><textarea id="an-msg" placeholder="Worum geht's? Stell uns einfach deine Frage." required></textarea></div>
            <label class="bb-check"><input type="checkbox" id="an-privacy" required> Ich bin mit der Verarbeitung meiner Angaben einverstanden (Datenschutz).</label>
            <div><button type="submit" class="bb-btn bb-btn--ink">Anfrage abschicken</button></div>
          </form>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
