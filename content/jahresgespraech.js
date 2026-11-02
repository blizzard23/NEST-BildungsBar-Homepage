// Jahresplanungsgespräch 2027: Partnerunternehmen buchen ihr Jahresgespräch
// direkt im eingebetteten Microsoft-Bookings-Kalender.
// Gestaltung nach dem Redesign (public/assets/bb.css) plus jahresgespraech.css.
// Vorlagen (Mobbin): Calendly / Zoom Scheduler / Shade (Buchungskarte mit
// Termindetails links, Kalender rechts), Kooperation-Hero (Phone mit schwebenden Hinweisen).
import IC from "./icons";

const BOOKINGS_URL =
  "https://bookings.cloud.microsoft/book/Jahresgesrch@nest-bildungsbar.de/?ismsaljsauthenabled";

const html = `

  <!-- HERO (wie die anderen Seiten: Text links, Phone-Mockup rechts) -->
  <section class="hero jg-hero">
    <div class="container"><div class="hero-inner">
      <div class="hero-text">
        <span class="hero-badge">Für NEST-Partner</span>
        <h1>Dein Jahresplanungs&shy;gespräch<br /><em>2027</em></h1>
        <p class="lead">Lass uns gemeinsam dein Ausbildungsjahr 2027 planen! In 45 Minuten schauen wir, was bei dir ansteht und wo wir dich am besten unterstützen können.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#kalender">Termin wählen →</a>
          <a class="btn btn-ghost" href="#themen">Was wir besprechen</a>
        </div>
      </div>
      <div class="hero-visual hero-visual--phone jg-hero-visual">
        <a class="hero-phone" href="#kalender" aria-label="Zum Kalender: Jahresplanungsgespräch 2027 buchen">
          <span class="hp-notch"></span>
          <div class="hp-screen jg-hp">
            <span class="hp-badge">Jahresgespräch</span>
            <div class="hp-title">Plane dein Jahr 2027</div>
            <div class="jg-hp-service">
              <span class="jg-hp-service-ic">${IC.calendar}</span>
              <span><b>Jahresplanungsgespräch</b><small>45 Min · für NEST-Partner</small></span>
            </div>
            <div class="jg-hp-cal">
              <div class="jg-hp-cal-head"><b>November 2026</b><span>&#8249; &#8250;</span></div>
              <div class="jg-hp-cal-grid">
                <span class="jg-hp-wd">Mo</span><span class="jg-hp-wd">Di</span><span class="jg-hp-wd">Mi</span><span class="jg-hp-wd">Do</span><span class="jg-hp-wd">Fr</span>
                <span>2</span><span>3</span><span class="is-free">4</span><span>5</span><span class="is-free">6</span>
                <span class="is-free">9</span><span>10</span><span class="is-free">11</span><span class="is-free">12</span><span>13</span>
                <span class="is-free">16</span><span class="is-free">17</span><span>18</span><span class="is-free">19</span><span>20</span>
                <span>23</span><span class="is-sel">24</span><span class="is-free">25</span><span>26</span><span class="is-free">27</span>
              </div>
            </div>
            <div class="jg-hp-slots">
              <span>09:00</span><span class="is-sel">10:30</span><span>14:00</span>
            </div>
            <div class="jg-hp-btn">Termin buchen</div>
          </div>
        </a>
        <div class="jg-float jg-float--top" aria-hidden="true"><span class="jg-float-ic">${IC.calendar}</span><span><b>Termin gebucht</b><small>Di · 24.11. · 10:30 Uhr</small></span></div>
        <div class="jg-float jg-float--bottom" aria-hidden="true"><span class="jg-float-ic jg-float-ic--navy">${IC.check}</span><span><b>Dein Jahr 2027</b><small>Explore und Workshops geplant</small></span></div>
      </div>
    </div></div>
  </section>

  <!-- THEMEN · Spalten mit Trennlinien (Linear) -->
  <section class="bb-sec bb-sec--tight jg-themen" id="themen">
    <div class="container">
      <div class="bb-head bb-head--split">
        <div>
          <span class="bb-kicker">45 Minuten für dein Ausbildungsjahr</span>
          <h2 class="bb-h2">Das schauen wir uns <span class="bb-hl">gemeinsam an</span></h2>
        </div>
        <p class="bb-lead">Wir planen mit dir, wo wir dich 2027 am besten unterstützen können. Du gehst mit einem klaren Plan aus dem Gespräch.</p>
      </div>
      <div class="bb-cols">
        <div class="bb-col"><span class="bb-col__ic">${IC.target}</span><div class="bb-col__body"><h3>Was bei dir ansteht</h3><p>Wie sieht dein Ausbildungsjahr 2027 aus? Wir verschaffen uns gemeinsam einen Überblick.</p></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.compass}</span><div class="bb-col__body"><h3>NEST Explore Termine</h3><p>Welche NEST Explore Termine passen zu dir? Wir suchen die passenden Schulen und Tage aus.</p><a class="bb-link" href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de</a></div></div>
        <div class="bb-col"><span class="bb-col__ic">${IC.people}</span><div class="bb-col__body"><h3>Workshops</h3><p>Wann lohnen sich Workshops wie Azubi Knigge oder der Evaluationsworkshop? Wir planen sie passend ein.</p><a class="bb-link" href="https://nest-azubiconnect.de" target="_blank" rel="noopener">nest-azubiconnect.de</a></div></div>
      </div>
    </div>
  </section>

  <!-- KALENDER · Buchungskarte: Termindetails links, Microsoft Bookings rechts -->
  <section class="bb-sec bb-sec--band jg-book-sec" id="kalender">
    <div class="container jg-container">
      <div class="jg-book">
        <aside class="jg-details">
          <span class="jg-details-badge">${IC.clock} 45 Minuten</span>
          <h2 class="jg-details-h">Dein Jahres&shy;planungs&shy;gespräch 2027</h2>
          <p class="jg-details-p">Lass uns gemeinsam dein Ausbildungsjahr 2027 planen! In 45 Minuten schauen wir, was bei dir ansteht und wo wir dich am besten unterstützen können: Welche NEST Explore Termine passen zu dir? Wann lohnen sich Workshops wie Azubi Knigge oder der Evaluationsworkshop?</p>

          <ol class="jg-steps">
            <li><span class="jg-steps-n">1</span><div><b>Termin wählen</b><span>Tag und Uhrzeit im Kalender aussuchen.</span></div></li>
            <li><span class="jg-steps-n">2</span><div><b>Daten eintragen</b><span>Name, E-Mail und dein Unternehmen.</span></div></li>
            <li><span class="jg-steps-n">3</span><div><b>Bestätigung erhalten</b><span>Die Einladung kommt per E-Mail.</span></div></li>
          </ol>

          <div class="jg-help">
            <b>Kein passender Termin dabei?</b>
            <span>Schreib uns oder ruf an, wir finden einen.</span>
            <a class="bb-link" href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>
            <a class="bb-link" href="tel:017641933496">0176 419 334 96</a>
          </div>
        </aside>

        <div class="jg-cal">
          <div class="jg-cal-bar">
            <span class="jg-cal-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="jg-cal-title">${IC.calendar} Termin wählen</span>
            <a class="jg-cal-ext" href="${BOOKINGS_URL}" target="_blank" rel="noopener">In neuem Tab öffnen ↗</a>
          </div>
          <div class="jg-cal-frame">
            <div class="jg-cal-loading" aria-hidden="true"><span class="jg-spinner"></span>Kalender wird geladen …</div>
            <iframe src="${BOOKINGS_URL}" title="Kalender: Jahresplanungsgespräch 2027 buchen" width="100%" height="100%" scrolling="yes" style="border:0" loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <p class="jg-note">Der Kalender wird über Microsoft Bookings bereitgestellt. Lädt er nicht? <a class="bb-link" href="${BOOKINGS_URL}" target="_blank" rel="noopener">Hier direkt buchen ↗</a></p>
    </div>
  </section>

`;
export default html;
