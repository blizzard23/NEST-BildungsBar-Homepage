const html = `

  <!-- HERO -->
  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Termin buchen</span>
        <h1>Sichere dir deinen<br /><em>Beratungstermin</em></h1>
        <p class="lead">Kostenlos, locker und auf Augenhöhe – wähl einfach Standort, Tag und Uhrzeit. Wir beraten dich dienstags &amp; donnerstags von 17 bis 19 Uhr in Wuppertal und Essen.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#buchen">Jetzt Termin wählen →</a>
          <a class="btn btn-ghost" href="#anfrage">Lieber anfragen</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="mock-bar"><i></i><i></i><i></i></div>
        <div class="mock-row"><span class="ic"></span><span class="tx"><b>Kostenlos &amp; unverbindlich</b><small>kein Haken, versprochen</small></span></div>
        <div class="mock-row"><span class="ic"></span><span class="tx"><b>Di &amp; Do · 17–19 Uhr</b><small>Wuppertal &amp; Essen</small></span></div>
        <div class="mock-row"><span class="ic"></span><span class="tx"><b>In 4 Schritten gebucht</b><small>dauert keine 2 Minuten</small></span></div>
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
        <div class="card reveal"><div class="icon"></div><h3>Standort wählen</h3><p>Wuppertal oder Essen – such dir aus, wo du uns am liebsten triffst.</p></div>
        <div class="card reveal"><div class="icon"></div><h3>Tag &amp; Uhrzeit</h3><p>Wir sind immer dienstags und donnerstags da. Pick dir einen freien Slot.</p></div>
        <div class="card reveal"><div class="icon"></div><h3>Kurz Daten rein</h3><p>Name &amp; E-Mail genügen. Wir bestätigen deinen Termin schnellstmöglich.</p></div>
      </div>
    </div>
  </section>

  <!-- BUCHUNG -->
  <section class="bg-light" id="buchen">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Dein Termin</span>
        <h2>Wähl deinen Wunschtermin</h2>
      </div>

      <div class="termin-wrap" id="termin-app">

        

        <form id="termin-form">
          <div id="tb-formcard">
            <div class="tb-grid">

              <div>
                <!-- Schritt 1: Standort -->
                <div class="tb-step" id="step-ort">
                  <div class="tb-step-head"><span class="tb-step-n">1</span><h3>Wo möchtest du uns treffen?</h3></div>
                  <div class="tb-choices">
                    <button type="button" class="tb-ort" data-ort="Wuppertal" data-adr="Hochstraße 65, 42105 Wuppertal">
                      <span class="o-check">ausgewählt ✓</span>
                      <span class="o-city">Wuppertal</span>
                      <span class="o-adr">Hochstraße 65 · 42105 Wuppertal</span>
                    </button>
                    <button type="button" class="tb-ort" data-ort="Essen" data-adr="Kopstadtplatz 12, 45127 Essen">
                      <span class="o-check">ausgewählt ✓</span>
                      <span class="o-city">Essen</span>
                      <span class="o-adr">Kopstadtplatz 12 · 45127 Essen</span>
                    </button>
                  </div>
                </div>

                <!-- Schritt 2: Datum -->
                <div class="tb-step tb-locked" id="step-date">
                  <div class="tb-step-head"><span class="tb-step-n">2</span><h3>Welcher Tag passt?</h3><span class="tb-hint">Di &amp; Do</span></div>
                  <div class="tb-dates" id="tb-date-list"></div>
                </div>

                <!-- Schritt 3: Uhrzeit -->
                <div class="tb-step tb-locked" id="step-time">
                  <div class="tb-step-head"><span class="tb-step-n">3</span><h3>Welche Uhrzeit?</h3><span class="tb-hint">17–19 Uhr</span></div>
                  <div class="tb-times" id="tb-time-list"></div>
                </div>

                <!-- Schritt 4: Daten -->
                <div class="tb-step" id="step-form">
                  <div class="tb-step-head"><span class="tb-step-n">4</span><h3>Deine Kontaktdaten</h3></div>
                  <div class="tb-form">
                    <div class="row2">
                      <div class="field"><label for="tb-name">Name *</label><input type="text" id="tb-name" placeholder="Vor- und Nachname" required></div>
                      <div class="field"><label for="tb-email">E-Mail *</label><input type="email" id="tb-email" placeholder="dein@email.de" required></div>
                    </div>
                    <div class="row2">
                      <div class="field"><label for="tb-phone">Telefon</label><input type="tel" id="tb-phone" placeholder="optional"></div>
                      <div class="field"><label for="tb-schule">Schule &amp; Klasse</label><input type="text" id="tb-schule" placeholder="optional"></div>
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
                  <button type="submit" class="btn btn-primary" id="tb-submit" disabled>Termin anfragen</button>
                </div>
              </aside>

            </div>
          </div>
        </form>

        <!-- Erfolg / Senden -->
        <div class="tb-success" id="tb-success">
          <h3>Fast geschafft! 🎉</h3>
          <p>Wir haben deine Auswahl notiert. Damit deine Anfrage bei uns ankommt, schick sie bitte mit einem Klick ab – wir bestätigen dir den Termin dann per E-Mail.</p>
          <div class="tb-recap" id="tb-recap"></div>
          <div class="tb-actions">
            <a class="btn btn-primary" id="tb-send-mail" href="#">Anfrage per E-Mail senden</a>
            <a class="btn btn-ghost" href="tel:017641933496">Lieber anrufen</a>
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
            <div class="form-note" hidden>Danke! Dein Mail-Programm öffnet sich – schick die Nachricht ab und wir melden uns. Falls nicht, nutze den Button unten. ✅ <a id="an-send-mail" href="#" style="color:var(--gold-dark);font-weight:700;">Anfrage senden</a></div>
            <div class="row2">
              <div class="field"><label for="an-name">Name *</label><input type="text" id="an-name" placeholder="Vor- und Nachname" required></div>
              <div class="field"><label for="an-email">E-Mail *</label><input type="email" id="an-email" placeholder="dein@email.de" required></div>
            </div>
            <div class="row2">
              <div class="field"><label for="an-phone">Telefon</label><input type="tel" id="an-phone" placeholder="optional"></div>
              <div class="field"><label for="an-ort">Wunschstandort</label><input type="text" id="an-ort" placeholder="Wuppertal, Essen oder egal"></div>
            </div>
            <div class="field"><label for="an-msg">Deine Nachricht *</label><textarea id="an-msg" placeholder="Worum geht's? Stell uns einfach deine Frage." required></textarea></div>
            <label class="tb-check"><input type="checkbox" id="an-privacy" required> Ich bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden (Datenschutz).</label>
            <button type="submit" class="btn btn-primary" style="margin-top:16px;">Anfrage abschicken</button>
          </form>
        </div>

        <div class="reveal">
          <div class="contact-info-card">
            <h3>Gut zu wissen</h3>
            <div class="row"><div class="ic"></div><div><b>Wann?</b><span>Di &amp; Do · 17–19 Uhr</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Kosten</b><span>0 € – komplett kostenlos</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Mitbringen</b><span>nur dich – Unterlagen sind optional</span></div></div>
            <div class="row"><div class="ic"></div><div><b>Telefon</b><a href="tel:017641933496">0176 419 334 96</a></div></div>
            <div class="row"><div class="ic"></div><div><b>WhatsApp</b><a href="tel:015753934038">01575 393 4038</a></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
