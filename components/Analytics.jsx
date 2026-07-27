"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

/* Vercel Web Analytics – zählt Besucher und Seitenaufrufe (cookiefrei,
 * keine personenbezogenen Profile). Geladen wird das Skript aber erst,
 * wenn im Cookie-Banner die Kategorie "Statistik" zugestimmt wurde
 * – siehe public/cookie-consent.js. */

const STORAGE_KEY = "nest_cookie_consent";

function statistikErlaubt() {
  if (typeof window === "undefined") return false;
  // cookie-consent.js wird "afterInteractive" geladen und ist hier evtl. noch
  // nicht da – dann direkt aus dem localStorage lesen.
  if (window.NestCookieConsent) return window.NestCookieConsent.hasConsent("statistics");
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return !!(data && data.statistics);
  } catch (e) {
    return false;
  }
}

export default function ConsentAnalytics() {
  const [erlaubt, setErlaubt] = useState(false);

  useEffect(() => {
    setErlaubt(statistikErlaubt());
    const onConsent = (e) => setErlaubt(!!(e.detail && e.detail.statistics));
    window.addEventListener("nest:cookie-consent", onConsent);
    return () => window.removeEventListener("nest:cookie-consent", onConsent);
  }, []);

  return erlaubt ? <Analytics /> : null;
}
