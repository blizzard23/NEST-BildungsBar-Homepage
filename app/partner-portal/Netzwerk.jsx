"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { apiPost, datumKurz } from "./assistentShared";

/* Fragen ans Netzwerk: eigene Fragen mit den eingegangenen Antworten und
   Fragen, die NEST an diesen Betrieb weitergegeben hat. Bewusst ohne
   Bearbeitungsstand – Antworten erscheinen einfach, sobald es welche gibt. */
export default function Netzwerk({ neuLaden }) {
  const [daten, setDaten] = useState({ eigene: [], an_mich: [] });
  const [laedt, setLaedt] = useState(true);
  const [fehler, setFehler] = useState("");
  const [formular, setFormular] = useState(null); // eigene Frage direkt stellen
  const [antworten, setAntworten] = useState({}); // frage_id -> { antwort, name_zeigen, fuer_assistent, busy, msg }

  const laden = useCallback(async () => {
    const { data, error } = await supabase.rpc("netzwerk_meine");
    if (error) { setFehler("Die Fragen konnten gerade nicht geladen werden."); setLaedt(false); return; }
    setFehler("");
    setDaten({ eigene: data?.eigene || [], an_mich: data?.an_mich || [] });
    setAntworten((alt) => {
      const neu = { ...alt };
      (data?.an_mich || []).forEach((f) => {
        if (!neu[f.id]) {
          const m = f.meine_antwort;
          neu[f.id] = { antwort: m?.antwort || "", name_zeigen: m ? m.name_zeigen : true, fuer_assistent: m ? m.fuer_assistent : false, busy: false, msg: "" };
        }
      });
      return neu;
    });
    setLaedt(false);
  }, []);

  useEffect(() => { laden(); }, [laden, neuLaden]);

  async function frageStellen(e) {
    e.preventDefault();
    setFormular((f) => ({ ...f, busy: true, msg: "" }));
    try {
      await apiPost("/api/netzwerk", { aktion: "frage", frage: formular.frage, ergaenzung: formular.ergaenzung });
      setFormular({ frage: "", ergaenzung: "", busy: false, msg: "", fertig: true });
      laden();
    } catch (err) {
      setFormular((f) => ({ ...f, busy: false, msg: err.message }));
    }
  }

  async function antworten_senden(e, id) {
    e.preventDefault();
    const a = antworten[id];
    setAntworten((x) => ({ ...x, [id]: { ...a, busy: true, msg: "" } }));
    try {
      await apiPost("/api/netzwerk", { aktion: "antwort", frage_id: id, antwort: a.antwort, name_zeigen: a.name_zeigen, fuer_assistent: a.fuer_assistent });
      setAntworten((x) => ({ ...x, [id]: { ...a, busy: false, msg: "Danke! Eure Antwort ist gespeichert." } }));
      laden();
    } catch (err) {
      setAntworten((x) => ({ ...x, [id]: { ...a, busy: false, msg: err.message } }));
    }
  }

  const setA = (id, feld, wert) => setAntworten((x) => ({ ...x, [id]: { ...x[id], [feld]: wert, msg: "" } }));

  return (
    <div className="as-netzwerk">
      {daten.an_mich.length ? (
        <div className="as-block">
          <h4 className="as-h4">Fragen aus dem Netzwerk an euch</h4>
          <p className="as-klein">Das NEST-Team hat diese Fragen an euch weitergegeben, weil eure Erfahrung weiterhelfen kann. Der fragende Betrieb bleibt anonym.</p>
          {daten.an_mich.map((f) => {
            const a = antworten[f.id] || { antwort: "", name_zeigen: true, fuer_assistent: false };
            return (
              <form key={f.id} className="card as-karte tb-form" onSubmit={(e) => antworten_senden(e, f.id)}>
                <div className="as-meta">Erhalten am {datumKurz(f.erhalten_am)}</div>
                <p className="as-frage">{f.frage}</p>
                <div className="field">
                  <label htmlFor={"nw-a-" + f.id}>Eure Antwort</label>
                  <textarea id={"nw-a-" + f.id} rows={4} maxLength={4000} value={a.antwort} required
                    placeholder="Was hat sich bei euch bewährt?" onChange={(e) => setA(f.id, "antwort", e.target.value)} />
                </div>
                <label className="as-check"><input type="checkbox" checked={a.name_zeigen} onChange={(e) => setA(f.id, "name_zeigen", e.target.checked)} /> Unseren Firmennamen bei der Antwort zeigen</label>
                <label className="as-check"><input type="checkbox" checked={a.fuer_assistent} onChange={(e) => setA(f.id, "fuer_assistent", e.target.checked)} /> Die Antwort darf anonym in den NEST-Assistenten übernommen werden</label>
                <p className="as-klein">Bitte keine Namen oder persönlichen Daten von Azubis eintragen.</p>
                {a.msg ? <p className={a.msg.startsWith("Danke") ? "as-ok" : "as-fehler"}>{a.msg}</p> : null}
                <div className="as-aktionen">
                  <button className="btn btn-primary" type="submit" disabled={a.busy || (a.antwort || "").trim().length < 5}>
                    {a.busy ? "Wird gesendet …" : f.meine_antwort ? "Antwort aktualisieren" : "Antwort senden"}
                  </button>
                </div>
              </form>
            );
          })}
        </div>
      ) : null}

      <div className="as-block">
        <div className="as-block-head">
          <h4 className="as-h4">Eure Fragen ans Netzwerk</h4>
          {!formular || formular.fertig ? (
            <button type="button" className="btn btn-outline" onClick={() => setFormular({ frage: "", ergaenzung: "", busy: false, msg: "" })}>Neue Frage stellen</button>
          ) : null}
        </div>
        {formular && formular.fertig ? (
          <p className="as-ok">Danke, eure Frage ist beim NEST-Team. Antworten erscheinen hier, sobald Betriebe aus dem Netzwerk geantwortet haben.</p>
        ) : null}
        {formular && !formular.fertig ? (
          <form className="card as-karte tb-form" onSubmit={frageStellen}>
            <div className="field">
              <label htmlFor="nw-frage">Eure Frage</label>
              <textarea id="nw-frage" rows={3} maxLength={2000} required value={formular.frage} onChange={(e) => setFormular((f) => ({ ...f, frage: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="nw-erg">Ergänzung (optional)</label>
              <textarea id="nw-erg" rows={2} maxLength={2000} value={formular.ergaenzung} placeholder="z. B. Branche oder Ausbildungsberuf"
                onChange={(e) => setFormular((f) => ({ ...f, ergaenzung: e.target.value }))} />
            </div>
            <p className="as-klein">Euer Betrieb bleibt für die anderen Betriebe anonym. Bitte keine Namen oder persönlichen Daten von Azubis eintragen.</p>
            {formular.msg ? <p className="as-fehler">{formular.msg}</p> : null}
            <div className="as-aktionen">
              <button className="btn btn-primary" type="submit" disabled={formular.busy || formular.frage.trim().length < 5}>{formular.busy ? "Wird gesendet …" : "Ans Netzwerk weitergeben"}</button>
              <button className="btn btn-outline" type="button" onClick={() => setFormular(null)}>Abbrechen</button>
            </div>
          </form>
        ) : null}

        {laedt ? <p className="as-klein">Lädt …</p> : null}
        {fehler ? <p className="as-fehler">{fehler}</p> : null}
        {!laedt && !fehler && !daten.eigene.length ? (
          <p className="as-klein">Noch keine Fragen. Wenn der Assistent nicht weiterweiß, gebt ihr eure Frage mit „An Netzwerk weitergeben“ an uns weiter.</p>
        ) : null}
        {daten.eigene.map((f) => (
          <div key={f.id} className="card as-karte">
            <div className="as-meta">Gestellt am {datumKurz(f.created_at)}</div>
            <p className="as-frage">{f.frage}</p>
            {f.ergaenzung ? <p className="as-ergaenzung">{f.ergaenzung}</p> : null}
            {(f.antworten || []).map((a, i) => (
              <div key={i} className="as-antwort">
                <div className="as-antwort-von">{a.firma || "Ein Partnerbetrieb"} · {datumKurz(a.created_at)}</div>
                <p>{a.antwort}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
