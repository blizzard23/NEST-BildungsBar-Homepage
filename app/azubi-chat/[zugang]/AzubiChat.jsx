"use client";
import { useEffect, useRef, useState } from "react";
import { FormatierterText } from "@/components/FormatierterText";

const svg = (kinder, w = 2) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kinder}</svg>
);
const IC = {
  senden: svg(<><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>, 2.4),
  pfeil: svg(<><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></>),
  stift: svg(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>),
  neu: svg(<><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></>),
  vergroessern: svg(<><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>),
  verkleinern: svg(<><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>),
  kopieren: svg(<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
  haken: svg(<polyline points="20 6 9 17 4 12" />, 2.4),
  runter: svg(<polyline points="6 9 12 15 18 9" />),
};

const SPEICHER = "nest-azubi-chat:";

// Verlauf nur im Browser-Tab merken (übersteht ein Neuladen der Seite).
function laden(id) {
  try {
    const roh = sessionStorage.getItem(SPEICHER + id);
    const v = roh ? JSON.parse(roh) : [];
    return Array.isArray(v) ? v.filter((m) => m && (m.rolle === "frage" || m.rolle === "antwort") && typeof m.text === "string") : [];
  } catch { return []; }
}
function speichern(id, verlauf) {
  try {
    const fertig = verlauf.filter((m) => !m.wartet).map(({ rolle, text, hinweis, fehler }) => ({ rolle, text, hinweis, fehler }));
    if (fertig.length) sessionStorage.setItem(SPEICHER + id, JSON.stringify(fertig));
    else sessionStorage.removeItem(SPEICHER + id);
  } catch { /* Speicher nicht verfügbar (privates Fenster o. Ä.) */ }
}

/* Workshop-Chat mit den Azubi-Personas. Jede Persona hat ihren eigenen Verlauf;
   beim Wechsel bleibt der andere erhalten. */
export default function AzubiChat({ zugang, azubis, start }) {
  const [aktiv, setAktiv] = useState(start);
  const [verlaeufe, setVerlaeufe] = useState(() => Object.fromEntries(azubis.map((a) => [a.id, []])));
  const [geladen, setGeladen] = useState(false);
  const [eingabe, setEingabe] = useState("");
  const [laeuft, setLaeuft] = useState(null); // id der Persona, die gerade antwortet
  const [vollbild, setVollbild] = useState(false);
  const [profilOffen, setProfilOffen] = useState(false);
  const [kopiert, setKopiert] = useState(null);
  const listeRef = useRef(null);
  const eingabeRef = useRef(null);

  const a = azubis.find((x) => x.id === aktiv) || azubis[0];
  const verlauf = verlaeufe[a.id] || [];
  const hatFragen = verlauf.some((m) => m.rolle === "frage");

  useEffect(() => {
    setVerlaeufe(Object.fromEntries(azubis.map((x) => [x.id, laden(x.id)])));
    setGeladen(true);
  }, [azubis]);

  useEffect(() => {
    if (!geladen || laeuft) return;
    for (const x of azubis) speichern(x.id, verlaeufe[x.id] || []);
  }, [verlaeufe, geladen, laeuft, azubis]);

  // Eingabefeld wächst mit dem Text mit (bis zur CSS-Höchsthöhe).
  useEffect(() => {
    const el = eingabeRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [eingabe, aktiv]);

  // Neueste Nachricht im Blick; vor der ersten Frage die Begrüßung von oben.
  useEffect(() => {
    const el = listeRef.current;
    if (el) el.scrollTop = hatFragen ? el.scrollHeight : 0;
  }, [verlauf, aktiv, vollbild, hatFragen]);

  // Vollbild: Seite dahinter nicht scrollen, Escape schließt.
  useEffect(() => {
    if (!vollbild) return;
    const vorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const taste = (e) => { if (e.key === "Escape") setVollbild(false); };
    window.addEventListener("keydown", taste);
    return () => { document.body.style.overflow = vorher; window.removeEventListener("keydown", taste); };
  }, [vollbild]);

  function wechseln(id) {
    if (id === aktiv) return;
    setAktiv(id);
    setProfilOffen(false);
    try { window.history.replaceState(null, "", "?mit=" + id); } catch { /* egal */ }
  }

  async function senden(text) {
    const frage = String(text || "").trim();
    if (!frage || laeuft) return;
    const id = a.id;
    const bisher = verlaeufe[id] || [];
    setEingabe("");

    // Nur vollständige Frage-Antwort-Paare gehen als Verlauf mit; fehlgeschlagene fallen weg.
    const paare = [];
    for (let i = 0; i < bisher.length - 1; i++) {
      const f = bisher[i], b = bisher[i + 1];
      if (f.rolle === "frage" && b.rolle === "antwort" && b.text && !b.fehler) { paare.push(f, b); i++; }
    }
    const basis = [...paare, { rolle: "frage", text: frage }];

    setVerlaeufe((v) => ({ ...v, [id]: [...(v[id] || []), { rolle: "frage", text: frage }, { rolle: "antwort", text: "", wartet: true }] }));
    setLaeuft(id);

    const aktualisieren = (fn) => setVerlaeufe((v) => {
      const kopie = (v[id] || []).slice();
      kopie[kopie.length - 1] = fn({ ...kopie[kopie.length - 1] });
      return { ...v, [id]: kopie };
    });

    try {
      const res = await fetch("/api/azubi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zugang, azubi: id, verlauf: basis.map((m) => ({ rolle: m.rolle, text: m.text })) }),
      });
      if (!res.ok || !res.body) {
        let meldung = `${a.name} ist gerade nicht erreichbar. Bitte versuch es gleich noch einmal.`;
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
          else if (ev.t === "hinweis") aktualisieren((m) => ({ ...m, wartet: false, hinweis: ev.v }));
          else if (ev.t === "fehler") aktualisieren((m) => ({ ...m, wartet: false, fehler: ev.v }));
        }
      }
      aktualisieren((m) => (m.text || m.fehler || m.hinweis ? { ...m, wartet: false } : { ...m, wartet: false, fehler: "Es kam keine Antwort. Bitte versuch es noch einmal." }));
    } catch {
      aktualisieren((m) => ({ ...m, wartet: false, fehler: "Keine Verbindung. Bitte prüf deine Internetverbindung." }));
    } finally {
      setLaeuft(null);
    }
  }

  // Letzte Frage nach einem Fehler noch einmal schicken
  function nochmal() {
    const letzte = verlauf.length >= 2 ? verlauf[verlauf.length - 2] : null;
    if (!letzte || letzte.rolle !== "frage" || laeuft) return;
    // Fehlgeschlagenes Paar entfernen; senden() hängt die Frage danach neu an
    // (beide Updates laufen der Reihe nach) und schickt fehlgeschlagene Paare nie mit.
    setVerlaeufe((v) => ({ ...v, [a.id]: (v[a.id] || []).slice(0, -2) }));
    senden(letzte.text);
  }

  function vorschlag(v) {
    if (v.vorlage) {
      setEingabe(v.vorlage);
      setTimeout(() => {
        const el = eingabeRef.current;
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      }, 0);
    } else {
      senden(v.text);
    }
  }

  function neuerChat() {
    if (laeuft) return;
    setVerlaeufe((v) => ({ ...v, [a.id]: [] }));
    setEingabe("");
    setKopiert(null);
    setTimeout(() => eingabeRef.current?.focus(), 0);
  }

  async function kopieren(i, text) {
    try { await navigator.clipboard.writeText(text); setKopiert(i); setTimeout(() => setKopiert((k) => (k === i ? null : k)), 2000); }
    catch { /* Zwischenablage nicht verfügbar */ }
  }

  const antwortBlase = (m, i, letzte) => (
    <div key={i} className="as-msg as-msg--antwort">
      <img className="ac-msg-foto" src={a.foto} alt="" width="30" height="30" />
      <div className="as-msg-inhalt">
        <div className="as-msg-name">{a.name}</div>
        {m.wartet ? <span className="as-tippt" aria-label={`${a.name} schreibt`}><i /><i /><i /></span> : null}
        {m.text ? <div className="as-text"><FormatierterText text={m.text} /></div> : null}
        {m.hinweis ? <p className="as-hinweis">{m.hinweis}</p> : null}
        {m.fehler ? <p className="as-fehler">{m.fehler}</p> : null}
        {i >= 0 && !m.wartet && !(laeuft === a.id && letzte) ? (
          <div className="as-msg-aktionen">
            {m.text ? (
              <button type="button" className="as-aktion" onClick={() => kopieren(i, m.text)}>
                {kopiert === i ? IC.haken : IC.kopieren}{kopiert === i ? "Kopiert" : "Kopieren"}
              </button>
            ) : null}
            {m.fehler && letzte ? (
              <button type="button" className="as-aktion" onClick={nochmal} disabled={Boolean(laeuft)}>
                {IC.neu}Nochmal senden
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <section className="ac-seite">
      <div className="container">
        <header className="ac-kopf">
          <span className="ac-eyebrow">Workshop · Azubi-Chat</span>
          <h1 className="ac-h1">Frag nach, wie Azubis ticken</h1>
          <p className="ac-lead">
            Leon und Lisa sind KI-Personas zu den Profilen aus dem Workshop. Stell ihnen Fragen, spiel Situationen durch
            oder lass sie eure Stellenanzeige lesen. Sie antworten ehrlich aus ihrer Sicht.
          </p>
        </header>

        <div className="ac-tabs" role="tablist" aria-label="Mit wem möchtest du chatten?">
          {azubis.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={x.id === a.id}
              className={"ac-tab" + (x.id === a.id ? " is-aktiv" : "")} onClick={() => wechseln(x.id)}>
              <img src={x.foto} alt="" width="44" height="44" />
              <span><b>{x.name}</b><small>{x.rolle}</small></span>
              {laeuft === x.id && x.id !== a.id ? <i className="ac-tab-tippt" aria-label={`${x.name} schreibt`} /> : null}
            </button>
          ))}
        </div>

        <div className="ac-grid">
          <aside className={"ac-profil" + (profilOffen ? " is-offen" : "")} aria-label={`Steckbrief von ${a.name}`}>
            <div className="ac-profil-kopf">
              <img className="ac-profil-foto" src={a.foto} alt={`${a.name}, Persona aus dem Workshop`} width="480" height="480" />
              <div>
                <b className="ac-profil-name">{a.name}</b>
                <span className="ac-profil-rolle">{a.rolle}</span>
              </div>
              <button type="button" className="ac-profil-toggle" aria-expanded={profilOffen} onClick={() => setProfilOffen((o) => !o)}>
                Steckbrief von {a.name}{IC.runter}
              </button>
            </div>
            <div className="ac-profil-body">
              <dl className="ac-fakten">
                {a.fakten.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
              {[["Wichtig", a.wichtig, "ac-liste--wichtig"], ["Nervt", a.nervt, "ac-liste--nervt"], ["Motiviert", a.motiviert, "ac-liste--motiviert"]].map(([titel, punkte, art]) => (
                <div key={titel} className={"ac-liste " + art}>
                  <span className="ac-liste-titel">{titel}</span>
                  <ul>{punkte.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>
          </aside>

          <div className={"as-chat ac-chat" + (vollbild ? " as-chat--vollbild" : "")} role={vollbild ? "dialog" : undefined}
            aria-modal={vollbild || undefined} aria-label={vollbild ? `Chat mit ${a.name} im Vollbild` : undefined}>
            <div className="as-chat-head">
              <img className="ac-kopf-foto" src={a.foto} alt="" width="38" height="38" />
              <div>
                <b>{a.name}</b>
                <small><i className="as-online" aria-hidden="true" />{a.rolle} · KI-Persona</small>
              </div>
              <div className="as-kopf-aktionen">
                {hatFragen ? (
                  <button type="button" className="as-kopf-btn" onClick={neuerChat} disabled={Boolean(laeuft)} title="Neuen Chat beginnen">
                    {IC.stift}<span>Neuer Chat</span>
                  </button>
                ) : null}
                <button type="button" className="as-kopf-btn" onClick={() => setVollbild((v) => !v)}
                  aria-label={vollbild ? "Vollbild schließen" : "Im Vollbild öffnen"} title={vollbild ? "Vollbild schließen (Esc)" : "Im Vollbild öffnen"}>
                  {vollbild ? IC.verkleinern : IC.vergroessern}
                  <span>{vollbild ? "Schließen" : "Vollbild"}</span>
                </button>
              </div>
            </div>

            <div className="as-verlauf ac-verlauf" ref={listeRef} aria-live="polite">
              {antwortBlase({ text: a.begruessung }, -1, false)}
              {verlauf.map((m, i) => (
                m.rolle === "frage"
                  ? <div key={i} className="as-msg as-msg--frage"><div className="as-blase">{m.text}</div></div>
                  : antwortBlase(m, i, i === verlauf.length - 1)
              ))}
            </div>

            {!hatFragen ? (
              <div className="ac-vorschlaege">
                <span className="as-vorschlaege-titel">Zum Einstieg</span>
                <div className="ac-vorschlaege-liste">
                  {a.vorschlaege.map((v) => (
                    <button key={v.text} type="button" className={"ac-vorschlag" + (v.vorlage ? " ac-vorschlag--vorlage" : "")}
                      onClick={() => vorschlag(v)} disabled={Boolean(laeuft)}>
                      {v.vorlage ? IC.stift : IC.pfeil}<span>{v.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="as-unten">
              <form className="as-composer" onSubmit={(e) => { e.preventDefault(); senden(eingabe); }}>
                <textarea
                  ref={eingabeRef}
                  value={eingabe}
                  onChange={(e) => setEingabe(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); senden(eingabe); } }}
                  placeholder={`Schreib ${a.name} eine Nachricht …`}
                  rows={1}
                  maxLength={4000}
                  aria-label={`Nachricht an ${a.name}`}
                />
                <div className="as-composer-leiste">
                  <span className="as-composer-hinweis">Enter zum Senden · Shift + Enter für eine neue Zeile</span>
                  <button type="submit" className="as-senden" disabled={Boolean(laeuft) || !eingabe.trim()} aria-label="Nachricht senden">
                    {IC.senden}
                  </button>
                </div>
              </form>
            </div>
            <p className="as-fuss">
              {a.name} ist eine fiktive KI-Persona für den Workshop und kann danebenliegen. Bitte keine persönlichen Daten eingeben.
              Wir speichern keine Chats; der Verlauf bleibt nur in diesem Browser-Tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
