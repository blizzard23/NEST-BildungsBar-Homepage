"use client";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/* Browser-Client (für das Partner-Portal: Login + eigene Stellen verwalten).
   Ist Supabase noch nicht konfiguriert, bleibt der Client null und die
   Portal-Seite zeigt einen Hinweis statt zu crashen. */
export const supabase = url && anon ? createClient(url, anon) : null;
export const supabaseConfigured = Boolean(url && anon);
