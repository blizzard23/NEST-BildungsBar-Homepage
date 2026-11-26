import { notFound } from "next/navigation";
import { AZUBI_IDS, azubiFuerSeite, zugangGueltig } from "@/lib/azubiChat";
import AzubiChat from "./AzubiChat";

/* Azubi-Chat für Workshops. Nicht verlinkt und nicht in Suchmaschinen:
   erreichbar nur über den Link aus dem QR-Code der Persona-Profile
   (/azubi-chat/<zugangscode>?mit=leon bzw. ?mit=lisa). */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Azubi-Chat mit Leon und Lisa – NEST BildungsBar",
  description: "Workshop-Begleitung: Chatte mit den Azubi-Personas Leon und Lisa.",
  robots: { index: false, follow: false, nocache: true },
};

// Wie im Root-Layout: Cache-Busting über den Commit-SHA.
const V = (process.env.VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 8);

export default function Page({ params, searchParams }) {
  const zugang = String(params?.zugang || "");
  if (!zugangGueltig(zugang)) notFound();

  const mit = String(searchParams?.mit || "").toLowerCase();
  const start = AZUBI_IDS.includes(mit) ? mit : AZUBI_IDS[0];

  return (
    <>
      <link rel="stylesheet" href={`/assets/azubi-chat.css?v=${V}`} />
      <AzubiChat zugang={zugang} azubis={AZUBI_IDS.map(azubiFuerSeite)} start={start} />
    </>
  );
}
