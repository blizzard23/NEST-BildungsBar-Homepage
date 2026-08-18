import { createClient } from "@supabase/supabase-js";

/* Server-Client (read-only öffentliche Daten: Stellen, Blog).
   Nutzt den anon-Key + RLS. Gibt null zurück, wenn nicht konfiguriert.
   Wichtig: Next/Vercel legt fetch()-Antworten aus Route-Handlern in den
   Data Cache – auch bei dynamic = "force-dynamic". Dadurch lieferte
   /api/stellen gelöschte oder geänderte Stellen weiter aus. Der Client
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
