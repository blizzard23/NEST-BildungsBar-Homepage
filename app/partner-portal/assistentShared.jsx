"use client";
import { supabase } from "@/lib/supabaseClient";

// Themen für Wissensbeiträge und geteilte Erfahrungen
export const KATEGORIEN = [
  "Azubis finden",
  "Bewerbung & Auswahl",
  "Onboarding",
  "Azubis halten",
  "Generation Z",
  "Berufsschule & Prüfungen",
  "NEST-Angebote",
  "Sonstiges",
];

// Aktuelles Zugangs-Token (Supabase erneuert es selbst, daher bei jedem Aufruf frisch holen)
export async function zugangsToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
}

// POST an eine eigene API-Route im Namen des angemeldeten Betriebs
export async function apiPost(pfad, body) {
  const token = await zugangsToken();
  const res = await fetch(pfad, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
    body: JSON.stringify(body),
  });
  let daten = {};
  try { daten = await res.json(); } catch { /* leere Antwort */ }
  if (!res.ok) throw new Error(daten.error || "Das hat gerade nicht geklappt. Bitte versucht es später noch einmal.");
  return daten;
}

export function datumKurz(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// **fett** innerhalb einer Zeile
function inline(text, schluessel) {
  const teile = String(text).split(/(\*\*[^*]+\*\*)/g);
  return teile.map((t, i) =>
    /^\*\*[^*]+\*\*$/.test(t) ? <strong key={schluessel + "-" + i}>{t.slice(2, -2)}</strong> : <span key={schluessel + "-" + i}>{t}</span>
  );
}

/* Antworttext des Assistenten ohne HTML-Einschleusung darstellen:
   Absätze, Aufzählungen mit „-“ oder „•“, nummerierte Listen und **fett**. */
export function FormatierterText({ text }) {
  const bloecke = [];
  let liste = null;
  String(text || "").split(/\n/).forEach((zeile, i) => {
    const z = zeile.trimEnd();
    const punkt = z.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)$/);
    if (punkt) {
      if (!liste) { liste = { art: /^\s*\d/.test(z) ? "ol" : "ul", punkte: [] }; bloecke.push(liste); }
      liste.punkte.push(punkt[1]);
      return;
    }
    liste = null;
    if (!z.trim()) { bloecke.push(null); return; }
    const letzter = bloecke[bloecke.length - 1];
    if (letzter && letzter.art === "p") letzter.zeilen.push(z);
    else bloecke.push({ art: "p", zeilen: [z] });
  });
  return (
    <>
      {bloecke.filter(Boolean).map((b, i) => {
        if (b.art === "p") {
          return <p key={i}>{b.zeilen.map((z, j) => <span key={j}>{j ? <br /> : null}{inline(z, i + "-" + j)}</span>)}</p>;
        }
        const Tag = b.art;
        return <Tag key={i}>{b.punkte.map((p, j) => <li key={j}>{inline(p, i + "-" + j)}</li>)}</Tag>;
      })}
    </>
  );
}
