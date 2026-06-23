import VeranstaltungenView from "@/components/VeranstaltungenView";

// Direktlink zu einer einzelnen Veranstaltung: öffnet den Kalender mit der
// gewählten Veranstaltung und dem Anmeldeformular. Nicht für Suchmaschinen.
export const metadata = {
  title: "Veranstaltung – NEST BildungsBar",
  robots: { index: false, follow: false },
};

export default function VeranstaltungDirektPage({ params }) {
  return <VeranstaltungenView initialEventId={params.id} />;
}
