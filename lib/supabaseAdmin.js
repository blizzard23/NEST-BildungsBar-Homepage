import { createClient } from "@supabase/supabase-js";

/* Service-Role-Client – nur serverseitig (Cron/Erinnerungen) verwenden!
   Umgeht RLS, daher NIE im Browser einsetzen und den Key nur als
   SUPABASE_SERVICE_ROLE_KEY (ohne NEXT_PUBLIC_) hinterlegen. */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
