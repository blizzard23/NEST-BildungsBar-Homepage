import html from "@/content/kooperation";

export const metadata = {
  title: "Für Unternehmen – NEST-Partner werden | NEST BildungsBar",
  description:
    "NEST-Partner finden Azubis und halten sie: NEST Explore, NESTplay, Workshops an Schulen, Beratung und Vernetzung über die BildungsBar, Workshops von NEST AzubiConnect, Ausbildungsdialog und Netzwerk.",
};

// Wie im Root-Layout: Cache-Busting über den Commit-SHA.
const V = (process.env.VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 8);

export default function Page() {
  return (
    <>
      {/* Gestaltung nach dem Redesign (bb.css) plus seitenspezifische Ergänzungen */}
      <link rel="stylesheet" href={`/assets/bb.css?v=${V}`} />
      <link rel="stylesheet" href={`/assets/partner.css?v=${V}`} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
