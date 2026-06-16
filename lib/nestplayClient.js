"use client";
import { createClient } from "@supabase/supabase-js";

/* ───────────────────────────────────────────────────────────────────────────
   Anbindung an NESTplay (nest-play.de)

   NESTplay verwaltet die „Spiele" der Unternehmen in einem eigenen Supabase-
   Projekt. Die Spiele sind öffentlich lesbar (RLS-Regel „Games are viewable by
   everyone"), daher genügt der öffentliche anon-Key. Es wird ausschließlich
   gelesen, niemals geschrieben.

   Tabelle  games(id, name, category, description, cover_image, unternehmen,
                  user_id, game_status)  ·  „Live" = online sichtbar

   Konfiguration über Umgebungsvariablen:
     NEXT_PUBLIC_NESTPLAY_SUPABASE_URL       Project-URL des nestplay-Projekts
     NEXT_PUBLIC_NESTPLAY_SUPABASE_ANON_KEY  anon / public Key desselben Projekts
     NEXT_PUBLIC_NESTPLAY_URL                (optional) Basis-URL, Standard nest-play.de
   ─────────────────────────────────────────────────────────────────────────── */

const url = process.env.NEXT_PUBLIC_NESTPLAY_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_NESTPLAY_SUPABASE_ANON_KEY;

export const nestplay = url && anon ? createClient(url, anon) : null;
export const nestplayConfigured = Boolean(url && anon);

export const NESTPLAY_URL = (process.env.NEXT_PUBLIC_NESTPLAY_URL || "https://nest-play.de").replace(/\/+$/, "");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/* Live-Spiele eines Unternehmens laden.
   Mapping: UUID  → games.user_id, sonst Firmenname → games.unternehmen */
export async function fetchGamesForCompany(ref) {
  if (!nestplay || !ref) return [];
  ref = String(ref).trim();
  if (!ref) return [];
  let query = nestplay
    .from("games")
    .select("id,name,category,description,cover_image,unternehmen")
    .eq("game_status", "Live");
  query = UUID_RE.test(ref) ? query.eq("user_id", ref) : query.eq("unternehmen", ref);
  const { data, error } = await query;
  if (error) { console.warn("[nestplay] Spiele konnten nicht geladen werden:", error.message); return []; }
  return data || [];
}

/* Gesamtzahl aller „Live"-Spiele im NESTplay-Netzwerk (für den Vergleich im Dashboard). */
export async function fetchLiveGamesTotal() {
  if (!nestplay) return 0;
  const { count, error } = await nestplay
    .from("games")
    .select("*", { count: "exact", head: true })
    .eq("game_status", "Live");
  if (error) { console.warn("[nestplay] Gesamtanzahl nicht ladbar:", error.message); return 0; }
  return count || 0;
}

/* Link, der ein Spiel im Solo-Modus auf nest-play.de öffnet. */
export function gameUrl(game) { return `${NESTPLAY_URL}/solo/${game.id}`; }
