import html from "@/content/kooperation";

export const metadata = {
  title: "Für Unternehmen – NEST-Partner werden | NEST BildungsBar",
  description:
    "NEST-Partner finden Azubis und halten sie: NEST Explore, NESTplay, Stellenseite und Vermittlung über die BildungsBar, Workshops von NEST AzubiConnect, Ausbildungsdialog und Netzwerk.",
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
