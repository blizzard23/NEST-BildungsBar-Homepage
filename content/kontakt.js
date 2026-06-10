const html = `

  <section class="hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Kontakt</span>
        <h1>Melde dich<br /><em>bei uns!</em></h1>
        <p class="lead">Ob Termin, Workshop-Anfrage oder Kooperation – wir freuen uns auf deine Nachricht. Schreib uns oder ruf einfach an.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#termin">Termin buchen →</a>
          <a class="btn btn-ghost" href="tel:017641933496">Anrufen</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="mock-bar"><i></i><i></i><i></i></div>
        <div class="mock-row"><span class="ic" data-icon="briefcase" data-icon-size="20"></span><span class="tx"><b>E-Mail</b><small>info@nest-bildungsbar.de</small></span></div>
        <div class="mock-row"><span class="ic" data-icon="people" data-icon-size="20"></span><span class="tx"><b>Telefon</b><small>0176 419 334 96</small></span></div>
        <div class="mock-row"><span class="ic" data-icon="chat" data-icon-size="20"></span><span class="tx"><b>WhatsApp</b><small>01575 393 4038</small></span></div>
      </div>
    </div></div>
  </section>

  <section class="bg-white" id="termin">
    <div class="container">
      <div class="contact-grid">
        <div class="reveal">
          <span class="section-label">Schreib uns</span>
          <h2 style="font-size:clamp(24px,3.4vw,32px);font-weight:800;color:var(--navy);margin-bottom:8px;">Kontaktformular</h2>
          <p style="color:var(--text-soft);margin-bottom:24px;">Wir melden uns schnellstmöglich bei dir zurück.</p>
          
          <form id="contact-form">
            <div class="form-note" hidden>Danke für deine Nachricht! Wir melden uns bald bei dir. ✅</div>
            <div class="field"><label for="name">Name</label><input id="name" name="name" type="text" placeholder="Vor- und Nachname" required /></div>
            <div class="field"><label for="email">E-Mail</label><input id="email" name="email" type="email" placeholder="dein@email.de" required /></div>
            <div class="field"><label for="phone">Telefon</label><input id="phone" name="phone" type="tel" placeholder="optional" /></div>
            <div class="field"><label for="subject">Betreff</label><input id="subject" name="subject" type="text" placeholder="Worum geht's?" /></div>
            <div class="field"><label for="message">Nachricht</label><textarea id="message" name="message" placeholder="Deine Nachricht (optional)"></textarea></div>
            <div class="checkbox-row"><input type="checkbox" id="privacy" required /><label for="privacy" style="font-weight:400;color:var(--text-soft);">Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.</label></div>
            <button class="btn btn-primary" type="submit">Nachricht senden</button>
          </form>
        </div>

        <div class="reveal">
          <div class="contact-info-card">
            <h3>So erreichst du uns</h3>
            <div class="row"><div class="ic" data-icon="briefcase" data-icon-size="18"></div><div><b>E-Mail</b><a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a></div></div>
            <div class="row"><div class="ic" data-icon="people" data-icon-size="18"></div><div><b>Telefon</b><a href="tel:017641933496">0176 419 334 96</a></div></div>
            <div class="row"><div class="ic" data-icon="chat" data-icon-size="18"></div><div><b>WhatsApp</b><a href="tel:015753934038">01575 393 4038</a></div></div>
            <div class="row"><div class="ic" data-icon="clock" data-icon-size="18"></div><div><b>Öffnungszeiten</b><span>Di &amp; Do · 17–19 Uhr</span></div></div>
            <div class="row"><div class="ic" data-icon="pin" data-icon-size="18"></div><div><b>Social Media</b><span>Instagram · Facebook · LinkedIn</span></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light">
    <div class="container">
      <div class="section-head centered reveal">
        <span class="section-label">Unsere Standorte</span>
        <h2>Komm vorbei</h2>
        <p>Buch dir einen Termin an deinem Wunschstandort – dienstags und donnerstags von 17 bis 19 Uhr.</p>
      </div>
      <div class="card-grid cols-2">
        <div class="loc-card reveal"><span class="tag">Standort Wuppertal</span><h3>Wuppertal</h3><p>Hochstraße 65, 42105 Wuppertal</p><p>Di &amp; Do · 17–19 Uhr</p><div class="map" data-icon="pin" data-icon-size="34"></div><a class="btn btn-outline mt-2" href="#termin">Termin Wuppertal</a></div>
        <div class="loc-card reveal"><span class="tag">Standort Essen</span><h3>Essen</h3><p>Kopstadtplatz 12, 45127 Essen</p><p>Di &amp; Do · 17–19 Uhr</p><div class="map" data-icon="pin" data-icon-size="34"></div><a class="btn btn-outline mt-2" href="#termin">Termin Essen</a></div>
      </div>
    </div>
  </section>

  <section class="cta-section on-light">
    <div class="container"><div class="cta-inner">
      <span class="section-label" style="display:flex;justify-content:center;">Wir freuen uns auf dich</span>
      <h2>Bereit für deinen <em>nächsten Schritt?</em></h2>
      <p>Egal ob Schüler:in, Schule oder Unternehmen – melde dich und wir finden gemeinsam den passenden Weg.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="mailto:info@nest-bildungsbar.de">E-Mail schreiben</a>
        <a class="btn btn-ghost" href="tel:017641933496">Jetzt anrufen</a>
      </div>
    </div></div>
  </section>


`;
export default html;
