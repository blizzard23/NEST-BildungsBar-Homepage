"use client";
import { useEffect, useRef, useState } from "react";

/* Bausteine des Partner-Logins, aufgebaut nach den zwei Kernpunkten
   „Azubis finden" und „Azubis halten" (Vorlagen auf Mobbin: Jobber, Whop und
   Square für die gruppierte Seitenleiste; Plane, Midday und Google AI Studio
   für Begrüßung mit Assistent ganz oben). */

const svg = (inhalt) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{inhalt}</svg>
);
export const ICON = {
  uebersicht: svg(<><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>),
  stellen: svg(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  nestplay: svg(<><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><circle cx="15" cy="12" r="1" /><circle cx="18" cy="10" r="1" /><rect x="2" y="6" width="20" height="12" rx="2" /></>),
  explore: svg(<><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>),
  workshops: svg(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  ansprechpartner: svg(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
  netzwerk: svg(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>),
  veranstaltungen: svg(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
  infos: svg(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>),
  konto: svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>),
  admin: svg(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>),
  abmelden: svg(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>),
  pfeil: svg(<polyline points="6 9 12 15 18 9" />),
  extern: svg(<><path d="M7 17L17 7" /><polyline points="7 7 17 7 17 17" /></>),
};

/* Seitenleiste: Überpunkte (Kernpunkte) mit ihren Unterpunkten. Der Abschnitt,
   in dem man gerade liest, ist markiert. Auf dem Handy wird daraus eine
   waagerechte Leiste. */
export function PortalNav({ isAdmin, firma, email, onLogout }) {
  const gruppen = [
    {
      titel: null, punkte: [
        { id: "abschnitt-dashboard", label: "Übersicht", icon: ICON.uebersicht },
        !isAdmin && { id: "abschnitt-netzwerk", label: "Netzwerk & Erfahrungen", icon: ICON.netzwerk },
      ].filter(Boolean),
    },
    {
      titel: "Azubis finden", art: "finden", punkte: [
        { id: "abschnitt-stellen", label: "Stellen", icon: ICON.stellen },
        !isAdmin && { id: "abschnitt-nestplay", label: "NESTplay", icon: ICON.nestplay },
        { id: "abschnitt-messe", label: "NEST Explore", icon: ICON.explore },
      ].filter(Boolean),
    },
    {
      titel: "Azubis halten", art: "halten", punkte: [
        { id: "abschnitt-workshops", label: "Workshops", icon: ICON.workshops },
        { id: "abschnitt-team", label: "Ansprechpartner", icon: ICON.ansprechpartner },
        { id: "abschnitt-veranstaltungen", label: "Veranstaltungen", icon: ICON.veranstaltungen },
      ],
    },
    {
      titel: "Mehr", punkte: [
        { id: "abschnitt-infos", label: "Alles auf einen Blick", icon: ICON.infos },
        { id: "abschnitt-konto", label: "Konto", icon: ICON.konto },
      ],
    },
    isAdmin && {
      titel: "Admin", punkte: [
        { id: "abschnitt-admin", label: "Admin-Bereich", icon: ICON.admin },
        { id: "abschnitt-admin-assistent", label: "Assistent & Netzwerk", icon: ICON.netzwerk },
        { id: "abschnitt-explore-buchungen", label: "Explore-Buchungen", icon: ICON.explore },
      ],
    },
  ].filter(Boolean);

  const ids = gruppen.flatMap((g) => g.punkte.map((p) => p.id));
  const [aktiv, setAktiv] = useState(ids[0]);

  useEffect(() => {
    let raf = 0;
    const pruefen = () => {
      raf = 0;
      // Auf schmalen Bildschirmen liegt die Navigation als Leiste unter dem Header.
      const grenze = window.innerWidth <= 980 ? 180 : 140;
      let treffer = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= grenze) treffer = id;
      }
      setAktiv(treffer);
    };
    const beimScrollen = () => { if (!raf) raf = requestAnimationFrame(pruefen); };
    pruefen();
    window.addEventListener("scroll", beimScrollen, { passive: true });
    return () => { window.removeEventListener("scroll", beimScrollen); if (raf) cancelAnimationFrame(raf); };
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  // Waagerechte Leiste (mobil): aktiven Punkt sichtbar halten.
  const sideRef = useRef(null);
  useEffect(() => {
    const side = sideRef.current;
    if (!side || side.scrollWidth <= side.clientWidth + 1) return;
    const link = side.querySelector(".pd-link.is-aktiv");
    if (!link) return;
    side.scrollTo({ left: Math.max(0, link.offsetLeft - (side.clientWidth - link.offsetWidth) / 2), behavior: "smooth" });
  }, [aktiv]);

  const initialen = String(firma || email || "?").replace(/[^A-Za-zÄÖÜäöü0-9 ]/g, " ").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "N";

  return (
    <aside ref={sideRef} className="pd-side" aria-label="Bereiche im Partner-Login">
      <div className="pd-firma">
        <span className="pd-firma-av" aria-hidden="true">{initialen}</span>
        <div>
          <b>{firma || "Euer Unternehmen"}</b>
          <small>{isAdmin ? "NEST-Admin" : email}</small>
        </div>
      </div>
      <nav className="pd-nav">
        {gruppen.map((g, i) => (
          <div key={i} className={"pd-gruppe" + (g.art ? " pd-gruppe--" + g.art : "")}>
            {g.titel ? <span className="pd-gruppe-titel">{g.titel}</span> : null}
            {g.punkte.map((p) => (
              <a key={p.id} href={"#" + p.id} className={"pd-link" + (aktiv === p.id ? " is-aktiv" : "")} aria-current={aktiv === p.id ? "true" : undefined}>
                {p.icon}<span>{p.label}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
      <button type="button" className="pd-abmelden" onClick={onLogout}>{ICON.abmelden}<span>Abmelden</span></button>
    </aside>
  );
}

/* Überpunkt eines Kernpunkts im Design der NESTplay- und NEST-Explore-Karten:
   dunkle Fläche, Gold-Akzent, Phone-Mockup mit den Unterpunkten. */
export function KernpunktBanner({ id, nr, art, titel, unter, text, punkte, phoneTitel, zeilen }) {
  return (
    <div id={id} className={"np-promo pd-banner pd-banner--" + art}>
      <div className="np-promo-text">
        <span className="np-promo-label">Kernpunkt {nr}</span>
        <div className="np-promo-h">{titel}<br /><em>{unter}</em></div>
        <p className="np-promo-p">{text}</p>
        <div className="pd-banner-punkte">
          {punkte.map((p) => <a key={p.href} href={p.href} className="pd-banner-punkt">{p.label}</a>)}
        </div>
      </div>
      <div className="np-promo-phone" aria-hidden="true">
        <div className="np-mini-phone">
          <div className="np-phone-screen">
            <div className="np-phone-head" style={{ padding: "22px 12px 12px" }}>
              <div className="np-phone-pl">Partner-Login · Kernpunkt {nr}</div>
              <div className="np-phone-h4">{phoneTitel}</div>
            </div>
            <div className="np-phone-body pd-phone-body">
              {zeilen.map((z, i) => (
                <div key={i} className={"pd-phone-zeile" + (i === zeilen.length - 1 ? " pd-phone-zeile--navy" : "")}>
                  <span>{z[0]}</span><b>{z[1]}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Kopf eines Unterpunkts: Symbol, Titel, kurzer Text und Aktionen rechts. */
export function UnterKopf({ icon, art, titel, text, children }) {
  return (
    <div className="pd-unter-kopf">
      <span className={"pd-unter-ic pd-unter-ic--" + art}>{icon}</span>
      <div className="pd-unter-text">
        <h3>{titel}</h3>
        {text ? <p>{text}</p> : null}
      </div>
      {children ? <div className="pd-unter-aktionen">{children}</div> : null}
    </div>
  );
}

const kontaktIcon = {
  ort: svg(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  mail: svg(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
  tel: svg(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />),
  web: svg(<><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
};

/* Ansprechpartner kompakt: Foto, Name, Rolle und Kontakt; die Beschreibung
   klappt erst auf Wunsch auf. */
function AnsprechpartnerKarte({ ap }) {
  const [offen, setOffen] = useState(false);
  const vorname = String(ap.name || "").split(" ")[0];
  const initialen = String(ap.name || "?").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div className="pd-ap">
      <div className="pd-ap-kopf">
        {ap.bild_url ? <img className="pd-ap-foto" src={ap.bild_url} alt={ap.name} loading="lazy" /> : <span className="pd-ap-foto pd-ap-foto--leer" aria-hidden="true">{initialen}</span>}
        <div>
          <b className="pd-ap-name">{ap.name}</b>
          {ap.rolle ? <span className="pd-ap-rolle">{ap.rolle}</span> : null}
        </div>
      </div>
      <div className="pd-ap-kontakt">
        {ap.standort ? <span>{kontaktIcon.ort}{ap.standort}</span> : null}
        {ap.email ? <a href={`mailto:${ap.email}`}>{kontaktIcon.mail}{ap.email}</a> : null}
        {ap.telefon ? <a href={`tel:${ap.telefon.replace(/\s/g, "")}`}>{kontaktIcon.tel}{ap.telefon}</a> : null}
        {ap.website ? <a href={ap.website} target="_blank" rel="noopener">{kontaktIcon.web}{ap.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a> : null}
      </div>
      {ap.beschreibung ? (
        <>
          <button type="button" className={"pd-ap-mehr" + (offen ? " is-offen" : "")} onClick={() => setOffen((v) => !v)} aria-expanded={offen}>
            {offen ? "Weniger anzeigen" : `Mehr über ${vorname}`}{ICON.pfeil}
          </button>
          {offen ? <p className="pd-ap-text">{ap.beschreibung}</p> : null}
        </>
      ) : null}
    </div>
  );
}
export function AnsprechpartnerListe({ liste }) {
  return <div className="pd-ap-grid">{liste.map((ap) => <AnsprechpartnerKarte key={ap.id || ap.email || ap.name} ap={ap} />)}</div>;
}

/* Alles auf einen Blick – nach den beiden Kernpunkten sortiert. */
const BLICK = [
  {
    art: "finden", titel: "Azubis finden", karten: [
      { titel: "NEST Explore", text: "Unser Schulformat: In sechs Runden lernt ihr Schulklassen persönlich kennen.", bild: "/assets/img/broschueren/nest-explore.jpg", link: "/broschueren/nest-explore.html", knopf: "Broschüre öffnen" },
      { titel: "NESTplay", text: "Euer Quiz im Unterricht der Partnerschulen – mit Anleitung für ein gutes Quiz.", bild: "/assets/img/broschueren/nestplay.jpg", link: "/broschueren/nestplay.html", knopf: "Anleitung öffnen" },
      { titel: "NEST Berufswelt", text: "Über 150 Ausbildungsberufe – hier erscheinen eure Stellen für junge Menschen.", bild: "/assets/img/berufswelt-screenshot.png", link: "/berufswelt", knopf: "Zur Berufswelt" },
    ],
  },
  {
    art: "halten", titel: "Azubis halten", karten: [
      { titel: "NEST AzubiConnect", text: "Workshops für Azubis und Ausbildende, z. B. Azubi-Knigge oder Generationen.", bild: "/assets/img/angebote/azubiconnect.jpg", link: "https://nest-azubiconnect.de/workshops.html", knopf: "Workshops ansehen" },
      { titel: "Veranstaltungen", text: "Ausbildungsdialog und Netzwerktreffen mit über 70 Ausbildungsbetrieben.", bild: "/assets/img/standort-wuppertal.jpg", link: "/veranstaltungen", knopf: "Termine ansehen" },
      { titel: "Eure Partnerschaft", text: "Alle Leistungen der Partnerschaft und wie wir zusammenarbeiten.", bild: "/assets/img/broschueren/kooperation.jpg", link: "/broschueren/kooperation.html", knopf: "Broschüre öffnen" },
    ],
  },
];
export function AllesAufEinenBlick() {
  return (
    <div className="pd-blick">
      {BLICK.map((g) => (
        <div key={g.art} className="pd-blick-gruppe">
          <span className={"pd-pill pd-pill--" + g.art}>{g.titel}</span>
          <div className="pd-blick-grid">
            {g.karten.map((k) => (
              <a key={k.titel} className="pd-blick-karte" href={k.link} target="_blank" rel="noopener">
                <span className="pd-blick-bild"><img src={k.bild} alt="" loading="lazy" /></span>
                <span className="pd-blick-body">
                  <b>{k.titel}</b>
                  <span>{k.text}</span>
                  <em>{k.knopf}{ICON.extern}</em>
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
