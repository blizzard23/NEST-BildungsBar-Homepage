// Erklärvideo zur NEST-Partnerschaft (3:03 Min.). Eingebunden auf /kooperation
// (unter den drei Stationen, Sprung-Button im Hero) und im Partner-Login
// (Abschnitt „Erklärvideo“, Sprung-Button in der Begrüßung).
// Abspielen, Kapitelsprünge und das markierte Kapitel steuert
// components/ErklaervideoSteuerung.jsx.

export const ERKLAERVIDEO_SRC = "/assets/video/nest-partnerschaft-erklaervideo.mp4";
export const ERKLAERVIDEO_POSTER = "/assets/video/nest-partnerschaft-erklaervideo.jpg";
export const ERKLAERVIDEO_DAUER = "3 Min.";

// Kapitel = Angebote der Partnerschaft. t = Startsekunde im Video.
// art: finden (Gold, Azubis gewinnen) · halten (Blau) · partner (neutral)
export const ERKLAERVIDEO_KAPITEL = [
  { t: 27, titel: "Schul-Workshops", art: "finden" },
  { t: 34, titel: "NESTplay", art: "finden" },
  { t: 55, titel: "NEST Explore", art: "finden" },
  { t: 98, titel: "Beratung in der BildungsBar", art: "finden" },
  { t: 113, titel: "Berufswelt & Stellen", art: "finden" },
  { t: 124, titel: "Unterstützung in der Ausbildung", art: "halten" },
  { t: 140, titel: "Partner-Login", art: "partner" },
  { t: 160, titel: "Preise", art: "partner" },
];

export function videoZeit(s) {
  return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

// Player + Kapitelliste als HTML. Wird auf /kooperation in den Seiten-HTML-String
// eingesetzt und im Partner-Login über dangerouslySetInnerHTML gerendert.
export function erklaervideoHtml() {
  const kapitel = ERKLAERVIDEO_KAPITEL.map(
    (k) =>
      `<li><button type="button" class="ev-k ev-k--${k.art}" data-ev-t="${k.t}"><span class="ev-k-zeit">${videoZeit(k.t)}</span><span class="ev-k-name">${k.titel}</span></button></li>`
  ).join("");
  return `
    <div class="ev">
      <div class="ev-player">
        <video class="ev-video" controls preload="none" playsinline poster="${ERKLAERVIDEO_POSTER}" aria-label="Erklärvideo: Die NEST-Partnerschaft in drei Minuten">
          <source src="${ERKLAERVIDEO_SRC}" type="video/mp4" />
          Euer Browser kann das Video hier nicht abspielen. <a href="${ERKLAERVIDEO_SRC}">Video herunterladen</a>.
        </video>
        <button type="button" class="ev-start" data-ev-start><span class="ev-start-ic"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg></span>Video abspielen <small>3:03</small></button>
      </div>
      <nav class="ev-kapitel" aria-label="Kapitel des Erklärvideos">
        <span class="ev-kapitel-titel">Direkt zum Angebot springen</span>
        <ol>${kapitel}</ol>
      </nav>
    </div>`;
}
