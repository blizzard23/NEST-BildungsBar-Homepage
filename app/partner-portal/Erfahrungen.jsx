"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { KATEGORIEN, apiPost, datumKurz } from "./assistentShared";

const LEER = { id: null, kategorie: KATEGORIEN[3], titel: "", inhalt: "", anonym: true };
const STATUS = {
  eingereicht: ["wird geprüft", "as-badge"],
  freigegeben: ["im Assistenten", "as-badge as-badge--ok"],
  abgelehnt: ["nicht übernommen", "as-badge as-badge--aus"],
};

/* Partner teilen eigene Erfahrungen. Nach Freigabe durch NEST nutzt der
   Assistent sie für Antworten an andere Partner. */
export default function Erfahrungen({ userId }) {
  const [liste, setListe] = useState([]);
  const [form, setForm] = useState(LEER);
  const [offen, setOffen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const laden = useCallback(async () => {
    const { data } = await supabase.from("assistent_wissen")
      .select("id, titel, inhalt, kategorie, anonym, status, created_at")
      .eq("partner_id", userId).order("created_at", { ascending: false });
    setListe(data || []);
  }, [userId]);
  useEffect(() => { if (userId) laden(); }, [userId, laden]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function speichern(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const werte = { kategorie: form.kategorie, titel: form.titel.trim(), inhalt: form.inhalt.trim(), anonym: form.anonym, status: "eingereicht" };
    const res = form.id
      ? await supabase.from("assistent_wissen").update(werte).eq("id", form.id).select("id").single()
      : await supabase.from("assistent_wissen").insert({ ...werte, partner_id: userId, herkunft: "partner" }).select("id").single();
    if (res.error) {
      setBusy(false);
      setMsg("Das hat gerade nicht geklappt. Bitte prüft Titel (mind. 3 Zeichen) und Text (mind. 10 Zeichen).");
      return;
    }
    try { await apiPost("/api/netzwerk", { aktion: "erfahrung", id: res.data.id }); } catch { /* Speichern hat geklappt, Mail ist zweitrangig */ }
    setBusy(false);
    setForm(LEER);
    setOffen(false);
    setMsg("Danke! Wir prüfen eure Erfahrung und nehmen sie dann in den Assistenten auf.");
    laden();
  }

  async function loeschen(eintrag) {
    if (!window.confirm(`„${eintrag.titel}" wirklich löschen?`)) return;
    await supabase.from("assistent_wissen").delete().eq("id", eintrag.id);
    laden();
  }

  function bearbeiten(eintrag) {
    setForm({ id: eintrag.id, kategorie: eintrag.kategorie, titel: eintrag.titel, inhalt: eintrag.inhalt, anonym: eintrag.anonym });
    setOffen(true); setMsg("");
  }

  return (
    <div className="as-block">
      <div className="as-block-head">
        <h4 className="as-h4">Eure Erfahrungen teilen</h4>
        {!offen ? <button type="button" className="btn btn-outline" onClick={() => { setForm(LEER); setOffen(true); setMsg(""); }}>Erfahrung teilen</button> : null}
      </div>
      <p className="as-klein">Was hat bei euch gut funktioniert? Geteilte Erfahrungen helfen anderen Betrieben im Netzwerk. Nach unserer Prüfung nutzt der Assistent sie für seine Antworten.</p>
      {msg ? <p className="as-ok">{msg}</p> : null}

      {offen ? (
        <form className="card as-karte tb-form" onSubmit={speichern}>
          <div className="row2">
            <div className="field">
              <label htmlFor="er-kat">Thema</label>
              <select id="er-kat" value={form.kategorie} onChange={set("kategorie")}>
                {KATEGORIEN.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="er-titel">Titel</label>
              <input id="er-titel" value={form.titel} onChange={set("titel")} maxLength={160} required placeholder="z. B. Patenschaften im ersten Lehrjahr" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="er-text">Eure Erfahrung</label>
            <textarea id="er-text" value={form.inhalt} onChange={set("inhalt")} maxLength={6000} rows={6} required
              placeholder="Worum ging es, was habt ihr gemacht und was hat geholfen?" />
          </div>
          <label className="as-check"><input type="checkbox" checked={form.anonym} onChange={set("anonym")} /> Anonym teilen (ohne unseren Firmennamen)</label>
          <p className="as-klein">Mit dem Absenden erlaubt ihr NEST, die Erfahrung nach Prüfung im Assistenten für andere Partner zu nutzen. Bitte keine Namen oder persönlichen Daten von Azubis eintragen. Nach jeder Änderung prüfen wir den Eintrag erneut.</p>
          <div className="as-aktionen">
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Wird gesendet …" : form.id ? "Änderung einreichen" : "Erfahrung einreichen"}</button>
            <button className="btn btn-outline" type="button" onClick={() => { setOffen(false); setForm(LEER); }}>Abbrechen</button>
          </div>
        </form>
      ) : null}

      {liste.map((w) => (
        <div key={w.id} className="card as-karte as-eintrag">
          <div className="as-eintrag-kopf">
            <span className="as-meta">{w.kategorie} · {datumKurz(w.created_at)} · {w.anonym ? "anonym" : "mit Firmennamen"}</span>
            <span className={(STATUS[w.status] || STATUS.eingereicht)[1]}>{(STATUS[w.status] || STATUS.eingereicht)[0]}</span>
          </div>
          <b className="as-eintrag-titel">{w.titel}</b>
          <p className="as-eintrag-text">{w.inhalt}</p>
          <div className="as-aktionen">
            <button type="button" className="btn btn-outline" onClick={() => bearbeiten(w)}>Bearbeiten</button>
            <button type="button" className="btn btn-danger" onClick={() => loeschen(w)}>Löschen</button>
          </div>
        </div>
      ))}
    </div>
  );
}
