/* ───────────────────────────────────────────────────────────────────────────
   NEST Explore – Hinweise an Unternehmen bei neuen Terminen

   Unternehmen geben im Partner-Portal an, ob sie über neue NEST-Explore-
   Termine informiert werden möchten und für welche Orte und Schulformen
   (Tabelle `explore_praeferenzen`, siehe supabase/explore-hinweise.sql).
   Die Route /api/cron/explore-hinweise prüft neue Termine dagegen und
   verschickt die Mails.

   Hier steckt die Logik, die Portal und Versand gemeinsam brauchen. Die Datei
   hat bewusst keine Server-Abhängigkeiten, damit sie auch im Browser läuft.
   ─────────────────────────────────────────────────────────────────────────── */

export const EXPLORE_TERMINKALENDER = "https://nest-explore.de/terminkalender";

/* Auswahl im Portal. `wert` landet in der Datenbank, `label` steht am Knopf. */
export const SCHULFORMEN = [
  { wert: "Hauptschule", label: "Hauptschule" },
  { wert: "Realschule", label: "Realschule" },
  { wert: "Sekundarschule", label: "Sekundarschule" },
  { wert: "Gesamtschule", label: "Gesamtschule" },
  { wert: "Gymnasium", label: "Gymnasium" },
  { wert: "Berufskolleg", label: "Berufskolleg" },
  { wert: "Förderschule", label: "Förderschule" },
  { wert: "Weiterbildung", label: "Weiterbildung (VHS, Abendschule)" },
];

/* Orte, die im Portal immer zur Wahl stehen. Dazu kommen alle Städte, in
   denen es schon NEST-Explore-Termine gab (siehe ortOptionen). */
export const ORTE_BASIS = ["Wuppertal", "Solingen", "Remscheid", "Essen"];

/* `messe_termine` hat keine Spalte für die Schulform – sie wird aus dem Namen
   der Schule abgeleitet. Reihenfolge zählt: "Abendrealschule" ist
   Weiterbildung, nicht Realschule; "Berufskolleg … Europaschule" ist ein
   Berufskolleg. */
const SCHULFORM_MUSTER = [
  [/volkshochschule|\bvhs\b|weiterbildungskolleg|abendrealschule|abendgymnasium|abendschule/i, "Weiterbildung"],
  [/berufskolleg|berufsschule/i, "Berufskolleg"],
  [/f(ö|oe)rderschule|f(ö|oe)rderzentrum/i, "Förderschule"],
  [/sekundarschule/i, "Sekundarschule"],
  [/gesamtschule/i, "Gesamtschule"],
  [/gymnasium/i, "Gymnasium"],
  [/realschule/i, "Realschule"],
  [/hauptschule/i, "Hauptschule"],
];

/* Schulform eines Termins, oder null, wenn der Name sie nicht verrät
   (z. B. "Albert-Einstein-Schule"). Pflegt nest-explore.de irgendwann eine
   eigene Spalte `schulform`, hat die Vorrang. */
export function schulformVon(termin) {
  if (termin?.schulform) return termin.schulform;
  const name = String(termin?.schule || "");
  for (const [muster, form] of SCHULFORM_MUSTER) if (muster.test(name)) return form;
  return null;
}

/* "Wuppertal-Oberbarmen" -> "Wuppertal", "Essen (Steele)" -> "Essen" */
export function stadtVon(ort) {
  return String(ort || "").split(/\s*[-–,/(]\s*/)[0].trim();
}

function gleich(a, b) {
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

/* Alle Orte für die Auswahl im Portal: feste Basis + Städte aus den Terminen
   + was das Unternehmen schon gespeichert hat (damit nichts verschwindet). */
export function ortOptionen(termine = [], gespeichert = []) {
  const alle = [...ORTE_BASIS, ...termine.map((t) => stadtVon(t.ort)), ...gespeichert];
  const out = [];
  for (const o of alle) if (o && !out.some((x) => gleich(x, o))) out.push(o);
  return out;
}

/* Passt ein Termin zu den Angaben eines Unternehmens?
   - Keine Orte bzw. Schulformen gewählt heißt: alle.
   - Lässt sich die Schulform nicht ermitteln, gilt der Termin als passend –
     lieber einmal zu viel informieren, als einen Termin zu verschweigen. */
export function terminPasst(termin, praef) {
  const orte = praef?.orte || [];
  if (orte.length && !orte.some((o) => gleich(o, stadtVon(termin.ort)))) return false;
  const formen = praef?.schulformen || [];
  const form = schulformVon(termin);
  if (formen.length && form && !formen.some((f) => gleich(f, form))) return false;
  return true;
}
