import IC from "./icons";

const html = `

<style>
/* Reset NUR innerhalb des Über-uns-Heros (lässt Header/Footer unberührt) */
.nest-about, .nest-about *, .nest-about *::before, .nest-about *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Jost', sans-serif;
}

.nest-about { background: #ffffff; overflow-x: hidden; }

.nest-about .section-label {
  display: block; font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: #EFA500; margin-bottom: 14px;
}

/* HERO */
.nest-about .about-hero { background: #0c1829; padding: 110px 40px 140px; position: relative; overflow: hidden; color: #fff; }
.nest-about .about-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 70px; background: #EFA500; clip-path: polygon(0 100%, 100% 35%, 100% 100%); }
.nest-about .about-hero::before { content: ''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: rgba(239,165,0,0.05); pointer-events: none; }
.nest-about .about-hero-inner { max-width: 860px; margin: 0 auto; }
.nest-about .about-hero h1 { font-size: clamp(34px, 5.5vw, 56px); font-weight: 800; line-height: 1.15; margin-bottom: 24px; color: #fff; }
.nest-about .about-hero h1 em { color: #EFA500; font-style: normal; }
.nest-about .about-hero p { font-size: clamp(15px, 2vw, 18px); max-width: 580px; line-height: 1.75; color: rgba(255,255,255,0.82); }

@media (max-width: 768px) {
  .nest-about .about-hero { padding: 80px 24px 110px; }
}
</style>

<div class="nest-about">

  <!-- ======== HERO ======== -->
  <div class="about-hero">
    <div class="about-hero-inner">
      <span class="section-label">Über uns</span>
      <h1>Menschen, die<br>Ausbildung wirklich<br><em>verstehen.</em></h1>
      <p>Wir sind Patrick und Mike – zwei Menschen, die selbst als Azubis gestartet sind und heute wissen: Gute Ausbildung braucht mehr als Fachwissen. Sie braucht echte Begegnungen.</p>
    </div>
  </div>

</div>

<!-- GESCHICHTE · Text + Bild -->
<section class="bb-sec">
  <div class="container">
    <div class="bb-split">
      <div>
        <h2 class="bb-h2">Ein gemeinsamer Ausflug. Eine Idee. Ein Ökosystem.</h2>
        <div style="margin-top:22px;">
          <p class="bb-p">Bei einem gemeinsamen Ausflug während des Studiums entdeckten wir unsere Gemeinsamkeiten – und merkten schnell: Obwohl wir beide technische Ausbildungshintergründe haben, schlägt unser Herz für etwas anderes. Für Menschen. Für echte Orientierung. Für Ausbildung, die wirklich wirkt.</p>
          <p class="bb-p">Aus dieser Erkenntnis entstand die NEST BildungsBar – ein kostenfreies Beratungsangebot in Café Atmosphäre, das Schüler:innen unabhängig und auf Augenhöhe bei der Berufswahl begleitet. Heute hat sich daraus ein ganzes Ökosystem entwickelt: mit NEST Explore, AzubiConnect und über 500 begleiteten Schüler:innen pro Jahr.</p>
          <p class="bb-p">Wir verbinden Einrichtungen, Unternehmen und Schüler:innen zu einem starken Netzwerk und gestalten aktives Generationsmanagement, das Ausbildung gemeinsam voranbringt.</p>
        </div>
      </div>
      <div class="bb-frame bb-frame--43"><img src="/assets/img/team/story-patrick-mike.jpg" alt="NEST BildungsBar Patrick und Mike" loading="lazy"></div>
    </div>
  </div>
</section>

<!-- ZITAT · dunkle Sektion -->
<section class="bb-sec bb-sec--dark bb-sec--tight">
  <div class="container">
    <figure class="bb-quote" style="margin:0;">
      <blockquote>„Gute Ausbildung lebt von Menschen, die sich verstehen, unterstützen und gemeinsam wachsen.“</blockquote>
      <figcaption>– Patrick Nekola-Ossé &amp; Mike Stoeck, Gründer NEST</figcaption>
    </figure>
  </div>
</section>

<!-- GRÜNDER · Bild + Text -->
<section class="bb-sec">
  <div class="container">
    <div class="bb-head">
      <h2 class="bb-h2">Zwei, die es selbst erlebt haben.</h2>
      <p class="bb-lead">Wir haben beide als Azubis angefangen und wissen aus eigener Erfahrung, was gute Ausbildung ausmacht – und wie Generationen erfolgreich zusammenarbeiten.</p>
    </div>
    <div class="bb-founders">
      <div class="bb-founder">
        <div class="bb-frame bb-frame--sq"><img src="/assets/img/team/patrick.jpg" alt="Patrick Nekola-Ossé" loading="lazy"></div>
        <h3 class="bb-h3">Patrick Nekola-Ossé</h3>
        <span class="bb-founder__role">Gründer &amp; Geschäftsführer</span>
        <p class="bb-p">Patrick startete seine berufliche Laufbahn mit einer Ausbildung zum Elektriker und qualifizierte sich anschließend berufsbegleitend zum Elektrotechniker weiter. Im Unternehmen übernahm er früh Verantwortung in der Geschäftsleitung mit einem klaren Fokus auf das Thema Ausbildung. Zuletzt war er im Bereich Personalmanagement und Personalentwicklung tätig und hat dort insbesondere das Generationsmanagement im Unternehmen aktiv mitgestaltet und weiterentwickelt.</p>
      </div>
      <div class="bb-founder">
        <div class="bb-frame bb-frame--sq"><img src="/assets/img/team/mike.jpg" alt="Mike Stoeck" loading="lazy"></div>
        <h3 class="bb-h3">Mike Stoeck</h3>
        <span class="bb-founder__role">Gründer &amp; Geschäftsführer</span>
        <p class="bb-p">Mike startete seine berufliche Laufbahn mit einer Ausbildung zum Mechatroniker und entwickelte sich anschließend berufsbegleitend zum Elektrotechniker weiter. Bereits während seiner Ausbildung engagierte er sich als Jugendvertreter und setzte sich im Betriebsrat sowie in der Gewerkschaftsarbeit für junge Menschen ein. Im weiteren Verlauf übernahm er Verantwortung in der Begleitung von Nachwuchskräften und bringt seine Erfahrungen heute in Workshops und Coachings praxisnah, auf Augenhöhe und mit echter Leidenschaft ein.</p>
      </div>
    </div>
  </div>
</section>

<!-- ZAHLEN · Gold-Band -->
<div class="bb-trust">
  <div class="container">
    <p class="bb-trust__title">NEST in Zahlen</p>
    <div class="bb-trust__row bb-trust__row--3">
      <div class="bb-trust__item"><b>500+</b><span>Schüler:innen begleitet pro Jahr</span></div>
      <div class="bb-trust__item"><b>2021</b><span>Gründungsjahr in Wuppertal</span></div>
      <div class="bb-trust__item"><b>4</b><span>Standorte: Wuppertal, Essen, Solingen &amp; Remscheid</span></div>
    </div>
  </div>
</div>

<!-- WERTE · Karten im Raster (Linear „features") -->
<section class="bb-sec">
  <div class="container">
    <div>
      <div class="bb-head">
        <h2 class="bb-h2">Werte, die wir wirklich leben.</h2>
        <p class="bb-lead">Keine leeren Versprechen – Grundsätze, nach denen wir täglich arbeiten.</p>
      </div>
      <ul class="bb-about">
        <li><span class="bb-about__ic">${IC.people}</span><p><b>Auf Augenhöhe.</b> Wir begegnen Schüler:innen, Azubis und Ausbilder:innen respektvoll und offen – ohne Hierarchiedenken, ohne Schubladen. Jeder Mensch verdient echte Aufmerksamkeit.</p></li>
        <li><span class="bb-about__ic">${IC.flame}</span><p><b>Echte Leidenschaft.</b> Ausbildung ist nicht nur unser Job – sie ist unser Antrieb. Wir sind dabei, weil wir wirklich etwas verändern wollen. Das spüren alle, die mit uns arbeiten.</p></li>
        <li><span class="bb-about__ic">${IC.tool}</span><p><b>Praxisnah &amp; konkret.</b> Keine leeren Versprechen, keine generischen Konzepte. Wir entwickeln Lösungen, die im Ausbildungsalltag wirklich funktionieren – weil wir diesen Alltag selbst kennen.</p></li>
        <li><span class="bb-about__ic">${IC.leaf}</span><p><b>Nachhaltig wirksam.</b> Wir denken langfristig – für Azubis, für Betriebe und für die Zukunft der Ausbildung in der Region. Wirkung, die bleibt, ist uns wichtiger als kurzfristige Ergebnisse.</p></li>
      </ul>
    </div>
  </div>
</section>

<!-- TEAM · dunkle Sektion (Linear „Team", Origin) -->
<section class="bb-sec bb-sec--dark">
  <div class="container">
    <div>
      <div class="bb-head">
        <h2 class="bb-h2">Starke Köpfe hinter NEST.</h2>
        <p class="bb-lead">Neben unseren Gründern arbeitet ein engagiertes Team täglich daran, das NEST-Ökosystem weiterzuentwickeln.</p>
      </div>
      <div class="bb-team">
        <div class="bb-person"><img src="/assets/img/team/pascal.png" alt="Pascal Lapuente" loading="lazy"><b>Pascal Lapuente</b><span>Berater</span></div>
        <div class="bb-person"><img src="/assets/img/team/sarah.jpg" alt="Sarah Dubois" loading="lazy"><b>Sarah Dubois</b><span>Beraterin</span></div>
        <div class="bb-person"><img src="/assets/img/team/samuel.jpg" alt="Samuel Baukhage" loading="lazy"><b>Samuel Baukhage</b><span>Berater</span></div>
        <div class="bb-person"><img src="/assets/img/team/sevda.jpg" alt="Sevda Askin" loading="lazy"><b>Sevda Askin</b><span>Sales- &amp; Marketing Managerin</span></div>
      </div>
    </div>
  </div>
</section>

<!-- STANDORTE · Bildkarten (Runway) -->
<section class="bb-sec">
  <div class="container">
    <div class="bb-head">
      <h2 class="bb-h2">Unsere Standorte</h2>
      <p class="bb-lead">Vor Ort – nah an den Menschen, für die wir arbeiten.</p>
    </div>
    <div class="bb-cards">
      <a class="bb-card" href="/terminbuchung">
        <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal (Innenansicht)" loading="lazy"></span>
        <span class="bb-card__title">Wuppertal</span>
        <span class="bb-card__meta">Hochstraße 65 · 42105 Wuppertal<br>Unser Standort im Bergischen</span>
      </a>
      <a class="bb-card" href="/terminbuchung">
        <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-essen.png" alt="BildungsBar Essen (Innenansicht)" loading="lazy"></span>
        <span class="bb-card__title">Essen</span>
        <span class="bb-card__meta">Kopstadtplatz 12 · 45127 Essen<br>Unser Standort im Ruhrgebiet</span>
      </a>
      <a class="bb-card" href="/terminbuchung">
        <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-solingen.jpg" alt="BildungsBar Solingen im Gründerzentrum" loading="lazy"></span>
        <span class="bb-card__title">Solingen</span>
        <span class="bb-card__meta">Grünewalder Straße 29-31 · 42657 Solingen<br>Im Gründerzentrum</span>
      </a>
      <a class="bb-card" href="/terminbuchung">
        <span class="bb-card__tile bb-tile bb-tile--link"><img src="/assets/img/standort-remscheid.webp" alt="BildungsBar Remscheid in der Gründerschmiede" loading="lazy"></span>
        <span class="bb-card__title">Remscheid</span>
        <span class="bb-card__meta">Hindenburgstraße 10a · 42853 Remscheid<br>In der Gründerschmiede</span>
      </a>
    </div>
  </div>
</section>

<!-- ABSCHLUSS · Navy-Karte mit Gold-Kante -->
<section class="bb-sec bb-sec--flush-top">
  <div class="container">
    <div class="bb-cta">
      <div>
        <h2 class="bb-h2">Lern uns kennen – in der BildungsBar.</h2>
        <p class="bb-lead">Buch dir einen kostenfreien Termin oder schreib uns. Wir freuen uns auf dich.</p>
        <div class="bb-actions"><a class="bb-btn bb-btn--gold" href="/terminbuchung">Termin buchen</a><a class="bb-btn bb-btn--light" href="/kontakt">Kontakt aufnehmen</a></div>
      </div>
      <div class="bb-cta__side">
        <div class="bb-cta__item"><a href="https://wa.me/4915753934038"><small>WhatsApp</small><b>01575 393 4038</b></a><span>Schreib uns einfach</span></div>
        <div class="bb-cta__item"><a href="tel:017641933496"><small>Telefon</small><b>0176 419 334 96</b></a><span>Ruf uns an</span></div>
      </div>
    </div>
  </div>
</section>

`;
export default html;
