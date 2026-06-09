export const metadata = { title: "Beruf – NEST BildungsBar" };

/* Inhalt wird clientseitig aus der Berufe-Datenbank erzeugt (Aufruf: /beruf?b=<slug>).
   Die Logik steckt im gebündelten Script (renderBerufDetail in berufe-ui.js). */
export default function BerufPage() {
  return <main id="beruf-detail"></main>;
}
