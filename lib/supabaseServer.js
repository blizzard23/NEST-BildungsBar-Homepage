import { createClient } from "@supabase/supabase-js";

/* Server-Client (read-only öffentliche Daten: Stellen, Blog).
   Nutzt den anon-Key + RLS. Gibt null zurück, wenn nicht konfiguriert.

   Wichtig: Next/Vercel legt fetch()-Antworten aus Route-Handlern und Seiten im
   Data Cache ab – auch bei dynamic = "force-dynamic". Die Supabase-Abfrage aus
   /api/stellen landete dort mit revalidate = 31536000 (ein Jahr) und wurde nie
   erneuert: Die Route lieferte dauerhaft den Stand der allerersten Anfrage aus
   (leere Liste), obwohl in der Datenbank längst Stellen standen. Der Client
   erzwingt deshalb cache: "no-store" für alle Supabase-Anfragen. */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}
