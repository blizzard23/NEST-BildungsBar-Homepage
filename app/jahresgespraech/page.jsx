import html from "@/content/jahresgespraech";

export const metadata = {
  title: "Jahresplanungsgespräch 2027 – Termin buchen | NEST BildungsBar",
  description:
    "Lass uns gemeinsam dein Ausbildungsjahr 2027 planen: In 45 Minuten schauen wir, welche NEST Explore Termine und Workshops zu dir passen. Termin direkt im Kalender buchen.",
};

// Wie im Root-Layout: Cache-Busting über den Commit-SHA.
const V = (process.env.VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 8);

export default function Page() {
  return (
    <>
      {/* bb.css lädt das Root-Layout; hier nur die seitenspezifischen Ergänzungen */}
      <link rel="stylesheet" href={`/assets/jahresgespraech.css?v=${V}`} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
