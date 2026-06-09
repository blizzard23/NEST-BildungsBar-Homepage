"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

const LEER = { firma: "", beruf: "", art: "Ausbildung", ort: "Wuppertal", start: "", url: "" };

export default function PartnerPortal() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [stellen, setStellen] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(LEER);
  const [msg, setMsg] = useState("");

  // Session beobachten
  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const ladeDaten = useCallback(async () => {
    if (!supabase || !session) return;
    const { data: st } = await supabase
      .from("stellen").select("*")
      .eq("partner_id", session.user.id)
      .order("aktiviert_am", { ascending: false });
    setStellen(st || []);
    if (st && st.length && !form.firma) setForm((f) => ({ ...f, firma: st[0].firma || "" }));

    const heute = new Date().toISOString().slice(0, 10);
    const { data: ev } = await supabase
      .from("veranstaltungen").select("*")
      .gte("datum", heute).order("datum", { ascending: true });
    setEvents(ev || []);
  }, [session]); // eslint-disable-line

  useEffect(() => { if (session) ladeDaten(); }, [session, ladeDaten]);

  async function login(e) {
    e.preventDefault();
    setAuthErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setAuthErr("Login fehlgeschlagen: " + error.message);
  }
  async function logout() { await supabase.auth.signOut(); setStellen([]); setEvents([]); }

  async function speichern(e) {
    e.preventDefault();
    setMsg("");
    const eintrag = { ...form, partner_id: session.user.id, aktiviert_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("stellen").insert(eintrag);
    if (error) { setMsg("Fehler: " + error.message); return; }
    setForm((f) => ({ ...LEER, firma: f.firma }));
    setMsg("Stelle veröffentlicht ✅ (30 Tage sichtbar)");
    ladeDaten();
  }
  async function loeschen(id) {
    await supabase.from("stellen").delete().eq("id", id);
    ladeDaten();
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <section className="hero">
        <div className="container"><div className="hero-inner"><div className="hero-text">
          <span className="hero-badge">Partner-Portal</span>
          <h1>Willkommen im<br /><em>Partner-Portal</em></h1>
          <p className="lead">Verwalte deine Ausbildungsstellen, sieh dir kommende Veranstaltungen an – alles an einem Ort.</p>
        </div></div></div>
      </section>

      <section className="bg-light">
        <div className="container" style={{ maxWidth: "920px" }}>

          {!supabaseConfigured ? (
            <div className="card"><h3>Supabase noch nicht verbunden</h3>
              <p>Trage in den Umgebungsvariablen <code>NEXT_PUBLIC_SUPABASE_URL</code> und <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ein (siehe README), dann funktioniert das Login.</p>
            </div>
          ) : loading ? (
            <p>Lädt …</p>
          ) : !session ? (
            /* ---------- Login ---------- */
            <div className="card" style={{ maxWidth: "440px", margin: "0 auto" }}>
              <span className="section-label">Anmeldung</span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 18px" }}>Partner-Login</h2>
              <form onSubmit={login} className="tb-form">
                <div className="field"><label>E-Mail</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div className="field"><label>Passwort</label><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required /></div>
                {authErr ? <p style={{ color: "#c2415a", fontSize: "14px" }}>{authErr}</p> : null}
                <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>Anmelden</button>
              </form>
              <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "16px" }}>
                Noch kein Zugang? Partner-Accounts werden vom NEST-Team angelegt – melde dich unter <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>.
              </p>
            </div>
          ) : (
            /* ---------- Eingeloggt ---------- */
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
                <div><span className="section-label">Eingeloggt</span><strong style={{ color: "var(--navy)", fontSize: "18px" }}>{session.user.email}</strong></div>
                <button className="btn btn-ghost" onClick={logout}>Abmelden</button>
              </div>

              {/* Neue Stelle */}
              <div className="card" style={{ marginBottom: "28px" }}>
                <h3>Neue Ausbildungsstelle veröffentlichen</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "16px" }}>Erscheint auf „Deine Zukunft" – automatisch 30 Tage sichtbar.</p>
                <form onSubmit={speichern} className="tb-form">
                  <div className="row2">
                    <div className="field"><label>Unternehmen *</label><input value={form.firma} onChange={set("firma")} required /></div>
                    <div className="field"><label>Beruf *</label><input value={form.beruf} onChange={set("beruf")} placeholder="z. B. Mechatroniker:in" required /></div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Art</label>
                      <select value={form.art} onChange={set("art")}>
                        <option>Ausbildung</option><option>Duales Studium</option><option>Praktikum</option>
                      </select>
                    </div>
                    <div className="field"><label>Standort</label>
                      <select value={form.ort} onChange={set("ort")}><option>Wuppertal</option><option>Essen</option></select>
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Start / Dauer</label><input value={form.start} onChange={set("start")} placeholder="z. B. ab 08/2026 · 3,5 Jahre" /></div>
                    <div className="field"><label>Link (Bewerbung/Karriereseite)</label><input value={form.url} onChange={set("url")} placeholder="https://…" /></div>
                  </div>
                  {msg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{msg}</p> : null}
                  <button className="btn btn-primary" type="submit">Stelle veröffentlichen</button>
                </form>
              </div>

              {/* Eigene Stellen */}
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Deine Stellen ({stellen.length})</h3>
              {stellen.length ? (
                <div className="card-grid cols-2" style={{ marginBottom: "28px" }}>
                  {stellen.map((s) => (
                    <div className="card" key={s.id}>
                      <span className="badge">{s.art} · {s.ort}</span>
                      <h3 style={{ marginTop: "10px" }}>{s.beruf}</h3>
                      <p style={{ color: "var(--text-soft)" }}>{s.firma}{s.start ? " · " + s.start : ""}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-mute)" }}>aktiviert am {s.aktiviert_am}</p>
                      <button className="btn btn-ghost" style={{ marginTop: "8px" }} onClick={() => loeschen(s.id)}>Löschen</button>
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: "var(--text-soft)", marginBottom: "28px" }}>Du hast noch keine Stellen veröffentlicht.</p>}

              {/* Veranstaltungen */}
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Kommende Veranstaltungen</h3>
              {events.length ? (
                <div className="card-grid cols-2">
                  {events.map((v) => (
                    <div className="card" key={v.id}>
                      <span className="num-label">{v.datum}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                      <h3>{v.titel}</h3>
                      <p style={{ color: "var(--text-soft)" }}>{v.ort}</p>
                      {v.beschreibung ? <p>{v.beschreibung}</p> : null}
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: "var(--text-soft)" }}>Aktuell sind keine Veranstaltungen eingetragen.</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
