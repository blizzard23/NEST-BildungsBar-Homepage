import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/* Liefert die Belegung je Tag für einen Standort (für die „ausgebucht"-Anzeige).
   Antwort: { kapazitaet: 4|2, belegung: { "YYYY-MM-DD": anzahl } }
   Nur aggregierte Zahlen – keine persönlichen Daten (per SECURITY-DEFINER-Funktion). */
export const dynamic = "force-dynamic";

const KAPAZITAET = { Wuppertal: 4, Essen: 2 };

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const standort = searchParams.get("standort") || "";
  const kapazitaet = KAPAZITAET[standort] || 0;

  const sb = supabaseServer();
  if (!sb || !kapazitaet) return NextResponse.json({ kapazitaet, belegung: {} });

  const { data, error } = await sb.rpc("termin_belegung", { p_standort: standort });
  if (error || !data) return NextResponse.json({ kapazitaet, belegung: {} });

  const belegung = {};
  data.forEach((row) => { belegung[row.datum] = Number(row.anzahl) || 0; });
  return NextResponse.json({ kapazitaet, belegung });
}
