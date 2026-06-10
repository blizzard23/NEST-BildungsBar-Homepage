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
    <a className={"btn btn-ghost nav-portal" + (eingeloggt ? " is-eingeloggt" : "")} href="/partner-portal">
      {eingeloggt ? (
        <><span className="login-dot" aria-hidden="true"></span>Eingeloggt</>
      ) : "Partner-Login"}
    </a>
  );
}
