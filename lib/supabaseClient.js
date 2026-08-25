"use client";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/* Beim Klick auf den Passwort-Link hängt Supabase das Ergebnis als #-Fragment an
   die URL (Tokens bzw. eine Fehlermeldung, wenn der Link abgelaufen ist).
   createClient() liest das Fragment sofort aus und entfernt es – deshalb merken
   wir uns hier VOR dem createClient-Aufruf, worum es ging. Das Portal kann
   dadurch zuverlässig die Maske "neues Passwort" bzw. den Hinweis auf einen
   abgelaufenen Link anzeigen. */
function fragment() {
  if (typeof window === "undefined") return null;
  const roh = window.location.hash.replace(/^#/, "");
  return roh ? new URLSearchParams(roh) : null;
}
const frag = fragment();
export const istRecoveryLink = frag?.get("type") === "recovery";
export const linkFehler = frag ? (frag.get("error_description") || frag.get("error") || "") : "";

/* Browser-Client (für das Partner-Portal: Login + eigene Stellen verwalten).
   Ist Supabase noch nicht konfiguriert, bleibt der Client null und die
   Portal-Seite zeigt einen Hinweis statt zu crashen. */
export const supabase = url && anon ? createClient(url, anon) : null;
export const supabaseConfigured = Boolean(url && anon);
