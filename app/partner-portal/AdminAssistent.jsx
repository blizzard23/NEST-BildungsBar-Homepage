"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { KATEGORIEN, apiPost, datumKurz } from "./assistentShared";

const WISSEN_LEER = { id: null, titel: "", kategorie: KATEGORIEN[0], inhalt: "", status: "freigegeben" };
const HERKUNFT = { nest: "NEST", partner: "Partner", netzwerk: "Netzwerk" };

/* Admin-Bereich für den Assistenten: Fragen ans Netzwerk weitergeben und
   Wissensbasis pflegen (inkl. Freigabe eingereichter Erfahrungen). */
export default function AdminAssistent() {
  const [konten, setKonten] = useState([]);
  const [fragen, setFragen] = useState([]);
  const [empfaenger, setEmpfaenger] = useState([]);
  const [antworten, setAntworten] = useState([]);
  const [wissen, setWissen] = useState([]);
  const [nutzung, setNutzung] = useState({ heute: 0, monat: 0 });
  const [wForm, setWForm] = useState(WISSEN_LEER);
  const [wMsg, setWMsg] = useState("");
  const [weitergabe, setWeitergabe] = useState({}); // frage_id -> { text, auswahl: Set, busy, msg }
  const [betriebSuche, setBetriebSuche] = useState({}); // frage_id -> Suchtext

  const laden = useCallback(async () => {
    const heute = new Date().toISOString().slice(0, 10);
    const vor30 = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const [k, f, e, a, w, n] = await Promise.all([
      supabase.rpc("admin_konten"),
      supabase.from("netzwerk_fragen").select("*").order("created_at", { ascending: false }),
      supabase.from("netzwerk_empfaenger").select("*"),
      supabase.from("netzwerk_antworten").select("*").order("created_at", { ascending: true }),
      supabase.from("assistent_wissen").select("*").order("created_at", { ascending: false }),
      supabase.from("assistent_nutzung").select("tag, anzahl").gte("tag", vor30),
    ]);
    setKonten(k.data || []);
    setFragen(f.data || []);
    setEmpfaenger(e.data || []);
    setAntworten(a.data || []);
    setWissen(w.data || []);
    const zeilen = n.data || [];
    setNutzung({
      heute: zeilen.filter((z) => z.tag === heute).reduce((s, z) => s + z.anzahl, 0),
      monat: zeilen.reduce((s, z) => s + z.anzahl, 0),
    });
  }, []);
  useEffect(() => { laden(); }, [laden]);

  const zurFreigabe = wissen.filter((w) => w.status === "eingereicht");
  const freigegeben = wissen.filter((w) => w.status === "freigegeben");
  const abgelehnt = wissen.filter((w) => w.status === "abgelehnt");
  const uebernommen = new Set(wissen.map((w) => w.netzwerk_antwort_id).filter(Boolean));

  // ---------- Wissen ----------
  const setW = (feld) => (e) => setWForm((f) => ({ ...f, [feld]: e.target.value }));
  async function wissenSpeichern(e) {
    e.preventDefault();
    setWMsg("");
    const werte = { titel: wForm.titel.trim(), kategorie: wForm.kategorie, inhalt: wForm.inhalt.trim(), status: wForm.status };
    const { error } = wForm.id
      ? await supabase.from("assistent_wissen").update(werte).eq("id", wForm.id)
      : await supabase.from("assistent_wissen").insert({ ...werte, herkunft: "nest" });
    if (error) { setWMsg("Fehler: " + error.message); return; }
    setWForm(WISSEN_LEER);
    setWMsg("Gespeichert.");
    laden();
  }
  async function wissenStatus(w, status) {
    const { error } = await supabase.from("assistent_wissen").update({ status }).eq("id", w.id);
    if (error) { window.alert("Fehler: " + error.message); return; }
    laden();
  }
  async function wissenLoeschen(w) {
    if (!window.confirm(`„${w.titel}" wirklich löschen?`)) return;
    await supabase.from("assistent_wissen").delete().eq("id", w.id);
    laden();
  }
  function wissenBearbeiten(w) {
    setWForm({ id: w.id, titel: w.titel, kategorie: w.kategorie, inhalt: w.inhalt, status: w.status });
    setWMsg("");
    document.getElementById("abschnitt-admin-wissen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Netzwerk ----------
  function wgState(f) {
    return weitergabe[f.id] || {
      text: f.frage_weitergabe || (f.frage + (f.ergaenzung ? "\n\n" + f.ergaenzung : "")),
      auswahl: [], busy: false, msg: "",
    };
  }
  function wgSet(f, patch) { setWeitergabe((x) => ({ ...x, [f.id]: { ...wgState(f), ...patch } })); }
  function wgToggle(f, id) {
    const s = wgState(f);
    wgSet(f, { auswahl: s.auswahl.includes(id) ? s.auswahl.filter((x) => x !== id) : [...s.auswahl, id], msg: "" });
  }
  async function weitergeben(f) {
    const s = wgState(f);
    wgSet(f, { busy: true, msg: "" });
    try {
      const r = await apiPost("/api/netzwerk", { aktion: "weitergeben", frage_id: f.id, text: s.text, empfaenger: s.auswahl });
      wgSet(f, { busy: false, auswahl: [], msg: r.neu ? `An ${r.neu} Betrieb${r.neu === 1 ? "" : "e"} weitergegeben${r.gemailt < r.neu ? " (E-Mail nicht an alle zugestellt)" : ""}.` : "Diese Betriebe hatten die Frage schon." });
      laden();
    } catch (err) {
      wgSet(f, { busy: false, msg: err.message });
    }
  }
  async function frageLoeschen(f) {
    if (!window.confirm("Diese Frage samt Antworten löschen?")) return;
    await supabase.from("netzwerk_fragen").delete().eq("id", f.id);
    laden();
  }
  async function antwortUebernehmen(f, a) {
    const frage = (f.frage_weitergabe || f.frage).trim();
    const kurz = f.frage.trim();
    const titel = kurz.length > 150 ? kurz.slice(0, 147) + "…" : kurz;
    const { error } = await supabase.from("assistent_wissen").insert({
      titel: titel.length >= 3 ? titel : "Frage aus dem Netzwerk",
      kategorie: "Sonstiges",
      inhalt: "Frage eines Partnerbetriebs: " + frage + "\n\nAntwort eines Partnerbetriebs: " + a.antwort,
      herkunft: "netzwerk", status: "eingereicht", netzwerk_antwort_id: a.id,
    });
    if (error) { window.alert("Fehler: " + error.message); return; }
    laden();
    document.getElementById("abschnitt-admin-wissen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const passt = (k, q) => !q || (k.firma || "").toLowerCase().includes(q) || (k.email || "").toLowerCase().includes(q)
    || (k.berufe || []).some((b) => b.toLowerCase().includes(q));

  return (
    <div className="as-admin">
      <div id="abschnitt-admin-assistent" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
      <div className="as-admin-kopf">
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: 0 }}>NEST-Assistent &amp; Netzwerk</h3>
        <span className="as-meta">Fragen an den Assistenten: heute {nutzung.heute} · letzte 30 Tage {nutzung.monat} · {freigegeben.length} Wissenseinträge aktiv · {konten.length} Unternehmen im Partner-Login</span>
      </div>

      {/* Fragen ans Netzwerk */}
      <div id="abschnitt-admin-netzwerk" style={{ scrollMarginTop: "84px" }}></div>
      <h4 className="as-h4">Fragen ans Netzwerk ({fragen.length})</h4>
      {!fragen.length ? <p className="as-klein">Noch keine Fragen. Sobald ein Partner eine Frage weitergibt, erscheint sie hier und ihr bekommt eine E-Mail.</p> : null}
      {fragen.map((f) => {
        const s = wgState(f);
        const bisher = empfaenger.filter((e) => e.frage_id === f.id);
        const bisherIds = new Set(bisher.map((e) => e.partner_id));
        const ant = antworten.filter((a) => a.frage_id === f.id);
        const suche = (betriebSuche[f.id] || "").trim().toLowerCase();
        const waehlbar = konten.filter((p) => p.user_id !== f.partner_id && !bisherIds.has(p.user_id) && (passt(p, suche) || s.auswahl.includes(p.user_id)));
        return (
          <div key={f.id} className="card as-karte">
            <div className="as-eintrag-kopf">
              <span className="as-meta"><b>{f.firma || "Unbekannt"}</b> · {datumKurz(f.created_at)}</span>
              <button type="button" className="btn btn-danger" onClick={() => frageLoeschen(f)}>Löschen</button>
            </div>
            <p className="as-frage">{f.frage}</p>
            {f.ergaenzung ? <p className="as-ergaenzung">{f.ergaenzung}</p> : null}

            <div className="field tb-form">
              <label>Text für die Betriebe (ohne Hinweis auf den fragenden Betrieb)</label>
              <textarea rows={3} maxLength={4000} value={s.text} onChange={(e) => wgSet(f, { text: e.target.value, msg: "" })} />
            </div>
            {bisher.length ? <p className="as-klein">Bereits weitergegeben an: {bisher.map((e) => e.firma || "Betrieb").join(", ")}</p> : null}
            <div className="field" style={{ maxWidth: "360px", marginBottom: "4px" }}>
              <input value={betriebSuche[f.id] || ""} onChange={(e) => setBetriebSuche((x) => ({ ...x, [f.id]: e.target.value }))} placeholder="Betrieb oder Ausbildungsberuf suchen …" aria-label="Betriebe filtern" />
            </div>
            <div className="as-auswahl">
              {waehlbar.length ? waehlbar.map((p) => (
                <label key={p.user_id} className={"as-wahl" + (s.auswahl.includes(p.user_id) ? " is-on" : "")}>
                  <input type="checkbox" checked={s.auswahl.includes(p.user_id)} onChange={() => wgToggle(f, p.user_id)} />
                  <span><b>{p.firma || p.email}</b>{p.berufe && p.berufe.length ? <small>{p.berufe.slice(0, 3).join(", ")}{p.berufe.length > 3 ? " …" : ""}</small> : null}</span>
                </label>
              )) : <p className="as-klein">Keine passenden Betriebe gefunden.</p>}
            </div>
            {s.msg ? <p className={s.msg.startsWith("An ") ? "as-ok" : "as-fehler"}>{s.msg}</p> : null}
            <div className="as-aktionen">
              <button type="button" className="btn btn-primary" disabled={s.busy || !s.auswahl.length || s.text.trim().length < 5} onClick={() => weitergeben(f)}>
                {s.busy ? "Wird weitergegeben …" : `An ${s.auswahl.length || ""} Betrieb${s.auswahl.length === 1 ? "" : "e"} weitergeben`}
              </button>
            </div>

            {ant.length ? (
              <div className="as-antworten">
                {ant.map((a) => (
                  <div key={a.id} className="as-antwort">
                    <div className="as-antwort-von">{a.firma || "Betrieb"} · {datumKurz(a.created_at)}{a.name_zeigen ? "" : " · möchte anonym bleiben"}</div>
                    <p>{a.antwort}</p>
                    {a.fuer_assistent ? (
                      uebernommen.has(a.id)
                        ? <span className="as-badge as-badge--ok">im Wissen angelegt</span>
                        : <button type="button" className="btn btn-outline" onClick={() => antwortUebernehmen(f, a)}>Als Wissen übernehmen</button>
                    ) : <span className="as-klein">nicht für den Assistenten freigegeben</span>}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Wissen */}
      <div id="abschnitt-admin-wissen" style={{ scrollMarginTop: "84px" }}></div>
      <h4 className="as-h4" style={{ marginTop: "36px" }}>Wissen für den Assistenten</h4>
      <p className="as-klein">Der Assistent antwortet nur aus Einträgen mit dem Status „im Assistenten“. Eingereichte Erfahrungen von Partnern und Antworten aus dem Netzwerk landen zuerst unter „Zur Freigabe“.</p>
      <form className="card as-karte tb-form" onSubmit={wissenSpeichern}>
        <h3 style={{ marginTop: 0 }}>{wForm.id ? "Eintrag bearbeiten" : "Neuer Eintrag von NEST"}</h3>
        <div className="row2">
          <div className="field"><label>Titel *</label><input value={wForm.titel} onChange={setW("titel")} maxLength={160} required /></div>
          <div className="field"><label>Thema</label>
            <select value={wForm.kategorie} onChange={setW("kategorie")}>
              {[...new Set([...KATEGORIEN, wForm.kategorie])].map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>
        <div className="field"><label>Inhalt *</label><textarea rows={7} value={wForm.inhalt} onChange={setW("inhalt")} maxLength={6000} required placeholder="Wissen, Erfahrung oder Fakten, auf die sich der Assistent stützen soll." /></div>
        <div className="field" style={{ maxWidth: "320px" }}><label>Status</label>
          <select value={wForm.status} onChange={setW("status")}>
            <option value="freigegeben">im Assistenten</option>
            <option value="eingereicht">zur Freigabe (noch nicht aktiv)</option>
            <option value="abgelehnt">abgelehnt</option>
          </select>
        </div>
        {wMsg ? <p className={wMsg.startsWith("Fehler") ? "as-fehler" : "as-ok"}>{wMsg}</p> : null}
        <div className="as-aktionen">
          <button className="btn btn-primary" type="submit">{wForm.id ? "Änderungen speichern" : "Eintrag speichern"}</button>
          {wForm.id ? <button className="btn btn-outline" type="button" onClick={() => { setWForm(WISSEN_LEER); setWMsg(""); }}>Abbrechen</button> : null}
        </div>
      </form>

      {[["Zur Freigabe", zurFreigabe], ["Im Assistenten", freigegeben], ["Abgelehnt", abgelehnt]].map(([titel, liste]) => (
        <details key={titel} className="as-gruppe" open={titel === "Zur Freigabe"}>
          <summary>{titel} ({liste.length})</summary>
          {!liste.length ? <p className="as-klein">Keine Einträge.</p> : null}
          {liste.map((w) => (
            <div key={w.id} className="card as-karte as-eintrag">
              <div className="as-eintrag-kopf">
                <span className="as-meta">{HERKUNFT[w.herkunft] || w.herkunft}{w.herkunft === "partner" ? " · " + (w.firma || "Partner") + (w.anonym ? " (anonym)" : " (mit Namen)") : ""} · {w.kategorie} · {datumKurz(w.updated_at || w.created_at)}</span>
              </div>
              <b className="as-eintrag-titel">{w.titel}</b>
              <p className="as-eintrag-text">{w.inhalt}</p>
              <div className="as-aktionen">
                {w.status !== "freigegeben" ? <button type="button" className="btn btn-primary" onClick={() => wissenStatus(w, "freigegeben")}>Freigeben</button> : null}
                {w.status === "eingereicht" ? <button type="button" className="btn btn-outline" onClick={() => wissenStatus(w, "abgelehnt")}>Ablehnen</button> : null}
                {w.status === "freigegeben" ? <button type="button" className="btn btn-outline" onClick={() => wissenStatus(w, "eingereicht")}>Deaktivieren</button> : null}
                <button type="button" className="btn btn-outline" onClick={() => wissenBearbeiten(w)}>Bearbeiten</button>
                <button type="button" className="btn btn-danger" onClick={() => wissenLoeschen(w)}>Löschen</button>
              </div>
            </div>
          ))}
        </details>
      ))}

    </div>
  );
}
