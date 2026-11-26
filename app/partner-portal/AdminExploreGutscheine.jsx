"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* Admin: Übersicht der NEST-Explore-Jahresgutscheine.
   Wer hat seinen Gutschein für das Jahr schon eingelöst, wer noch nicht?

   Die Daten kommen aus admin_explore_jahresgutscheine (nur für
   info@nest-bildungsbar.de). Für ein laufendes Gutscheinjahr stellt die
   Funktion fehlende Codes gleich aus, damit jedes bestätigte Konto seinen
   Code hat, auch wenn es sich noch nicht eingeloggt hat. */

const FILTER = [
  ["offen", "Noch nicht eingelöst"],
  ["eingeloest", "Eingelöst"],
  ["gesperrt", "Gesperrt"],
  ["alle", "Alle"],
];

function datumKurz(iso) {
  if (!iso) return "";
  const d = new Date(String(iso).length === 10 ? iso + "T12:00:00" : iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Status einer Zeile für Filter, Badge und Export
function statusVon(z) {
  if (z.eingeloest_am) return "eingeloest";
  if (!z.gutschein_id) return z.konto_geloescht ? "verfallen" : "ohne";
  if (z.konto_geloescht) return "verfallen";
  if (z.gesperrt) return "gesperrt";
  return "offen";
}
const STATUS_TEXT = {
  eingeloest: "eingelöst",
  offen: "noch offen",
  gesperrt: "gesperrt",
  ohne: "Zugang nicht bestätigt",
  verfallen: "Konto gelöscht",
};

function csvFeld(v) {
  const s = v == null ? "" : String(v);
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function AdminExploreGutscheine() {
  const [jahr, setJahr] = useState(null);
  const [daten, setDaten] = useState(null); // { jahr, jahre, ausgegeben, zeilen }
  const [fehler, setFehler] = useState("");
  const [filter, setFilter] = useState("offen");
  const [suche, setSuche] = useState("");
  const [busy, setBusy] = useState("");
  const [kopiert, setKopiert] = useState("");

  const laden = useCallback(async (j) => {
    const { data, error } = await supabase.rpc("admin_explore_jahresgutscheine", j ? { p_jahr: j } : {});
    if (error) { setFehler("Jahresgutscheine konnten nicht geladen werden: " + error.message); return; }
    setFehler("");
    setDaten(data);
    setJahr(data.jahr);
  }, []);
  useEffect(() => { laden(null); }, [laden]);

  const zeilen = (daten && daten.zeilen) || [];
  const zaehler = useMemo(() => {
    const z = { eingeloest: 0, offen: 0, gesperrt: 0, ohne: 0, verfallen: 0 };
    zeilen.forEach((r) => { z[statusVon(r)]++; });
    return z;
  }, [zeilen]);
  const mitCode = zaehler.eingeloest + zaehler.offen + zaehler.gesperrt;
  const anteil = mitCode ? Math.round((zaehler.eingeloest / mitCode) * 100) : 0;

  const sichtbar = zeilen.filter((r) => {
    const st = statusVon(r);
    if (filter === "offen" && st !== "offen" && st !== "ohne") return false;
    if (filter === "eingeloest" && st !== "eingeloest") return false;
    if (filter === "gesperrt" && st !== "gesperrt" && st !== "verfallen") return false;
    const q = suche.trim().toLowerCase();
    if (!q) return true;
    return [r.firma, r.email, r.code, r.eingeloest_von, r.schule].some((v) => String(v || "").toLowerCase().includes(q));
  });
  const anzahlFilter = {
    offen: zaehler.offen + zaehler.ohne,
    eingeloest: zaehler.eingeloest,
    gesperrt: zaehler.gesperrt + zaehler.verfallen,
    alle: zeilen.length,
  };

  async function sperren(r, gesperrt) {
    if (gesperrt && !window.confirm(`Gutschein von „${r.firma || r.email}" sperren? Das Unternehmen sieht den Code dann nicht mehr und kann ihn nicht einlösen.`)) return;
    setBusy(r.gutschein_id);
    const { error } = await supabase.from("messe_gutscheine").update({ gesperrt }).eq("id", r.gutschein_id);
    setBusy("");
    if (error) { setFehler("Speichern fehlgeschlagen: " + error.message); return; }
    laden(jahr);
  }

  // Einlösung zurücknehmen, z. B. wenn die Buchung storniert wurde. Solange die
  // Buchung noch besteht, bleibt der Knopf weg, sonst wäre der Platz doppelt frei.
  async function freigeben(r) {
    if (!window.confirm(`Gutschein von „${r.firma || r.email}" wieder freigeben? Das Unternehmen kann ihn danach erneut für einen Termin in ${jahr} einlösen.`)) return;
    setBusy(r.gutschein_id);
    const { error } = await supabase.from("messe_gutscheine")
      .update({ eingeloest_am: null, eingeloest_von: null, buchung_id: null })
      .eq("id", r.gutschein_id);
    setBusy("");
    if (error) { setFehler("Freigeben fehlgeschlagen: " + error.message); return; }
    laden(jahr);
  }

  async function kopieren(code) {
    try { await navigator.clipboard.writeText(code); setKopiert(code); setTimeout(() => setKopiert(""), 1500); }
    catch { window.prompt("Code zum Kopieren:", code); }
  }

  function exportieren() {
    const kopf = ["Unternehmen", "E-Mail (Login)", "Code", "Status", "Eingelöst am", "Eingelöst von", "Termin", "Schule"];
    const liste = sichtbar.map((r) => [
      r.firma, r.email, r.code, STATUS_TEXT[statusVon(r)], datumKurz(r.eingeloest_am),
      r.eingeloest_von, r.termin_datum ? datumKurz(r.termin_datum) : r.termin_text, r.schule,
    ]);
    const csv = "﻿" + [kopf, ...liste].map((z) => z.map(csvFeld).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url; a.download = `explore-gutscheine-${jahr}-${filter}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Erinnerung an alle, die ihren Gutschein noch nicht eingelöst haben (BCC)
  const offeneMails = zeilen.filter((r) => statusVon(r) === "offen" && r.email).map((r) => r.email);
  const erinnerung = "mailto:?bcc=" + encodeURIComponent(offeneMails.join(","))
    + "&subject=" + encodeURIComponent(`Euer NEST-Explore-Gutschein ${jahr}`)
    + "&body=" + encodeURIComponent(
      `Hallo,\n\nin eurer NEST-Partnerschaft ist ${jahr} ein Termin NEST Explore enthalten. Euren persönlichen Gutscheincode findet ihr im Partner-Login unter „NEST Explore“:\nhttps://nest-bildungsbar.de/partner-portal#abschnitt-messe\n\nDer Code gilt für einen Termin in ${jahr} und lässt sich bis zum 31.12.${jahr} einlösen. Bucht dafür im Terminkalender mit eurer Firmen-E-Mail-Adresse:\nhttps://nest-explore.de/terminkalender\n\nViele Grüße\nEuer NEST-Team`
    );

  return (
    <div className="ex-adm">
      <div id="abschnitt-explore-gutscheine" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
      <div className="as-admin-kopf">
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: 0 }}>NEST Explore – Jahresgutscheine</h3>
        {daten && daten.jahre && daten.jahre.length > 1 ? (
          <div className="ex-adm-jahre" role="tablist" aria-label="Gutscheinjahr">
            {daten.jahre.map((j) => (
              <button key={j} type="button" role="tab" aria-selected={j === jahr} className={"ex-adm-chip" + (j === jahr ? " is-on" : "")} onClick={() => laden(j)}>{j}</button>
            ))}
          </div>
        ) : null}
      </div>
      <p className="as-klein" style={{ marginTop: "-8px" }}>
        Jedes Partner-Konto bekommt pro Jahr einen Code für einen kostenfreien Explore-Platz. Er gilt nur für Termine im
        Gutscheinjahr, ist bis 31.12. einlösbar (den Code fürs Folgejahr gibt es ab 1. Dezember) und nicht übertragbar:
        Beim Buchen auf nest-explore.de muss die E-Mail-Adresse zum Partner-Zugang passen (gleiche Firmen-Domain, bei
        Freemail genau dieselbe Adresse).
      </p>

      {fehler ? <p className="as-fehler" style={{ marginBottom: "12px" }}>{fehler}</p> : null}
      {!daten && !fehler ? <p className="as-klein">Lädt …</p> : null}

      {daten ? (
        <>
          <div className="ex-adm-zahlen">
            <div className="ex-adm-zahl">
              <span>Eingelöst</span>
              <b>{zaehler.eingeloest}<small> / {mitCode}</small></b>
              <div className="ex-adm-balken" aria-hidden="true"><i style={{ width: anteil + "%" }}></i></div>
            </div>
            <div className="ex-adm-zahl"><span>Noch nicht eingelöst</span><b>{zaehler.offen}</b><small>{zaehler.ohne ? `+ ${zaehler.ohne} Zugang nicht bestätigt` : "mit gültigem Code"}</small></div>
            <div className="ex-adm-zahl"><span>Gesperrt</span><b>{zaehler.gesperrt}</b><small>{zaehler.verfallen ? `+ ${zaehler.verfallen} Konto gelöscht` : "z. B. kein NEST-Partner"}</small></div>
          </div>
          {!daten.ausgegeben ? <p className="as-klein">Für {jahr} werden keine Codes mehr ausgegeben oder eingelöst. Hier seht ihr den Stand am Jahresende.</p> : null}

          <div className="ex-adm-leiste">
            <div className="ex-adm-filter">
              {FILTER.map(([k, label]) => (
                <button key={k} type="button" className={"ex-adm-chip" + (filter === k ? " is-on" : "")} onClick={() => setFilter(k)}>
                  {label} <span>{anzahlFilter[k]}</span>
                </button>
              ))}
            </div>
            <div className="ex-adm-werkzeuge">
              <input className="ex-adm-suche" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Unternehmen, E-Mail oder Code …" aria-label="Liste durchsuchen" />
              <button type="button" className="btn btn-outline" onClick={exportieren} disabled={!sichtbar.length}>CSV</button>
              {daten.ausgegeben && offeneMails.length ? <a className="btn btn-outline" href={erinnerung}>Erinnern ({offeneMails.length})</a> : null}
            </div>
          </div>

          <div className="ex-adm-tabelle" role="table" aria-label={`Jahresgutscheine ${jahr}`}>
            {!sichtbar.length ? <p className="as-klein" style={{ padding: "18px" }}>Keine Einträge in dieser Ansicht.</p> : null}
            {sichtbar.map((r) => {
              const st = statusVon(r);
              const buchungWeg = st === "eingeloest" && (!r.buchung_id || r.buchung_status === "abgelehnt");
              const andereFirma = st === "eingeloest" && r.eingeloest_von && r.firma && r.eingeloest_von.trim().toLowerCase() !== r.firma.trim().toLowerCase();
              return (
                <div key={r.gutschein_id || r.user_id} className="ex-adm-zeile" role="row">
                  <div className="ex-adm-firma" role="cell">
                    <b>{r.firma || r.email || "Unbekannt"}</b>
                    <small>{r.email || "Konto gelöscht"}</small>
                  </div>
                  <div className="ex-adm-code" role="cell">
                    {r.code ? (
                      <button type="button" className="ex-adm-codebtn" onClick={() => kopieren(r.code)} title="Code kopieren">
                        <code>{r.code}</code><span>{kopiert === r.code ? "kopiert ✓" : "kopieren"}</span>
                      </button>
                    ) : <small className="ex-adm-leise">kein Code</small>}
                  </div>
                  <div className="ex-adm-status" role="cell">
                    <span className={"as-badge" + (st === "eingeloest" ? " as-badge--ok" : st === "offen" ? "" : " as-badge--aus")}>{STATUS_TEXT[st]}</span>
                    {st === "eingeloest" ? (
                      <small>
                        am {datumKurz(r.eingeloest_am)}
                        {r.termin_datum || r.termin_text ? <> · Termin {r.termin_datum ? datumKurz(r.termin_datum) : r.termin_text}</> : null}
                        {r.schule ? <> · {r.schule}</> : null}
                        {r.buchung_email ? <> · gebucht mit {r.buchung_email}</> : null}
                      </small>
                    ) : null}
                    {buchungWeg ? <small className="ex-adm-warn">Buchung {r.buchung_id ? "abgelehnt" : "gelöscht"}</small> : null}
                    {andereFirma ? <small className="ex-adm-warn">als „{r.eingeloest_von}" gebucht</small> : null}
                  </div>
                  <div className="ex-adm-aktionen" role="cell">
                    {buchungWeg ? <button type="button" className="btn btn-outline" disabled={busy === r.gutschein_id} onClick={() => freigeben(r)}>Wieder freigeben</button> : null}
                    {r.gutschein_id && st === "offen" ? <button type="button" className="btn btn-danger" disabled={busy === r.gutschein_id} onClick={() => sperren(r, true)}>Sperren</button> : null}
                    {st === "gesperrt" ? <button type="button" className="btn btn-outline" disabled={busy === r.gutschein_id} onClick={() => sperren(r, false)}>Entsperren</button> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
