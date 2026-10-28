import IC from "./icons";

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
      <div class="hero-visual hero-visual--phone">
        <a class="hero-phone" href="https://wa.me/4915753934038" aria-label="WhatsApp – Terminanfrage senden">
          <span class="hp-notch"></span>
          <div class="hp-screen">
            <span class="hp-badge">Kontakt</span>
            <div class="hp-title">Schreib uns direkt</div>
            <div class="hp-chat-wrap">
              <div class="hp-chat-in">Hallo! Ich möchte einen Termin buchen 👋<div class="hp-chat-time">17:02</div></div>
              <div class="hp-chat-out">Super! Wuppertal, Essen, Solingen oder Remscheid?<div class="hp-chat-time">17:03</div></div>
              <div class="hp-chat-in">Wuppertal bitte!<div class="hp-chat-time">17:04</div></div>
              <div class="hp-chat-out">Do, 19. Juni · 17 Uhr frei ✅<div class="hp-chat-time">17:04</div></div>
              <div class="hp-chat-in">Super, danke! 🙏<div class="hp-chat-time">17:05</div></div>
              <div class="hp-chat-out">Bis dann! Wir freuen uns auf dich 🎉<div class="hp-chat-time">17:05</div></div>
            </div>
            <div class="hp-search" style="color:var(--text-mute);">Nachricht schreiben …</div>
          </div>
        </a>
      </div>
    </div></div>
  </section>

  <!-- KONTAKT · Vorlage: Brilliant „Supercharge your learning" (Liste) + Registrierungsformular -->
  <section class="bb-sec" id="termin">
    <div class="container">
      <div class="bb-split bb-split--top">
        <div>
          <h2 class="bb-h2">Schreib uns</h2>
          <p class="bb-lead" style="margin-top:16px;">Wir melden uns schnellstmöglich bei dir zurück. Oder du erreichst uns direkt:</p>
          <ul class="bb-ilist">
            <li><span class="bb-ilist__ic">${IC.mail}</span><div><b>E-Mail</b><span><a class="bb-link" href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a></span></div></li>
            <li><span class="bb-ilist__ic">${IC.phone}</span><div><b>Telefon</b><span><a class="bb-link" href="tel:017641933496">0176 419 334 96</a></span></div></li>
            <li><span class="bb-ilist__ic">${IC.chat}</span><div><b>WhatsApp</b><span><a class="bb-link" href="https://wa.me/4915753934038">01575 393 4038</a></span></div></li>
            <li><span class="bb-ilist__ic">${IC.clock}</span><div><b>Öffnungszeiten</b><span>Wuppertal: Di &amp; Do · Essen: ab Okt. Mo · Solingen: Mo · Remscheid: Mi · 17–19 Uhr</span></div></li>
            <li><span class="bb-ilist__ic">${IC.instagram}</span><div><b>Social Media</b><span>Instagram · Facebook · LinkedIn</span></div></li>
          </ul>
        </div>

        <div class="bb-tile tb-ask-card">
          <form id="contact-form" class="bb-form">
            <div class="form-note" hidden>Danke für deine Nachricht! Wir melden uns bald bei dir. ✅</div>
            <div class="bb-row">
              <div class="bb-field"><label for="name">Name</label><input id="name" name="name" type="text" placeholder="Vor- und Nachname" autocomplete="name" required /></div>
              <div class="bb-field"><label for="email">E-Mail</label><input id="email" name="email" type="email" placeholder="dein@email.de" autocomplete="email" required /></div>
            </div>
            <!-- Honeypot (Spamschutz): für Menschen unsichtbar, Bots füllen es aus -->
            <div style="position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden;" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off" /></div>
            <div class="bb-row">
              <div class="bb-field"><label for="phone">Telefon</label><input id="phone" name="phone" type="tel" placeholder="optional" autocomplete="tel" /></div>
              <div class="bb-field"><label for="subject">Betreff</label><input id="subject" name="subject" type="text" placeholder="Worum geht's?" /></div>
            </div>
            <div class="bb-field"><label for="message">Nachricht</label><textarea id="message" name="message" placeholder="Deine Nachricht (optional)"></textarea></div>
            <label class="bb-check"><input type="checkbox" id="privacy" required /> Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.</label>
            <div><button class="bb-btn bb-btn--ink" type="submit">Nachricht senden</button></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- STANDORTE · Vorlage: Brilliant Kurskatalog -->
  <section class="bb-sec bb-sec--band">
    <div class="container">
      <div class="bb-head">
        <h2 class="bb-h2">Komm vorbei</h2>
        <p class="bb-lead">Buch dir einen Termin – je nach Standort montags bis donnerstags von 17 bis 19 Uhr.</p>
      </div>
      <div class="bb-cards">
        <div class="bb-card">
          <span class="bb-card__tile bb-tile"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal – Innenansicht" loading="lazy"></span>
          <span class="bb-card__title">Wuppertal</span>
          <span class="bb-card__meta">Hochstraße 65, 42105 Wuppertal<br>Di &amp; Do · 17–19 Uhr</span>
          <a class="bb-link bb-card__link" href="/terminbuchung">Termin Wuppertal</a>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile bb-tile"><img src="/assets/img/standort-essen.png" alt="BildungsBar Essen – Innenansicht" loading="lazy"></span>
          <span class="bb-card__title">Essen</span>
          <span class="bb-card__meta">Kopstadtplatz 12, 45127 Essen<br>Ab Oktober 2026: Mo · 17–19 Uhr</span>
          <a class="bb-link bb-card__link" href="/terminbuchung">Termin Essen</a>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile bb-tile"><img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen – im Gründerzentrum" loading="lazy"></span>
          <span class="bb-card__title">Solingen</span>
          <span class="bb-card__meta">Grünewalder Straße 29-31, 42657 Solingen · im Gründerzentrum<br>Mo · 17–19 Uhr · buchbar ab Oktober</span>
          <a class="bb-link bb-card__link" href="/terminbuchung">Termin Solingen</a>
        </div>
        <div class="bb-card">
          <span class="bb-card__tile bb-tile"><img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid – in der Gründerschmiede" loading="lazy"></span>
          <span class="bb-card__title">Remscheid</span>
          <span class="bb-card__meta">Hindenburgstraße 10a, 42853 Remscheid · in der Gründerschmiede<br>Mi · 17–19 Uhr · buchbar ab Oktober</span>
          <a class="bb-link bb-card__link" href="/terminbuchung">Termin Remscheid</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ABSCHLUSS · Vorlage: Brilliant „Join over 10 million people learning on Brilliant" -->
  <section class="bb-sec">
    <div class="container">
      <div class="bb-cta">
        <div>
          <h2 class="bb-h2">Bereit für deinen nächsten Schritt?</h2>
          <p class="bb-lead">Egal ob Schüler:in, Schule oder Unternehmen – melde dich und wir finden gemeinsam den passenden Weg.</p>
          <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="mailto:info@nest-bildungsbar.de">E-Mail schreiben</a><a class="bb-btn bb-btn--light" href="tel:017641933496">Jetzt anrufen</a></div>
        </div>
        <div class="bb-cta__side">
          <div class="bb-cta__item"><a href="https://wa.me/4915753934038"><small>WhatsApp</small><b>01575 393 4038</b></a><span>Schreib uns einfach</span></div>
          <div class="bb-cta__item"><a href="/terminbuchung"><small>Online</small><b>Termin buchen</b></a><span>Kostenfrei</span></div>
        </div>
      </div>
    </div>
  </section>


`;
export default html;
