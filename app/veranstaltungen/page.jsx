import VeranstaltungenView from "@/components/VeranstaltungenView";

// Geheime Seite: nicht in den Menüs verlinkt und für Suchmaschinen gesperrt.
// Der Link wird direkt verteilt.
export const metadata = {
  title: "Veranstaltungen – NEST BildungsBar",
  robots: { index: false, follow: false },
};

export default function VeranstaltungenPage() {
  return <VeranstaltungenView />;
}
