"use client";
import { useEffect } from "react";

/* Steuerung für das Erklärvideo (Markup aus lib/erklaervideo.js). Arbeitet per
   Event-Delegation am document, damit es auch für HTML-Inhalte aus content/*.js
   und für erst später gerenderte Bereiche (Partner-Login) funktioniert.

   - [data-ev-sprung="<id>"]: scrollt zum Video im Element <id> und startet es.
     Ohne JavaScript bleibt es ein normaler Anker-Link.
   - [data-ev-start] in .ev: großer Play-Button auf dem Vorschaubild.
   - [data-ev-t="<sek>"] in .ev: springt im Video zu dieser Stelle und spielt ab.
   - Während das Video läuft, ist das aktuelle Kapitel markiert. */

function abspielenAb(video, t) {
  if (t != null) {
    // Bei preload="none" kennt der Browser die Länge noch nicht; Safari ignoriert
    // currentTime dann. Deshalb erst setzen, wenn die Metadaten da sind.
    if (video.readyState >= 1) video.currentTime = t;
    else video.addEventListener("loadedmetadata", () => { video.currentTime = t; }, { once: true });
  }
  // play() direkt im Klick aufrufen: so gilt es als Nutzeraktion und läuft mit Ton.
  const p = video.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function kapitelMarkieren(video) {
  const box = video.closest(".ev");
  if (!box) return;
  const knoepfe = Array.from(box.querySelectorAll("[data-ev-t]"));
  let aktiv = null;
  for (const k of knoepfe) if (Number(k.dataset.evT) <= video.currentTime + 0.25) aktiv = k;
  for (const k of knoepfe) {
    const ist = k === aktiv;
    k.classList.toggle("is-aktiv", ist);
    if (ist) k.setAttribute("aria-current", "true");
    else k.removeAttribute("aria-current");
  }
}

export default function ErklaervideoSteuerung() {
  useEffect(() => {
    const ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const beimKlick = (e) => {
      const sprung = e.target.closest("[data-ev-sprung]");
      if (sprung) {
        const ziel = document.getElementById(sprung.dataset.evSprung);
        const video = ziel && ziel.querySelector("video");
        if (!video) return;
        e.preventDefault();
        video.scrollIntoView({ behavior: ruhig ? "auto" : "smooth", block: "center" });
        abspielenAb(video, null);
        return;
      }
      const start = e.target.closest(".ev [data-ev-start]");
      if (start) {
        const video = start.closest(".ev").querySelector("video");
        if (video) abspielenAb(video, null);
        return;
      }
      const kapitel = e.target.closest(".ev [data-ev-t]");
      if (kapitel) {
        const video = kapitel.closest(".ev").querySelector("video");
        if (!video) return;
        abspielenAb(video, Number(kapitel.dataset.evT));
        kapitelMarkieren(video);
      }
    };
    // Medien-Events steigen nicht auf, kommen aber in der Capture-Phase am document an.
    const beimAbspielen = (e) => {
      if (e.target instanceof HTMLVideoElement && e.target.closest(".ev")) kapitelMarkieren(e.target);
    };

    // Sobald das Video einmal läuft, verschwindet der große Play-Button.
    const beimStart = (e) => {
      if (e.target instanceof HTMLVideoElement) e.target.closest(".ev-player")?.classList.add("is-gestartet");
    };

    document.addEventListener("click", beimKlick);
    document.addEventListener("play", beimStart, true);
    document.addEventListener("timeupdate", beimAbspielen, true);
    document.addEventListener("seeked", beimAbspielen, true);
    return () => {
      document.removeEventListener("click", beimKlick);
      document.removeEventListener("play", beimStart, true);
      document.removeEventListener("timeupdate", beimAbspielen, true);
      document.removeEventListener("seeked", beimAbspielen, true);
    };
  }, []);

  return null;
}
