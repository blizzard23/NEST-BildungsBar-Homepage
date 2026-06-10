"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* Header-Button: zeigt an, ob man im Partner-Portal eingeloggt ist. */
export default function PartnerLoginButton() {
  const [eingeloggt, setEingeloggt] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setEingeloggt(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEingeloggt(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <a
      className={"nav-portal-icon" + (eingeloggt ? " is-eingeloggt" : "")}
      href="/partner-portal"
      aria-label={eingeloggt ? "Partner-Portal – eingeloggt" : "Partner-Login"}
      title={eingeloggt ? "Partner-Portal (eingeloggt)" : "Partner-Login"}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      {eingeloggt && <span className="portal-dot" aria-hidden="true" />}
    </a>
  );
}
