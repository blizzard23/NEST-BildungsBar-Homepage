"use client";
import { useEffect, useRef, useState } from "react";
import { zugangsToken, apiPost, FormatierterText } from "./assistentShared";

const BEISPIELE = [
  "Wie verhindern wir Abbrüche in der Probezeit?",
  "Was erwarten Azubis der Generation Z von uns?",
  "Wie läuft NEST Explore ab?",
  "Wie gestalten wir die ersten Tage für neue Azubis?",
];

/* Chat mit dem NEST-Assistenten. Der Verlauf lebt nur im Browser; jede Antwort
   kann über „An Netzwerk weitergeben" an das NEST-Team gehen. */
export default function Assistent({ onNetzwerkFrage }) {
  const [verlauf, setVerlauf] = useState([]); // { rolle: "frage"|"antwort", text, quellen, hinweis, fehler }
  const [eingabe, setEingabe] = useState("");
  const [laeuft, setLaeuft] = useState(false);
  const [weitergabe, setWeitergabe] = useState(null); // { index, frage, ergaenzung, busy, msg, fertig }
  const listeRef = useRef(null);

  useEffect(() => {
    const el = listeRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [verlauf, weitergabe]);

  async function fragen(text) {
    const frage = String(text || "").trim();
    if (!frage || laeuft) return;
    setEingabe("");
    setWeitergabe(null);
    // Nur vollständige Frage-Antwort-Paare gehen als Verlauf mit; fehlgeschlagene fallen weg.
    const paare = [];
    for (let i = 0; i < verlauf.length - 1; i++) {
      const f = verlauf[i], a = verlauf[i + 1];
      if (f.rolle === "frage" && a.rolle === "antwort" && a.text && !a.fehler) { paare.push(f, a); i++; }
    }
    const basis = [...paare, { rolle: "frage", text: frage }];
    setVerlauf([...verlauf, { rolle: "frage", text: frage }, { rolle: "antwort", text: "", quellen: [], wartet: true }]);
    setLaeuft(true);

    const aktualisieren = (fn) => setVerlauf((v) => {
      const kopie = v.slice();
      kopie[kopie.length - 1] = fn({ ...kopie[kopie.length - 1] });
      return kopie;
    });

    try {
      const token = await zugangsToken();
      const res = await fetch("/api/assistent", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: JSON.stringify({ verlauf: basis.map((m) => ({ rolle: m.rolle, text: m.text })) }),
      });
      if (!res.ok || !res.body) {
        let meldung = "Der Assistent ist gerade nicht erreichbar. Bitte versucht es später noch einmal.";
        try { const d = await res.json(); if (d.error) meldung = d.error; } catch { /* keine JSON-Antwort */ }
        aktualisieren((m) => ({ ...m, wartet: false, fehler: meldung }));
        return;
      }
      const leser = res.body.getReader();
      const decoder = new TextDecoder();
      let puffer = "";
      for (;;) {
        const { value, done } = await leser.read();
        if (done) break;
        puffer += decoder.decode(value, { stream: true });
        const zeilen = puffer.split("\n");
        puffer = zeilen.pop();
        for (const zeile of zeilen) {
          if (!zeile.trim()) continue;
          let ev;
          try { ev = JSON.parse(zeile); } catch { continue; }
          if (ev.t === "text") aktualisieren((m) => ({ ...m, wartet: false, text: m.text + ev.v }));
          else if (ev.t === "quelle") aktualisieren((m) => ({ ...m, quellen: [...(m.quellen || []), { titel: ev.titel, herkunft: ev.herkunft }] }));
          else if (ev.t === "hinweis") aktualisieren((m) => ({ ...m, wartet: false, hinweis: ev.v }));
          else if (ev.t === "fehler") aktualisieren((m) => ({ ...m, wartet: false, fehler: ev.v }));
        }
      }
      aktualisieren((m) => (m.text || m.fehler || m.hinweis ? { ...m, wartet: false } : { ...m, wartet: false, fehler: "Es kam keine Antwort. Bitte versucht es noch einmal." }));
    } catch {
      aktualisieren((m) => ({ ...m, wartet: false, fehler: "Keine Verbindung zum Server. Bitte prüft eure Internetverbindung." }));
    } finally {
      setLaeuft(false);
    }
  }

  function weitergabeOeffnen(index) {
    // Die Frage, die zu dieser Antwort geführt hat
    let frage = "";
    for (let i = index - 1; i >= 0; i--) { if (verlauf[i].rolle === "frage") { frage = verlauf[i].text; break; } }
    setWeitergabe({ index, frage, ergaenzung: "", busy: false, msg: "", fertig: false });
  }

  async function weitergeben(e) {
    e.preventDefault();
    if (!weitergabe || weitergabe.busy) return;
    setWeitergabe((w) => ({ ...w, busy: true, msg: "" }));
    try {
      await apiPost("/api/netzwerk", { aktion: "frage", frage: weitergabe.frage, ergaenzung: weitergabe.ergaenzung });
      setWeitergabe((w) => ({ ...w, busy: false, fertig: true }));
      if (onNetzwerkFrage) onNetzwerkFrage();
    } catch (err) {
      setWeitergabe((w) => ({ ...w, busy: false, msg: err.message }));
    }
  }

  function absenden(e) {
    e.preventDefault();
    fragen(eingabe);
  }

  return (
    <div className="as-chat">
      <div className="as-chat-head">
        <span className="as-avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" /></svg>
        </span>
        <div>
          <b>NEST-Assistent</b>
          <small>Antworten aus den Erfahrungen von NEST und unserem Partnernetzwerk</small>
        </div>
      </div>

      <div className="as-verlauf" ref={listeRef} aria-live="polite">
        {!verlauf.length ? (
          <div className="as-leer">
            <p>Stellt eure Frage rund um eure Ausbildung. Wenn der Assistent nicht weiterweiß, gebt ihr die Frage mit einem Klick an unser Netzwerk weiter.</p>
            <div className="as-beispiele">
              {BEISPIELE.map((b) => (
                <button key={b} type="button" className="as-beispiel" onClick={() => fragen(b)}>{b}</button>
              ))}
            </div>
          </div>
        ) : null}

        {verlauf.map((m, i) => (
          m.rolle === "frage" ? (
            <div key={i} className="as-msg as-msg--frage"><div className="as-blase">{m.text}</div></div>
          ) : (
            <div key={i} className="as-msg as-msg--antwort">
              <div className="as-blase">
                {m.wartet ? <span className="as-tippt" aria-label="Der Assistent schreibt"><i /><i /><i /></span> : null}
                {m.text ? <div className="as-text"><FormatierterText text={m.text} /></div> : null}
                {m.hinweis ? <p className="as-hinweis">{m.hinweis}</p> : null}
                {m.fehler ? <p className="as-fehler">{m.fehler}</p> : null}
                {m.quellen && m.quellen.length ? (
                  <div className="as-quellen">
                    <span>Quellen</span>
                    {m.quellen.map((q, j) => <span key={j} className="as-quelle" title={q.herkunft}>{q.titel}<em>{q.herkunft}</em></span>)}
                  </div>
                ) : null}
              </div>
              {!m.wartet && !(laeuft && i === verlauf.length - 1) && !(weitergabe && weitergabe.index === i) ? (
                <button type="button" className="as-netzwerk-btn" onClick={() => weitergabeOeffnen(i)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                  An Netzwerk weitergeben
                </button>
              ) : null}
              {weitergabe && weitergabe.index === i ? (
                weitergabe.fertig ? (
                  <div className="as-weitergabe as-weitergabe--ok">
                    <b>Danke, eure Frage ist beim NEST-Team.</b>
                    <span>Wir geben sie an passende Betriebe aus dem Netzwerk weiter. Die Antworten findet ihr weiter unten unter „Fragen ans Netzwerk“.</span>
                  </div>
                ) : (
                  <form className="as-weitergabe tb-form" onSubmit={weitergeben}>
                    <b>Frage ans Netzwerk weitergeben</b>
                    <div className="field">
                      <label htmlFor={"as-wg-frage-" + i}>Eure Frage</label>
                      <textarea id={"as-wg-frage-" + i} value={weitergabe.frage} maxLength={2000} rows={3} required
                        onChange={(e) => setWeitergabe((w) => ({ ...w, frage: e.target.value }))} />
                    </div>
                    <div className="field">
                      <label htmlFor={"as-wg-erg-" + i}>Ergänzung (optional)</label>
                      <textarea id={"as-wg-erg-" + i} value={weitergabe.ergaenzung} maxLength={2000} rows={2}
                        placeholder="Was sollen die Betriebe noch wissen, z. B. Branche oder Ausbildungsberuf?"
                        onChange={(e) => setWeitergabe((w) => ({ ...w, ergaenzung: e.target.value }))} />
                    </div>
                    <p className="as-klein">Euer Betrieb bleibt für die anderen Betriebe anonym. Bitte keine Namen oder persönlichen Daten von Azubis eintragen.</p>
                    {weitergabe.msg ? <p className="as-fehler">{weitergabe.msg}</p> : null}
                    <div className="as-aktionen">
                      <button className="btn btn-primary" type="submit" disabled={weitergabe.busy || weitergabe.frage.trim().length < 5}>{weitergabe.busy ? "Wird gesendet …" : "Weitergeben"}</button>
                      <button className="btn btn-outline" type="button" onClick={() => setWeitergabe(null)}>Abbrechen</button>
                    </div>
                  </form>
                )
              ) : null}
            </div>
          )
        ))}
      </div>

      <form className="as-eingabe" onSubmit={absenden}>
        <textarea
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); fragen(eingabe); } }}
          placeholder="Eure Frage an den Assistenten …"
          rows={1}
          maxLength={2000}
          aria-label="Frage an den Assistenten"
        />
        <button type="submit" className="as-senden" disabled={laeuft || !eingabe.trim()} aria-label="Frage senden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </form>
      <p className="as-fuss">Der Assistent antwortet nur aus Wissen, das NEST geprüft und freigegeben hat, und ersetzt keine Rechtsberatung. Chatverläufe speichern wir nicht.</p>
    </div>
  );
}
