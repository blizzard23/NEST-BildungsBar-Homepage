/* ───────────────────────────────────────────────────────────────────────────
   Anbindung an die NEST-Messe (NEST Explore)

   Die Messe-Termine werden zentral im NEST-Messe-Projekt (nest-messe.de) in der
   Supabase-Tabelle `messe_termine` gepflegt. Da beide Seiten dasselbe Supabase-
   Projekt nutzen und die Tabelle eine öffentliche Read-Policy hat
   (`messe_termine_public_read` für anon), kann die BildungsBar-Seite die
   kommenden Termine direkt mit dem anon-Key lesen – ausschließlich lesend.

   Tabelle  messe_termine(id, schule, ort, datum, uhrzeit, schueler, klassen,
                          plaetze, belegt, highlight, neu)

   `mapMesseTermin` wandelt eine Datenbankzeile in das Anzeige-Format um, das
   das Partner-Portal („Kommende Messetermine") erwartet. Der Datenvertrag ist
   bewusst an `lib/termine.js` im Messe-Projekt angelehnt.
   ─────────────────────────────────────────────────────────────────────────── */

const MONATE_VOLL = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const MONATE_KURZ = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];
const WOCHENTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export function mapMesseTermin(row) {
  const [jahr, monat, tag] = String(row.datum).split("-").map(Number);
  const d = new Date(Date.UTC(jahr, monat - 1, tag));
  const monatIdx = monat - 1;

  const plaetze = Number(row.plaetze) || 0;
  const belegt = Number(row.belegt) || 0;
  const frei = Math.max(0, plaetze - belegt);
  const ausgebucht = plaetze > 0 && frei <= 0;

  // Info-Zeile: Klassenstufe, Schülerzahl und Platz-Verfügbarkeit
  const teile = [];
  if (row.klassen) teile.push(row.klassen);
  if (row.schueler) teile.push(`${row.schueler} Schüler:innen`);
  if (plaetze > 0) teile.push(ausgebucht ? "ausgebucht" : `${frei} von ${plaetze} Plätzen frei`);

  return {
    id: row.id,
    datum: row.datum,
    tag: String(tag).padStart(2, "0"),
    monat_kurz: MONATE_KURZ[monatIdx],
    wochentag: WOCHENTAGE[d.getUTCDay()],
    datum_text: `${WOCHENTAGE[d.getUTCDay()]}, ${tag}. ${MONATE_VOLL[monatIdx]} ${jahr}`,
    titel: row.schule || "NEST Explore",
    schule: row.schule || "",
    ort: row.ort || "",
    uhrzeit: row.uhrzeit || "",
    schueler: row.schueler || "",
    klassen: row.klassen || "",
    plaetze,
    belegt,
    frei,
    ausgebucht,
    info: teile.join(" · "),
    highlight: !!row.highlight,
    neu: !!row.neu,
  };
}
