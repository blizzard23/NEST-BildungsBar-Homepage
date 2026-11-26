"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* Jahresgutschein für NEST Explore im Partner-Login.

   Jedes Partnerunternehmen bekommt einmal im Jahr einen Code für einen
   kostenfreien Platz bei einer NEST-Explore-Veranstaltung („Ein Termin NEST
   Explore pro Jahr ist enthalten"). Der Code wird beim ersten Abruf in der
   Datenbank ausgestellt (mein_explore_gutschein, siehe
   supabase/explore-jahresgutscheine.sql) und im Buchungsformular auf
   nest-explore.de eingelöst.

   Regeln (werden beim Einlösen in der Datenbank geprüft):
   - gilt nur für Termine im Gutscheinjahr und ist bis 31.12. einlösbar,
   - nicht übertragbar: nur mit der E-Mail-Adresse des Partner-Zugangs oder
     einer anderen Adresse derselben Firmen-Domain,
   - einmal einlösbar. */

const TERMINKALENDER = "https://nest-explore.de/terminkalender";

function datumLang(iso) {
  if (!iso) return "";
  const d = new Date(String(iso).length === 10 ? iso + "T12:00:00" : iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

export default function ExploreGutschein() {
  const [daten, setDaten] = useState(null); // { email, firmen_domain, gutscheine: [] }
  const [kopiert, setKopiert] = useState("");

  useEffect(() => {
    let aktiv = true;
    supabase.rpc("mein_explore_gutschein").then(({ data, error }) => {
      if (!aktiv) return;
      if (error) { console.warn("Explore-Gutschein konnte nicht geladen werden:", error.message); return; }
      setDaten(data || null);
    });
    return () => { aktiv = false; };
  }, []);

  async function kopieren(code) {
    try {
      await navigator.clipboard.writeText(code);
      setKopiert(code);
      setTimeout(() => setKopiert(""), 1800);
    } catch {
      window.prompt("Code zum Kopieren:", code);
    }
  }

  const liste = (daten && daten.gutscheine) || [];
  if (!daten || daten.admin || !liste.length) return null;

  return (
    <div className="ex-gs-liste">
      {liste.map((g) => {
        const eingeloest = !!g.eingeloest_am;
        if (g.gesperrt && !eingeloest) {
          return (
            <div key={g.jahr} className="ex-gs ex-gs--aus">
              <div className="ex-gs-kopf"><span className="ex-gs-label">Explore-Gutschein {g.jahr}</span></div>
              <p className="ex-gs-text">
                Für euren Zugang ist aktuell kein Explore-Gutschein freigegeben. Fragen dazu?
                Schreibt uns an <a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a>.
              </p>
            </div>
          );
        }
        return (
          <div key={g.jahr} className={"ex-gs" + (eingeloest ? " ex-gs--eingeloest" : "")}>
            <div className="ex-gs-links">
              <div className="ex-gs-kopf">
                <span className="ex-gs-label">Euer Explore-Gutschein {g.jahr}</span>
                {eingeloest
                  ? <span className="ex-gs-status ex-gs-status--ok">✓ eingelöst</span>
                  : <span className="ex-gs-status">noch offen</span>}
              </div>
              <h4 className="ex-gs-titel">1 Termin NEST Explore inklusive</h4>
              <p className="ex-gs-text">
                {eingeloest
                  ? <>Eingelöst am {datumLang(g.eingeloest_am)}{g.termin_text || g.schule ? <> für <b>{[g.termin_text, g.schule].filter(Boolean).join(" · ")}</b></> : null}. Weitere Termine könnt ihr jederzeit regulär dazubuchen.</>
                  : <>Teil eurer Partnerschaft: ein kostenfreier Platz bei einem Explore-Termin in {g.jahr}. Gebt den Code im Buchungsformular ein, dann kostet der Platz 0 € und es kommt keine Rechnung.</>}
              </p>
              {!eingeloest ? (
                <ul className="ex-gs-regeln">
                  <li>Gilt für einen Termin im Jahr {g.jahr}, einlösbar bis {datumLang(g.gueltig_bis)}.</li>
                  <li>
                    Nicht übertragbar: Bucht mit {daten.firmen_domain
                      ? <>einer E-Mail-Adresse <b>@{daten.firmen_domain}</b></>
                      : <>genau eurer Login-Adresse <b>{daten.email}</b></>}.
                  </li>
                  <li>Nur einmal einlösbar, verfällt am Jahresende.</li>
                </ul>
              ) : null}
            </div>

            {g.code ? (
              <div className="ex-gs-rechts">
                <span className="ex-gs-code-label">{eingeloest ? "Code" : "Euer Code"}</span>
                <code className={"ex-gs-code" + (eingeloest ? " ex-gs-code--alt" : "")}>{g.code}</code>
                {!eingeloest ? (
                  <>
                    <button type="button" className="btn btn-outline ex-gs-kopieren" onClick={() => kopieren(g.code)}>
                      {kopiert === g.code ? "Kopiert ✓" : "Code kopieren"}
                    </button>
                    <a className="btn btn-primary" href={TERMINKALENDER + "?gutschein=" + encodeURIComponent(g.code)} target="_blank" rel="noopener">
                      Termin mit Gutschein buchen ↗
                    </a>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
