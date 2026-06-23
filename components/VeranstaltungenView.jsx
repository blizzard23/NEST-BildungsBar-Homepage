"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const MAX_PERSONEN = 2;
const ANMELDUNG_LEER = { firma: "", name: "", email: "", telefon: "", personen: 1, begleitpersonen: ["", ""], nachricht: "" };

function isoDay(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function fmtLang(iso) {
  if (!iso) return "";
  const [j, m, t] = String(iso).split("-").map(Number);
  const d = new Date(j, m - 1, t);
  const wt = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][d.getDay()];
  return `${wt}, ${t}. ${MONATE[m - 1]} ${j}`;
}
function mapsUrl(adresse) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(adresse);
}

export default function VeranstaltungenView({ initialEventId = null }) {
  const heute = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [events, setEvents] = useState([]);
  const [anzahl, setAnzahl] = useState({});       // { veranstaltung_id: anzahl }
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ jahr: heute.getFullYear(), monat: heute.getMonth() }); // angezeigter Monat
  const [selectedDay, setSelectedDay] = useState(null); // ISO-Tag oder null = ganzer Monat / alle

  // Anmeldeformular
  const [aktivesEvent, setAktivesEvent] = useState(null);
  const [form, setForm] = useState(ANMELDUNG_LEER);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const laden = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    const heuteISO = isoDay(heute);
    const { data: ev } = await supabase
      .from("veranstaltungen").select("*")
      .gte("datum", heuteISO).order("datum", { ascending: true });
    let alle = ev || [];
    // Direktlink zu einer einzelnen Veranstaltung: auch laden, wenn der Termin
    // nicht (mehr) in der Liste kommender Termine auftaucht.
    if (initialEventId && !alle.some((e) => e.id === initialEventId)) {
      const { data: einzeln } = await supabase
        .from("veranstaltungen").select("*").eq("id", initialEventId).maybeSingle();
      if (einzeln) alle = [...alle, einzeln].sort((a, b) => String(a.datum).localeCompare(String(b.datum)));
    }
    setEvents(alle);
    const { data: ct } = await supabase.rpc("veranstaltung_anmeldungen_anzahl");
    const map = {};
    (ct || []).forEach((r) => { map[r.veranstaltung_id] = Number(r.anzahl) || 0; });
    setAnzahl(map);
    setLoading(false);
  }, [heute, initialEventId]);

  useEffect(() => { laden(); }, [laden]);

  // Direktlink: gewählte Veranstaltung öffnen, Kalender auf ihren Monat stellen
  // und das Anmeldeformular anzeigen – nur einmal nach dem Laden.
  const [autoOpened, setAutoOpened] = useState(false);
  useEffect(() => {
    if (autoOpened || !initialEventId || loading || !events.length) return;
    const ev = events.find((e) => e.id === initialEventId);
    setAutoOpened(true);
    if (!ev) return;
    const [j, m, t] = String(ev.datum).split("-").map(Number);
    setCursor({ jahr: j, monat: m - 1 });
    setSelectedDay(`${j}-${String(m).padStart(2, "0")}-${String(t).padStart(2, "0")}`);
    setAktivesEvent(ev); setForm(ANMELDUNG_LEER); setMsg(""); setErr("");
    if (typeof document !== "undefined") {
      setTimeout(() => { const el = document.getElementById("anmeldung-form"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 120);
    }
  }, [autoOpened, initialEventId, loading, events]);

  // Events nach Tag gruppieren (für die Kalender-Markierung)
  const proTag = useMemo(() => {
    const m = {};
    events.forEach((e) => { (m[e.datum] = m[e.datum] || []).push(e); });
    return m;
  }, [events]);

  // Kalender-Raster für den aktuellen Monat (Wochen Mo–So)
  const wochen = useMemo(() => {
    const { jahr, monat } = cursor;
    const ersterTag = new Date(jahr, monat, 1);
    const offset = (ersterTag.getDay() + 6) % 7; // Mo = 0
    const tageImMonat = new Date(jahr, monat + 1, 0).getDate();
    const zellen = [];
    for (let i = 0; i < offset; i++) zellen.push(null);
    for (let t = 1; t <= tageImMonat; t++) zellen.push(new Date(jahr, monat, t));
    while (zellen.length % 7 !== 0) zellen.push(null);
    const out = [];
    for (let i = 0; i < zellen.length; i += 7) out.push(zellen.slice(i, i + 7));
    return out;
  }, [cursor]);

  // Liste der Veranstaltungen: gewählter Tag, sonst der angezeigte Monat
  const liste = useMemo(() => {
    if (selectedDay) return events.filter((e) => e.datum === selectedDay);
    const praefix = `${cursor.jahr}-${String(cursor.monat + 1).padStart(2, "0")}`;
    return events.filter((e) => String(e.datum).startsWith(praefix));
  }, [events, selectedDay, cursor]);

  function monatWechseln(delta) {
    setSelectedDay(null);
    setCursor((c) => {
      const d = new Date(c.jahr, c.monat + delta, 1);
      return { jahr: d.getFullYear(), monat: d.getMonth() };
    });
  }

  function anmeldenOeffnen(ev) {
    setAktivesEvent(ev); setForm(ANMELDUNG_LEER); setMsg(""); setErr("");
    if (typeof document !== "undefined") {
      setTimeout(() => { const el = document.getElementById("anmeldung-form"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 30);
    }
  }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setBegleit = (i) => (e) => setForm((f) => { const b = [...f.begleitpersonen]; b[i] = e.target.value; return { ...f, begleitpersonen: b }; });

  async function anmeldenSenden(e) {
    e.preventDefault(); setErr(""); setMsg("");
    if (!form.firma.trim() || !form.name.trim() || !form.email.trim()) {
      setErr("Bitte Unternehmen, Ansprechpartner:in und E-Mail ausfüllen."); return;
    }
    const personen = Math.min(MAX_PERSONEN, Math.max(1, parseInt(form.personen, 10) || 1));
    // Begleitpersonen (alle außer der Ansprechpartner:in) müssen namentlich benannt sein
    const begleit = form.begleitpersonen.slice(0, personen - 1).map((n) => (n || "").trim());
    if (begleit.some((n) => !n)) {
      setErr("Bitte benenne alle Begleitpersonen namentlich."); return;
    }
    setBusy(true);
    const eintrag = {
      veranstaltung_id: aktivesEvent.id,
      firma: form.firma.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      telefon: form.telefon.trim() || null,
      personen,
      begleitpersonen: begleit,
      nachricht: form.nachricht.trim() || null,
    };
    const { error } = await supabase.from("veranstaltung_anmeldungen").insert(eintrag);
    setBusy(false);
    if (error) { setErr("Anmeldung fehlgeschlagen: " + error.message); return; }
    setMsg("Danke! Eure Anmeldung ist eingegangen – wir melden uns mit allen Details.");
    setForm(ANMELDUNG_LEER);
    setAnzahl((a) => ({ ...a, [aktivesEvent.id]: (a[aktivesEvent.id] || 0) + 1 }));
    setTimeout(() => setAktivesEvent(null), 2200);
  }

  return (
    <div>
      <section className="hero">
        <div className="container"><div className="hero-inner"><div className="hero-text">
          <span className="hero-badge">Veranstaltungen</span>
          <h1>Kommende <em>Veranstaltungen</em></h1>
          <p className="lead">Alle Termine der NEST BildungsBar auf einen Blick – als Unternehmen kannst du dich direkt zu einer Veranstaltung anmelden.</p>
        </div></div></div>
      </section>

      <section className="bg-light">
        <div className="container">
          {!supabaseConfigured ? (
            <div className="card"><h3>Supabase noch nicht verbunden</h3>
              <p>Sobald das Backend verbunden ist, erscheinen hier die kommenden Veranstaltungen.</p>
            </div>
          ) : loading ? (
            <p>Lädt …</p>
          ) : (
            <div className="kal-layout">
              {/* Linke Spalte: Kalender + Veranstaltungsbilder */}
              <div className="kal-col-left">
              <div className="kal-card">
                <div className="kal-head">
                  <button type="button" className="kal-nav" aria-label="Vorheriger Monat" onClick={() => monatWechseln(-1)}>‹</button>
                  <strong>{MONATE[cursor.monat]} {cursor.jahr}</strong>
                  <button type="button" className="kal-nav" aria-label="Nächster Monat" onClick={() => monatWechseln(1)}>›</button>
                </div>
                <div className="kal-grid kal-weekdays">
                  {WOCHENTAGE.map((w) => <div key={w} className="kal-wd">{w}</div>)}
                </div>
                {wochen.map((woche, wi) => (
                  <div className="kal-grid" key={wi}>
                    {woche.map((d, di) => {
                      if (!d) return <div key={di} className="kal-cell kal-empty" />;
                      const iso = isoDay(d);
                      const evs = proTag[iso] || [];
                      const istHeute = iso === isoDay(heute);
                      const aktiv = selectedDay === iso;
                      const hatEvents = evs.length > 0;
                      return (
                        <button
                          type="button"
                          key={di}
                          className={"kal-cell" + (hatEvents ? " kal-has" : "") + (istHeute ? " kal-today" : "") + (aktiv ? " kal-active" : "")}
                          onClick={() => { setSelectedDay(hatEvents ? (aktiv ? null : iso) : null); }}
                          disabled={!hatEvents}
                        >
                          <span className="kal-daynum">{d.getDate()}</span>
                          {hatEvents ? <span className="kal-dot" aria-label={`${evs.length} Veranstaltung(en)`}></span> : null}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <div className="kal-legend">
                  <span><i className="kal-dot"></i> Veranstaltung</span>
                  {selectedDay ? <button type="button" className="link-btn" onClick={() => setSelectedDay(null)}>Filter aufheben</button> : null}
                </div>
              </div>

              {/* Bilder der angezeigten Veranstaltungen – unter dem Kalender */}
              {liste.some((e) => e.bild_url) ? (
                <div className="kal-bilder">
                  {liste.filter((e) => e.bild_url).map((e) => (
                    <figure className="kal-bild" key={e.id}>
                      <img src={e.bild_url} alt={e.titel} loading="lazy" />
                      <figcaption>
                        <strong>{e.titel}</strong>
                        <span>{fmtLang(e.datum)}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              </div>

              {/* Liste der Veranstaltungen */}
              <div className="kal-list">
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "0 0 16px" }}>
                  {selectedDay ? fmtLang(selectedDay) : `Termine im ${MONATE[cursor.monat]}`}
                </h2>
                {liste.length ? (
                  <div className="messe-termine">
                    {liste.map((ev) => {
                      const [j, m, t] = String(ev.datum).split("-").map(Number);
                      const n = anzahl[ev.id] || 0;
                      return (
                        <div className="messe-termin" key={ev.id}>
                          <div className="messe-termin-date">
                            <span className="mt-day">{String(t).padStart(2, "0")}</span>
                            <span className="mt-mon">{MONATE[m - 1].slice(0, 3)}</span>
                          </div>
                          <div className="messe-termin-body">
                            <h4>{ev.titel}</h4>
                            <p className="messe-termin-meta">
                              {fmtLang(ev.datum)}{ev.uhrzeit ? " · " + ev.uhrzeit : ""}{ev.ort ? " · " + ev.ort : ""}
                            </p>
                            {ev.adresse ? (
                              <p className="messe-termin-info" style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px", color: "var(--gold-dark)" }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>{ev.adresse} · <a href={mapsUrl(ev.adresse)} target="_blank" rel="noopener">Karte ↗</a></span>
                              </p>
                            ) : null}
                            {ev.beschreibung ? <p className="messe-termin-info">{ev.beschreibung}</p> : null}
                            {n > 0 ? <p className="messe-termin-info" style={{ color: "var(--gold-dark)", fontWeight: 700 }}>{n} {n === 1 ? "Unternehmen" : "Unternehmen"} angemeldet</p> : null}
                          </div>
                          <button className="btn btn-primary" onClick={() => anmeldenOeffnen(ev)}>Anmelden</button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={{ color: "var(--text-soft)" }}>
                    {selectedDay ? "An diesem Tag ist keine Veranstaltung geplant." : "In diesem Monat sind keine Veranstaltungen eingetragen."}
                  </p>
                )}

                {/* Anmeldeformular für Unternehmen */}
                {aktivesEvent ? (
                  <div className="card" id="anmeldung-form" style={{ marginTop: "26px", borderColor: "var(--gold)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                      <div>
                        <span className="section-label">Als Unternehmen anmelden</span>
                        <h3 style={{ margin: "4px 0 2px" }}>{aktivesEvent.titel}</h3>
                        <p style={{ color: "var(--text-soft)", fontSize: "14px", margin: 0 }}>{fmtLang(aktivesEvent.datum)}{aktivesEvent.uhrzeit ? " · " + aktivesEvent.uhrzeit : ""}{aktivesEvent.ort ? " · " + aktivesEvent.ort : ""}</p>
                        {aktivesEvent.adresse ? <p style={{ color: "var(--text-soft)", fontSize: "14px", margin: "2px 0 0" }}>{aktivesEvent.adresse} · <a href={mapsUrl(aktivesEvent.adresse)} target="_blank" rel="noopener">Karte ↗</a></p> : null}
                      </div>
                      <button type="button" className="kal-nav" aria-label="Schließen" onClick={() => setAktivesEvent(null)}>×</button>
                    </div>
                    <form onSubmit={anmeldenSenden} className="tb-form" style={{ marginTop: "16px" }}>
                      <div className="row2">
                        <div className="field"><label>Unternehmen *</label><input value={form.firma} onChange={set("firma")} required /></div>
                        <div className="field"><label>Ansprechpartner:in *</label><input value={form.name} onChange={set("name")} required /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>E-Mail *</label><input type="email" value={form.email} onChange={set("email")} required /></div>
                        <div className="field"><label>Telefon</label><input value={form.telefon} onChange={set("telefon")} /></div>
                      </div>
                      <div className="field" style={{ maxWidth: "220px" }}>
                        <label>Anzahl Personen (max. {MAX_PERSONEN})</label>
                        <select value={form.personen} onChange={set("personen")}>
                          <option value={1}>1 Person</option>
                          <option value={2}>2 Personen</option>
                        </select>
                      </div>
                      {Number(form.personen) > 1 ? Array.from({ length: Number(form.personen) - 1 }).map((_, i) => (
                        <div className="field" key={i}>
                          <label>Name der Begleitperson{Number(form.personen) - 1 > 1 ? " " + (i + 1) : ""} *</label>
                          <input value={form.begleitpersonen[i] || ""} onChange={setBegleit(i)} placeholder="Vor- und Nachname" required />
                        </div>
                      )) : null}
                      <div className="field"><label>Nachricht (optional)</label><textarea value={form.nachricht} onChange={set("nachricht")} placeholder="Wünsche, Fragen, …"></textarea></div>
                      {err ? <p style={{ color: "#c2415a", fontSize: "14px" }}>{err}</p> : null}
                      {msg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{msg}</p> : null}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Wird gesendet …" : "Anmeldung absenden"}</button>
                        <button type="button" className="btn btn-outline" onClick={() => setAktivesEvent(null)}>Abbrechen</button>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
