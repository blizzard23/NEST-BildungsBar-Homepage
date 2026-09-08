import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/* Öffentliche Stellen-Liste für die „Aktuelle Stellen"-Leiste auf /berufswelt.
   Liefert ein Array im Format, das stellen-ui.js erwartet:
   { firma, beruf, art, ort, start, url, logoUrl, aktiviertAm }.

   fetchCache/revalidate zusätzlich zu dynamic: Next legte die Supabase-Antwort
   sonst ein Jahr lang im Data Cache ab, wodurch neu veröffentlichte Stellen nie
   auf der Website ankamen (siehe lib/supabaseServer.js). */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

/* Stellen sind 30 Tage sichtbar. Die RLS-Policy filtert das bereits, die Route
   grenzt es zusätzlich selbst ein – so bleibt die Antwort auch dann korrekt,
   wenn sie einmal mit einem anderen Schlüssel abgefragt wird. */
const SICHTBAR_TAGE = 30;

function abDatum() {
  const d = new Date();
  d.setDate(d.getDate() - SICHTBAR_TAGE);
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const noStore = { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } };

  const sb = supabaseServer();
  if (!sb) {
    console.error("/api/stellen: Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY fehlen).");
    return NextResponse.json([], noStore);
  }

  const { data, error } = await sb
    .from("stellen")
    .select("firma,beruf,art,ort,start,url,logo_url,keywords,aktiviert_am")
    .gte("aktiviert_am", abDatum())
    .order("aktiviert_am", { ascending: false });

  // Ohne diese Meldung bleibt ein Fehler unsichtbar: Die Leiste zeigt dann
  // einfach nichts an, als gäbe es keine offenen Stellen.
  if (error) {
    console.error("/api/stellen: Abfrage fehlgeschlagen –", error.message);
    return NextResponse.json([], noStore);
  }
  if (!data) return NextResponse.json([], noStore);

  const out = data.map((r) => ({
    firma: r.firma,
    beruf: r.beruf,
    art: r.art,
    ort: r.ort,
    start: r.start || "",
    url: r.url || "",
    logoUrl: r.logo_url || "",
    keywords: Array.isArray(r.keywords) ? r.keywords : [],
    aktiviertAm: r.aktiviert_am,
  }));
  return NextResponse.json(out, noStore);
}
