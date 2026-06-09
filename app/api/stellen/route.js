import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/* Öffentliche Stellen-Liste für die „Aktuelle Stellen"-Leiste auf /deine-zukunft.
   Liefert ein Array im Format, das stellen-ui.js erwartet:
   { firma, beruf, art, ort, start, url, aktiviertAm }. */
export const dynamic = "force-dynamic";

export async function GET() {
  const sb = supabaseServer();
  if (!sb) return NextResponse.json([]); // Supabase noch nicht konfiguriert

  const { data, error } = await sb
    .from("stellen")
    .select("firma,beruf,art,ort,start,url,aktiviert_am")
    .order("aktiviert_am", { ascending: false });

  if (error || !data) return NextResponse.json([]);

  const out = data.map((r) => ({
    firma: r.firma,
    beruf: r.beruf,
    art: r.art,
    ort: r.ort,
    start: r.start || "",
    url: r.url || "",
    aktiviertAm: r.aktiviert_am,
  }));
  return NextResponse.json(out);
}
