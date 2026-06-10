import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NEST BildungsBar – Kostenlose Berufsorientierung",
  description:
    "Kostenlose, lockere Berufsorientierung auf Augenhöhe. Über 200 Ausbildungsberufe, Beratung in Wuppertal & Essen. Teil des NEST Ökosystems.",
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
        <link rel="stylesheet" href="/assets/styles.css" />
        <link rel="stylesheet" href="/assets/ablauf.css" />
        <link rel="stylesheet" href="/assets/termin.css" />
        <Script id="nest-config" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: CONFIG }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script src="/assets/nest-app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
