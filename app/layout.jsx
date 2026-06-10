import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NEST BildungsBar – Kostenfreie Berufsorientierung",
  description:
    "Kostenfreie, lockere Berufsorientierung auf Augenhöhe. Über 150 Ausbildungsberufe, Beratung in Wuppertal & Essen. Teil des NEST Ökosystems.",
};

export const viewport = { width: "device-width", initialScale: 1 };

const TERMIN_MAIL = process.env.NEXT_PUBLIC_TERMIN_MAIL || "info@nest-bildungsbar.de";

const CONFIG = `
window.NEST_ASSETS = "/";
window.NEST_STELLEN_API = "/api/stellen";
window.NEST_MAIL_API = "/api/kontakt";
window.NEST_BUCHUNG_API = "/api/buchung";
window.NEST_VERFUEGBARKEIT_API = "/api/verfuegbarkeit";
window.NEST_TERMIN_MAIL = "${TERMIN_MAIL}";
window.NEST_LINKS = {
  beruf: "/beruf",
  zukunft: "/berufswelt",
  kontakt: "/kontakt",
  kooperation: "/kooperation",
  termin: "/terminbuchung"
};`;

// Cache-Busting: ändert sich bei jedem Vercel-Deploy automatisch (Commit-SHA),
// damit Browser nie eine veraltete CSS-/JS-Version weiterverwenden.
const V = (process.env.VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 8);

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`/assets/styles.css?v=${V}`} />
        <link rel="stylesheet" href={`/assets/ablauf.css?v=${V}`} />
        <link rel="stylesheet" href={`/assets/termin.css?v=${V}`} />
        <Script id="nest-config" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: CONFIG }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script src={`/assets/nest-app.js?v=${V}`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
