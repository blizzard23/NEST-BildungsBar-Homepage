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

// Antworttext formatieren: liegt in components/, weil auch der Azubi-Chat ihn nutzt
export { FormatierterText } from "@/components/FormatierterText";
