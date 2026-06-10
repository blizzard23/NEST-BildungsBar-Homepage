"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "info@nest-bildungsbar.de";
const LEER = { firma: "", beruf: "", art: "Ausbildung", ort: "Wuppertal", start: "", url: "" };
const EVENT_LEER = { titel: "", datum: "", uhrzeit: "", ort: "Wuppertal", beschreibung: "" };
const POST_LEER = { slug: "", titel: "", excerpt: "", inhalt: "", bild_url: "", published: true };

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Auslastung: Kapazität pro Tag + nächste Di/Do-Termine
const KAPAZITAET = { Wuppertal: 4, Essen: 2 };
const WTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function naechsteTermine(n) {
  const out = [];
  const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
  let guard = 0;
  while (out.length < n && guard < 120) {
    if (d.getDay() === 2 || d.getDay() === 4) out.push(new Date(d));
    d.setDate(d.getDate() + 1); guard++;
  }
  return out;
}
function isoDatum(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function kurzDatum(d) { return WTAGE[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "."; }

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

  // Admin
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminPosts, setAdminPosts] = useState([]);
  const [buchungen, setBuchungen] = useState([]);
  const [evForm, setEvForm] = useState(EVENT_LEER);
  const [evMsg, setEvMsg] = useState("");
  const [poForm, setPoForm] = useState(POST_LEER);
  const [poMsg, setPoMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

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

  const ladeAdmin = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    const { data: ev } = await supabase.from("veranstaltungen").select("*").order("datum", { ascending: true });
    setAdminEvents(ev || []);
    const { data: po } = await supabase.from("posts").select("*").order("veroeffentlicht_am", { ascending: false });
    setAdminPosts(po || []);
    const { data: bu } = await supabase.from("buchungen").select("*").order("created_at", { ascending: false });
    setBuchungen(bu || []);
  }, [isAdmin]); // eslint-disable-line

  useEffect(() => { if (session) ladeDaten(); }, [session, ladeDaten]);
  useEffect(() => { if (isAdmin) ladeAdmin(); }, [isAdmin, ladeAdmin]);

  async function login(e) {
    e.preventDefault(); setAuthErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setAuthErr("Login fehlgeschlagen: " + error.message);
  }
  async function logout() { await supabase.auth.signOut(); setStellen([]); setEvents([]); setAdminEvents([]); setAdminPosts([]); setBuchungen([]); }

  async function buchungLoeschen(id) { await supabase.from("buchungen").delete().eq("id", id); ladeAdmin(); }

  async function speichern(e) {
    e.preventDefault(); setMsg("");
    const eintrag = { ...form, partner_id: session.user.id, aktiviert_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("stellen").insert(eintrag);
    if (error) { setMsg("Fehler: " + error.message); return; }
    setForm((f) => ({ ...LEER, firma: f.firma }));
    setMsg("Stelle veröffentlicht ✅ (30 Tage sichtbar)");
    ladeDaten();
  }
  async function loeschen(id) { await supabase.from("stellen").delete().eq("id", id); ladeDaten(); }

  // ---- Admin: Veranstaltungen ----
  async function eventSpeichern(e) {
    e.preventDefault(); setEvMsg("");
    if (!evForm.titel || !evForm.datum) { setEvMsg("Titel und Datum sind Pflicht."); return; }
    const { error } = await supabase.from("veranstaltungen").insert(evForm);
    if (error) { setEvMsg("Fehler: " + error.message); return; }
    setEvForm(EVENT_LEER);
    setEvMsg("Veranstaltung gespeichert ✅");
    ladeAdmin(); ladeDaten();
  }
  async function eventLoeschen(id) { await supabase.from("veranstaltungen").delete().eq("id", id); ladeAdmin(); ladeDaten(); }

  // ---- Admin: Blog ----
  async function postSpeichern(e) {
    e.preventDefault(); setPoMsg("");
    if (!poForm.titel) { setPoMsg("Titel ist Pflicht."); return; }
    const slug = poForm.slug ? slugify(poForm.slug) : slugify(poForm.titel);
    const eintrag = { ...poForm, slug, veroeffentlicht_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("posts").insert(eintrag);
    if (error) { setPoMsg("Fehler: " + error.message); return; }
    setPoForm(POST_LEER);
    setPoMsg("Beitrag gespeichert ✅");
    ladeAdmin();
  }
  async function postLoeschen(id) { await supabase.from("posts").delete().eq("id", id); ladeAdmin(); }

  // ---- Admin: Bild-Upload (Supabase Storage, Bucket "blog") ----
  async function bildUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true); setPoMsg("");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const pfad = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("blog").upload(pfad, file, { cacheControl: "3600", upsert: false });
    if (error) { setPoMsg("Upload-Fehler: " + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("blog").getPublicUrl(pfad);
    setPoForm((f) => ({ ...f, bild_url: data.publicUrl }));
    setUploading(false);
    setPoMsg("Bild hochgeladen ✅");
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setEv = (k) => (e) => setEvForm((f) => ({ ...f, [k]: e.target.value }));
  const setPo = (k) => (e) => setPoForm((f) => ({ ...f, [k]: k === "published" ? e.target.checked : e.target.value }));

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
            <div className="card" style={{ maxWidth: "440px", margin: "0 auto" }}>
              <span className="section-label">Anmeldung</span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 18px" }}>Login</h2>
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
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span className="section-label">Eingeloggt{isAdmin ? " · Admin" : ""}</span>
                  <strong style={{ color: "var(--navy)", fontSize: "18px" }}>{session.user.email}</strong>
                </div>
                <button className="btn btn-ghost" onClick={logout}>Abmelden</button>
              </div>

              {/* Neue Stelle */}
              <div className="card" style={{ marginBottom: "28px" }}>
                <h3>Neue Ausbildungsstelle veröffentlichen</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "16px" }}>Erscheint auf „Berufswelt" – automatisch 30 Tage sichtbar.</p>
                <form onSubmit={speichern} className="tb-form">
                  <div className="row2">
                    <div className="field"><label>Unternehmen *</label><input value={form.firma} onChange={set("firma")} required /></div>
                    <div className="field"><label>Beruf *</label><input value={form.beruf} onChange={set("beruf")} placeholder="z. B. Mechatroniker:in" required /></div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Art</label>
                      <select value={form.art} onChange={set("art")}><option>Ausbildung</option><option>Duales Studium</option><option>Praktikum</option></select>
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

              {/* Kommende Veranstaltungen (für alle) */}
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

              {/* =================== ADMIN-BEREICH =================== */}
              {isAdmin && (
                <div style={{ marginTop: "44px", borderTop: "2px solid var(--line)", paddingTop: "32px" }}>
                  <span className="section-label">Nur für Admins</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 22px" }}>Admin-Bereich</h2>

                  {/* Auslastung der nächsten Termine */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Auslastung der nächsten Termine</h3>
                  {(() => {
                    const termine = naechsteTermine(8);
                    const zaehl = {};
                    buchungen.forEach((b) => { if (b.datum) { const k = b.standort + "|" + b.datum; zaehl[k] = (zaehl[k] || 0) + 1; } });
                    return (
                      <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                        {["Wuppertal", "Essen"].map((ort) => (
                          <div className="card" key={ort}>
                            <span className="badge">{ort} · max. {KAPAZITAET[ort]}/Tag</span>
                            <div style={{ marginTop: "12px" }}>
                              {termine.map((d) => {
                                const iso = isoDatum(d);
                                const n = zaehl[ort + "|" + iso] || 0;
                                const cap = KAPAZITAET[ort];
                                const voll = n >= cap;
                                const knapp = !voll && cap - n === 1;
                                return (
                                  <div key={iso} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--line)", fontSize: "14px" }}>
                                    <span style={{ color: "var(--navy)" }}>{kurzDatum(d)}</span>
                                    <span style={{ fontWeight: 800, color: voll ? "#c2415a" : (knapp ? "var(--gold-dark)" : "#1f9d63") }}>
                                      {n}/{cap}{voll ? " · ausgebucht" : ""}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Terminbuchungen */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Terminbuchungen ({buchungen.length})</h3>
                  {buchungen.length ? (() => {
                    const groups = {};
                    buchungen.forEach((bu) => {
                      const k = bu.standort + "|" + (bu.datum || bu.datum_text || "");
                      (groups[k] = groups[k] || []).push(bu);
                    });
                    const keys = Object.keys(groups).sort((a, b) => {
                      const da = groups[a][0].datum || "", db = groups[b][0].datum || "";
                      return db.localeCompare(da);
                    });
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        {keys.map((k) => {
                          const list = groups[k];
                          const first = list[0];
                          const cap = KAPAZITAET[first.standort] || 0;
                          const voll = cap && list.length >= cap;
                          return (
                            <div className="card" key={k} style={{ marginBottom: "16px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", borderBottom: "2px solid var(--line)", paddingBottom: "10px", marginBottom: "10px" }}>
                                <h3 style={{ margin: 0 }}>{first.datum_text || first.datum} · {first.standort}</h3>
                                <span style={{ fontWeight: 800, color: voll ? "#c2415a" : "var(--gold-dark)" }}>{list.length}{cap ? "/" + cap : ""} belegt{voll ? " · ausgebucht" : ""}</span>
                              </div>
                              {list.map((bu) => (
                                <div key={bu.id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                                  <div>
                                    <p style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--navy)" }}>{bu.name} <span style={{ fontWeight: 600, color: "var(--text-mute)" }}>· {bu.uhrzeit}</span></p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>
                                      {bu.email ? <a href={`mailto:${bu.email}`}>{bu.email}</a> : "—"}
                                      {bu.telefon ? <> · <a href={`tel:${bu.telefon}`}>{bu.telefon}</a></> : ""}
                                    </p>
                                    {bu.schule ? <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--text-mute)" }}>{bu.schule}</p> : null}
                                    {bu.nachricht ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>„{bu.nachricht}"</p> : null}
                                  </div>
                                  <button className="btn btn-ghost" style={{ flexShrink: 0, alignSelf: "flex-start" }} onClick={() => buchungLoeschen(bu.id)}>Löschen</button>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })() : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Terminbuchungen.</p>}

                  {/* Veranstaltung anlegen */}
                  <div className="card" style={{ marginBottom: "24px" }}>
                    <h3>Veranstaltung anlegen</h3>
                    <form onSubmit={eventSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Titel *</label><input value={evForm.titel} onChange={setEv("titel")} placeholder="z. B. OpenHouse Wuppertal" required /></div>
                        <div className="field"><label>Datum *</label><input type="date" value={evForm.datum} onChange={setEv("datum")} required /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>Uhrzeit</label><input value={evForm.uhrzeit} onChange={setEv("uhrzeit")} placeholder="z. B. 17:00–19:00" /></div>
                        <div className="field"><label>Ort</label>
                          <select value={evForm.ort} onChange={setEv("ort")}><option>Wuppertal</option><option>Essen</option><option>Online</option></select>
                        </div>
                      </div>
                      <div className="field"><label>Beschreibung</label><textarea value={evForm.beschreibung} onChange={setEv("beschreibung")} placeholder="Kurzbeschreibung (optional)"></textarea></div>
                      {evMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{evMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Veranstaltung speichern</button>
                    </form>
                  </div>

                  {/* Alle Veranstaltungen verwalten */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" }}>Alle Veranstaltungen ({adminEvents.length})</h3>
                  {adminEvents.length ? (
                    <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                      {adminEvents.map((v) => (
                        <div className="card" key={v.id}>
                          <span className="num-label">{v.datum}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                          <h3>{v.titel}</h3>
                          <p style={{ color: "var(--text-soft)" }}>{v.ort}</p>
                          <button className="btn btn-ghost" style={{ marginTop: "8px" }} onClick={() => eventLoeschen(v.id)}>Löschen</button>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Veranstaltungen.</p>}

                  {/* Blogbeitrag anlegen */}
                  <div className="card" style={{ marginBottom: "24px" }}>
                    <h3>Blogbeitrag anlegen</h3>
                    <form onSubmit={postSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Titel *</label><input value={poForm.titel} onChange={setPo("titel")} required /></div>
                        <div className="field"><label>Slug (URL)</label><input value={poForm.slug} onChange={setPo("slug")} placeholder="leer = automatisch aus Titel" /></div>
                      </div>
                      <div className="field"><label>Kurztext (Teaser)</label><input value={poForm.excerpt} onChange={setPo("excerpt")} placeholder="1–2 Sätze für die Übersicht" /></div>
                      <div className="field">
                        <label>Beitragsbild</label>
                        <input type="file" accept="image/*" onChange={bildUpload} disabled={uploading} />
                        {uploading ? <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "6px" }}>Lädt hoch …</p> : null}
                        {poForm.bild_url ? (
                          <img src={poForm.bild_url} alt="Vorschau" style={{ width: "100%", maxWidth: "260px", borderRadius: "10px", marginTop: "10px", display: "block" }} />
                        ) : null}
                        <input value={poForm.bild_url} onChange={setPo("bild_url")} placeholder="…oder Bild-URL einfügen" style={{ marginTop: "8px" }} />
                      </div>
                      <div className="field"><label>Inhalt (HTML)</label><textarea value={poForm.inhalt} onChange={setPo("inhalt")} placeholder="<p>Dein Beitrag …</p>" style={{ minHeight: "140px" }}></textarea></div>
                      <label className="tb-check"><input type="checkbox" checked={poForm.published} onChange={setPo("published")} /> Sofort veröffentlichen</label>
                      {poMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{poMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Beitrag speichern</button>
                    </form>
                  </div>

                  {/* Alle Beiträge verwalten */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" }}>Alle Beiträge ({adminPosts.length})</h3>
                  {adminPosts.length ? (
                    <div className="card-grid cols-2">
                      {adminPosts.map((p) => (
                        <div className="card" key={p.id}>
                          <span className="num-label">{p.veroeffentlicht_am} · {p.published ? "veröffentlicht" : "Entwurf"}</span>
                          <h3>{p.titel}</h3>
                          <p style={{ color: "var(--text-soft)", fontSize: "13px" }}>/blog/{p.slug}</p>
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                            <a className="btn btn-outline" href={`/blog/${p.slug}`} target="_blank" rel="noopener">Ansehen</a>
                            <button className="btn btn-ghost" onClick={() => postLoeschen(p.id)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: "var(--text-soft)" }}>Noch keine Beiträge.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
