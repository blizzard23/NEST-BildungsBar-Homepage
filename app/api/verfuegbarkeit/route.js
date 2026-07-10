import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/* Liefert die Belegung je Tag für einen Standort (für die „ausgebucht"-/Restplatz-Anzeige).
   Antwort: { kapazitaet: 4|2, belegung: { "YYYY-MM-DD": anzahl } }
   Bevorzugt den Service-Role-Client (direktes Zählen). Fällt darauf zurück, die
   SECURITY-DEFINER-Funktion termin_belegung über den anon-Client aufzurufen.
   Es werden nur Zahlen zurückgegeben – keine persönlichen Daten. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const KAPAZITAET = { Wuppertal: 4, Essen: 2, Solingen: 2, Remscheid: 2 };

function heuteISO() {
  const d = new Date();
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const standort = searchParams.get("standort") || "";
  const kapazitaet = KAPAZITAET[standort] || 0;
  const belegung = {};
  if (!kapazitaet) return NextResponse.json({ kapazitaet, belegung }, { headers: { "Cache-Control": "no-store" } });

  // Weg 1: Service-Role -> direkt zählen (unabhängig von SQL-Funktion/RLS)
  const admin = supabaseAdmin();
  if (admin) {
    const { data, error } = await admin
      .from("buchungen").select("datum")
      .eq("standort", standort).gte("datum", heuteISO()).not("datum", "is", null);
    if (!error && data) {
      data.forEach((r) => { const k = String(r.datum).slice(0, 10); belegung[k] = (belegung[k] || 0) + 1; });
      return NextResponse.json({ kapazitaet, belegung }, { headers: { "Cache-Control": "no-store" } });
    }
  }

  // Weg 2: anon -> SECURITY-DEFINER-Funktion termin_belegung
  const sb = supabaseServer();
  if (sb) {
    const { data, error } = await sb.rpc("termin_belegung", { p_standort: standort });
    if (!error && Array.isArray(data)) {
      data.forEach((row) => { belegung[String(row.datum).slice(0, 10)] = Number(row.anzahl) || 0; });
    }
  }
  return NextResponse.json({ kapazitaet, belegung }, { headers: { "Cache-Control": "no-store" } });
}
