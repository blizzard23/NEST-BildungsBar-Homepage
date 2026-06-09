import { createClient } from "@supabase/supabase-js";

/* Server-Client (read-only öffentliche Daten: Stellen, Blog).
   Nutzt den anon-Key + RLS. Gibt null zurück, wenn nicht konfiguriert. */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}
