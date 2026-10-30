"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseConfigured, istRecoveryLink, linkFehler } from "@/lib/supabaseClient";
import { fetchGamesForCompany, fetchNestplayCompanies, gameEditUrl, nestplayConfigured, NESTPLAY_URL } from "@/lib/nestplayClient";
import { mapMesseTermin } from "@/lib/messeTermine";
import { inhaltZuHtml } from "@/lib/blogFormat";
import Assistent from "./Assistent";
import Netzwerk from "./Netzwerk";
import Erfahrungen from "./Erfahrungen";
import AdminAssistent from "./AdminAssistent";
import { PortalNav, KernpunktBanner, UnterKopf, AnsprechpartnerListe, AllesAufEinenBlick, ICON } from "./PortalBausteine";

const ADMIN_EMAIL = "info@nest-bildungsbar.de";
const LEER = { firma: "", beruf: "", art: "Ausbildung", ort: "Wuppertal", start: "", url: "", logo_url: "", keyword1: "", keyword2: "", keyword3: "" };
const EVENT_LEER = { titel: "", datum: "", uhrzeit: "", ort: "Wuppertal", adresse: "", bild_url: "", beschreibung: "" };
const POST_LEER = { slug: "", titel: "", excerpt: "", inhalt: "", bild_url: "", published: true };
const AP_LEER = { name: "", rolle: "", email: "", telefon: "", website: "", standort: "", bild_url: "", beschreibung: "", sortierung: 0 };

// Standard-Ansprechpartner – werden gezeigt, solange in der Tabelle `ansprechpartner`
// noch nichts gepflegt ist (Admin kann sie im Portal überschreiben/ergänzen).
// Bilder für die Partner:innen (Jana, Esther) werden nachgeliefert.
const AP_DEFAULT = [
  // Team der BildungsBar
  { id: "d1", name: "Mike Stoeck", rolle: "Gründer & Geschäftsführer", standort: "Wuppertal", bild_url: "/assets/img/team/mike.jpg", sortierung: 1, beschreibung: "Mitgründer der BildungsBar. Mike startete selbst als Azubi zum Mechatroniker, engagierte sich früh als Jugendvertreter in Betriebsrat und Gewerkschaft und bringt seine Erfahrung heute praxisnah und auf Augenhöhe in Workshops und Coachings ein." },
  { id: "d2", name: "Patrick Nekola-Ossé", rolle: "Gründer & Geschäftsführer", standort: "Wuppertal", bild_url: "/assets/img/team/patrick.jpg", sortierung: 2, beschreibung: "Mitgründer der BildungsBar. Patrick lernte Elektriker, qualifizierte sich zum Elektrotechniker weiter und gestaltete im Personalmanagement das Generationsmanagement aktiv mit. Sein Fokus: gute Ausbildung und echte Begegnung." },
  { id: "d3", name: "Sevda Askin", rolle: "Sales- & Marketing Managerin", standort: "Essen", bild_url: "/assets/img/team/sevda.jpg", sortierung: 3, beschreibung: "Sevda verantwortet Sales & Marketing und ist eure Ansprechpartnerin für den Standort Essen. Mit Leidenschaft für Netzwerke, Kommunikation und neue Ideen begleitet sie Partnerunternehmen von der ersten Idee bis zur Zusammenarbeit." },
  // Partner:innen im NEST-Netzwerk
  { id: "d4", name: "Jana Kortwig", rolle: "Soulspace Wuppertal", standort: "Wuppertal", bild_url: "", sortierung: 4, beschreibung: "Jana Kortwig ist Gründerin von Soulspace, Wuppertals erstem Jugendzentrum für mentale Gesundheit. Als pädagogisch-therapeutische Beraterin schafft sie einen offenen Ort, an dem Jugendliche kostenlos und ohne Termin über ihre Sorgen sprechen können." },
  { id: "d5", name: "Esther Königes", rolle: "Workstadt", standort: "Wuppertal", bild_url: "", sortierung: 5, beschreibung: "Esther Königes ist Mitgründerin und Geschäftsführerin der WorkStadt GmbH in Wuppertal. Mit WorkStadt unterstützt sie Unternehmen beim Onboarding internationaler Fachkräfte – vom Ankommen in der Stadt bis zur nachhaltigen Integration ins Team." },
  { id: "d6", name: "Marc Longjaloux", rolle: "Designbüro Longjaloux", standort: "Wuppertal", bild_url: "/assets/img/team/marc.jpg", sortierung: 6, beschreibung: "Büro Longjaloux macht Corporate Design für kleine und mittelständische Unternehmen – seit 1980. Wir finden den Kern von Marken und machen ihn sichtbar. Für alle, die wissen, was sie tun, aber noch nicht, wie sie das erfolgreich kommunizieren sollen: Mit Strategie-Workshops, Corporate Design und gezielter Markenführung schaffen wir Auftritte, die nicht nur gut aussehen, sondern wirken. Geiler Scheiß für geile Leute." },
  { id: "d7", name: "Roman Scholz", rolle: "Foto- & Videograf | Drohnenpilot", standort: "Wuppertal", email: "rmn.fpv@gmail.com", telefon: "+49 160 94729483", website: "https://www.rmnfpv.com/", bild_url: "/assets/img/team/roman.jpg", sortierung: 7, beschreibung: "Roman Scholz ist Foto- und Videograf und Drohnenpilot. Er produziert Imagefilme, Drohnenaufnahmen, Event-Reportagen und vieles mehr – von der Idee über den Dreh bis zum fertigen Schnitt." },
];

const IST_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Supabase antwortet auf Englisch. Die Meldungen, die Unternehmen im Portal
   tatsächlich zu sehen bekommen, hier auf Deutsch übersetzen. */
const AUTH_TEXTE = [
  [/invalid login credentials/i, "E-Mail-Adresse oder Passwort stimmt nicht."],
  [/email not confirmed/i, "Diese E-Mail-Adresse ist noch nicht bestätigt. Klick den Link aus der Registrierungs-Mail (auch im Spam-Ordner nachsehen) – oder fordere über „Passwort vergessen\" einen neuen Link an."],
  [/(email|token) link is invalid or has expired|token has expired or is invalid/i, "Der Link ist nicht mehr gültig – er gilt nur kurze Zeit und nur ein einziges Mal."],
  [/user (already registered|with this email address has already)/i, "Zu dieser E-Mail-Adresse gibt es schon einen Zugang. Melde dich damit an oder setze das Passwort zurück."],
  [/password should be at least (\d+)/i, "Das Passwort ist zu kurz."],
  [/new password should be different/i, "Das neue Passwort muss sich vom bisherigen unterscheiden."],
  [/for security purposes.*after (\d+) seconds/i, "Kurz durchatmen – das geht erst in einer Minute wieder."],
  [/email rate limit exceeded|over_email_send_rate_limit/i, "Es wurden gerade zu viele E-Mails angefordert. Bitte versuch es in ein paar Minuten noch einmal."],
  [/failed to fetch|network ?error|load failed/i, "Keine Verbindung zum Server. Bitte prüfe deine Internetverbindung."],
];

/* Lesbare Fehlermeldung aus einem Supabase-/Fetch-Fehler.
   Antwortet Supabase Auth mit einem Serverfehler ohne Text, ist `message` leer
   oder ein leeres Objekt – im Portal stand dann nur "Fehler: {}". Hier kommt in
   dem Fall ein Satz heraus, mit dem Unternehmen etwas anfangen können. */
function fehlerText(e, ersatz = "Das hat gerade nicht geklappt. Bitte versuche es später noch einmal.") {
  const roh = (typeof e === "string" ? e : e && (e.message || e.error_description || e.error)) || "";
  const text = String(roh).trim();
  if (!text || text === "{}" || text === "[object Object]") return ersatz;
  for (const [muster, deutsch] of AUTH_TEXTE) if (muster.test(text)) return deutsch;
  return text;
}

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// "2026-10-01" -> "Do, 1. Okt. 2026" (kurz, damit die Zeile in der Karte
// einzeilig bleibt und alle Karten gleich hoch sind)
const VA_MONATE = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."];
const VA_WOCHENTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function kartenDatum(iso) {
  const [j, m, t] = String(iso || "").split("-").map(Number);
  if (!j || !m || !t) return iso || "";
  const d = new Date(j, m - 1, t);
  return `${VA_WOCHENTAGE[d.getDay()]}, ${t}. ${VA_MONATE[m - 1]} ${j}`;
}
// Teaser für die Übersicht: an der Wortgrenze gekürzt, damit alle Karten
// gleich viel Text zeigen. Der volle Text steht auf der Veranstaltungsseite.
const TEASER_MAX = 145;
function teaser(text) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= TEASER_MAX) return t;
  const kurz = t.slice(0, TEASER_MAX);
  const schnitt = kurz.lastIndexOf(" ");
  return (schnitt > 60 ? kurz.slice(0, schnitt) : kurz).replace(/[",;:.\-–]+$/, "") + " …";
}

// Auslastung: Kapazität pro Tag + nächste Di/Do-Termine
const KAPAZITAET = { Wuppertal: 4, Essen: 2, Solingen: 2, Remscheid: 2 };
// Beratungstage je Standort (0 = So … 6 = Sa)
const STANDORT_ORTE = ["Wuppertal", "Solingen", "Remscheid", "Essen"];
const TERMIN_TAGE = { Wuppertal: [2, 4], Essen: [2, 4], Solingen: [1], Remscheid: [3] };
// Beratungstage, die ab einem Stichtag wechseln (Essen ab Okt. 2026 auf Montag).
// Muss zu STANDORTE.tageAb in public/assets/nest-app.js passen.
const TERMIN_TAGE_AB = { Essen: [{ ab: "2026-10-01", tage: [1] }] };
const WTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function termintageAm(ort, iso) {
  let tage = TERMIN_TAGE[ort] || [2, 4];
  for (const w of TERMIN_TAGE_AB[ort] || []) if (iso >= w.ab) tage = w.tage;
  return tage;
}
function naechsteTermine(n, ort) {
  const out = [];
  const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
  let guard = 0;
  while (out.length < n && guard < 200) {
    if (termintageAm(ort, isoDatum(d)).includes(d.getDay())) out.push(new Date(d));
    d.setDate(d.getDate() + 1); guard++;
  }
  return out;
}
function isoDatum(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function kurzDatum(d) { return WTAGE[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "."; }

/* Aufklappbare Kopfzeile für die beiden langen Buchungslisten im Admin-Bereich
   (Terminbuchungen der Gäste, NEST-Explore-Termine). Titel, Kurzinfo und
   Kennzahl bleiben sichtbar, die Einträge erscheinen erst auf Klick. */
function Aufklapper({ titel, unter, meta, metaFarbe, badge, standardOffen = false, children }) {
  const [auf, setAuf] = useState(standardOffen);
  return (
    <div className={"pp-acc" + (auf ? " pp-acc--offen" : "")}>
      <button type="button" className="pp-acc-head" onClick={() => setAuf((v) => !v)} aria-expanded={auf}>
        <span className="pp-acc-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
        <span className="pp-acc-title">
          <strong>{titel}{badge}</strong>
          {unter ? <span>{unter}</span> : null}
        </span>
        {meta ? <span className="pp-acc-meta" style={metaFarbe ? { color: metaFarbe } : undefined}>{meta}</span> : null}
      </button>
      {auf ? <div className="pp-acc-body">{children}</div> : null}
    </div>
  );
}

// Status einer NEST-Explore-Buchung (Spalte `status` in messe_buchungen)
const MESSE_STATUS = {
  neu: { text: "offen", cls: "ampel-gelb" },
  bestaetigt: { text: "bestätigt", cls: "ampel-gruen" },
  abgelehnt: { text: "abgelehnt", cls: "ampel-rot" },
};

// Stellen sind 30 Tage online – Resttage + Ampelstatus für das Dashboard
const STELLEN_TAGE = 30;
function tageRestStelle(aktiviertAm) {
  if (!aktiviertAm) return null;
  const start = new Date(aktiviertAm + "T00:00:00");
  if (isNaN(start)) return null;
  const heute = new Date(); heute.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(start.getTime() + STELLEN_TAGE * 86400000) - heute) / 86400000);
}
function ampelStatus(rest) {
  if (rest == null || rest < 0) return { cls: "ampel-rot", text: "abgelaufen" };
  if (rest <= 3) return { cls: "ampel-rot", text: "läuft bald ab" };
  if (rest <= 10) return { cls: "ampel-gelb", text: "endet in Kürze" };
  return { cls: "ampel-gruen", text: "online" };
}

export default function PartnerPortal() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authErr, setAuthErr] = useState("");
  // Selbst-Registrierung von Unternehmen
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [regBusy, setRegBusy] = useState(false);
  const [regMsg, setRegMsg] = useState("");
  const [companies, setCompanies] = useState([]);     // NESTplay-Unternehmen (für die Auswahl)
  const [firmaQuery, setFirmaQuery] = useState("");     // Eingabe/Anzeige im Firmen-Suchfeld
  const [firmaRef, setFirmaRef] = useState(null);       // gewählte NESTplay-Referenz (UUID/Name)
  const [firmaOpen, setFirmaOpen] = useState(false);    // Dropdown offen?
  const [stellen, setStellen] = useState([]);
  const [events, setEvents] = useState([]);
  const [messeTermine, setMesseTermine] = useState([]); // kommende NEST-Explore-Termine (live aus Supabase)
  const [nestplaySpiele, setNestplaySpiele] = useState(0);
  const [nestplayGames, setNestplayGames] = useState([]);
  const [form, setForm] = useState(LEER);
  const [msg, setMsg] = useState("");

  // Admin
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminPosts, setAdminPosts] = useState([]);
  const [buchungen, setBuchungen] = useState([]);
  const [anmeldungen, setAnmeldungen] = useState([]); // Unternehmens-Anmeldungen zu Veranstaltungen
  const [adminMesseTermine, setAdminMesseTermine] = useState([]); // alle NEST-Explore-Termine
  const [messeBuchungen, setMesseBuchungen] = useState([]);       // Unternehmen, die einen Explore-Termin gebucht haben
  const [evForm, setEvForm] = useState(EVENT_LEER);
  const [evMsg, setEvMsg] = useState("");
  const [evUploading, setEvUploading] = useState(false);
  const [poForm, setPoForm] = useState(POST_LEER);
  const [poMsg, setPoMsg] = useState("");
  const [poVorschau, setPoVorschau] = useState(false);   // Blog: Vorschau statt Editor anzeigen
  const [uploading, setUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);   // Logo-Upload bei der Stelle
  const [toastMsg, setToastMsg] = useState("");                 // kurze Erfolg-/Hinweis-Meldung
  const [resetMsg, setResetMsg] = useState("");                 // Passwort-Reset-Feedback
  const [resetBusy, setResetBusy] = useState(false);            // Reset-Mail wird gerade verschickt
  const [recovery, setRecovery] = useState(false);              // über den Passwort-Link gekommen -> neues Passwort setzen
  const [firmaMsg, setFirmaMsg] = useState("");                 // Konto: Unternehmensname-Feedback
  const [pwNeu, setPwNeu] = useState("");                       // neues Passwort (Konto)
  const [pwMsg, setPwMsg] = useState("");
  // Ansprechpartner (öffentlich lesbar, vom Admin pflegbar)
  const [ansprechpartner, setAnsprechpartner] = useState([]);
  const [apForm, setApForm] = useState(AP_LEER);
  const [apMsg, setApMsg] = useState("");
  const [apUploading, setApUploading] = useState(false);
  // NEST-Assistent
  const [netzwerkStand, setNetzwerkStand] = useState(0); // erhöht sich nach einer neuen Frage -> Liste neu laden
  const [stelleFormOffen, setStelleFormOffen] = useState(false); // Formular „Neue Stelle" aufgeklappt?
  const [alleTermine, setAlleTermine] = useState(false);         // alle Explore-Termine statt der nächsten vier

  // Berufsliste für das Stellen-Dropdown – aus der Berufswelt-Datenbank
  // (window.BERUFE_KATEGORIEN, kommt über das global eingebundene nest-app.js).
  const [berufsKategorien, setBerufsKategorien] = useState([]);
  const [berufFrei, setBerufFrei] = useState(false); // "Anderer Beruf": Freitext statt Dropdown
  useEffect(() => {
    let versuche = 0;
    const t = setInterval(() => {
      const kats = typeof window !== "undefined" ? window.BERUFE_KATEGORIEN : null;
      if (Array.isArray(kats) && kats.length) {
        setBerufsKategorien(kats.map((k) => ({
          name: k.name,
          berufe: (k.berufe || []).map((b) => (typeof b === "string" ? b : b.name)),
        })));
        clearInterval(t);
      } else if (++versuche > 40) clearInterval(t); // Bundle nicht geladen -> Freitext-Fallback
    }, 250);
    return () => clearInterval(t);
  }, []);
  // Steht der Beruf der (bearbeiteten) Stelle nicht im Katalog, bleibt es Freitext.
  const berufImKatalog = berufsKategorien.some((k) => k.berufe.includes(form.beruf));
  const zeigeBerufFrei = berufFrei || (!!form.beruf && !berufImKatalog);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  const firmaName = ((session?.user?.user_metadata?.firma || "").trim()) || form.firma || (stellen[0] && stellen[0].firma) || "";

  // Kurze Toast-Meldung (verschwindet nach ein paar Sekunden von selbst)
  const toast = useCallback((text) => setToastMsg(text), []);
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(""), 3200);
    return () => clearTimeout(t);
  }, [toastMsg]);
  // Sicherheitsabfrage vor dem Löschen
  const bestaetigeLoeschen = (was) => window.confirm(`„${was}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    // Kam die Seite über den Passwort-Link, wird statt des Dashboards die Maske
    // "neues Passwort" gezeigt. Erst hier (nicht im useState-Startwert), damit
    // Server- und Client-Rendering identisch bleiben.
    if (istRecoveryLink) setRecovery(true);
    if (linkFehler) setResetMsg("Fehler: " + fehlerText(linkFehler) + " Fordere unten einfach einen neuen an.");
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((e, s) => {
      setSession(s);
      if (e === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Konto: Firmen-Combobox mit dem gespeicherten Namen/Ref vorbelegen
  useEffect(() => {
    if (session) {
      const m = session.user.user_metadata || {};
      setFirmaQuery(m.firma || "");
      setFirmaRef(m.nestplay_ref || null);
    }
  }, [session]);

  const ladeDaten = useCallback(async () => {
    if (!supabase || !session) return;
    const { data: st } = await supabase
      .from("stellen").select("*")
      .eq("partner_id", session.user.id)
      .order("aktiviert_am", { ascending: false });
    setStellen(st || []);
    const meta = session.user.user_metadata || {};
    const firma = meta.firma || (st && st.length && st[0].firma) || "";
    if (firma && !form.firma) setForm((f) => ({ ...f, firma }));
    // NESTplay-Zuordnung: bevorzugt die stabile Referenz aus der Registrierung (UUID),
    // sonst der Firmenname.
    const nestplayRef = meta.nestplay_ref || firma;

    const heute = new Date().toISOString().slice(0, 10);
    const { data: ev } = await supabase
      .from("veranstaltungen").select("*")
      .gte("datum", heute).order("datum", { ascending: true });
    setEvents(ev || []);

    // Echte Anbindung an die NEST-Messe: kommende Messe-Termine direkt aus der
    // zentral gepflegten Tabelle `messe_termine` (öffentliche Read-Policy).
    const { data: mt } = await supabase
      .from("messe_termine").select("*")
      .gte("datum", heute).order("datum", { ascending: true });
    setMesseTermine((mt || []).map(mapMesseTermin));

    // Ansprechpartner (öffentlich lesbar) – Admin pflegt sie im Admin-Bereich.
    const { data: ap } = await supabase
      .from("ansprechpartner").select("*")
      .order("sortierung", { ascending: true }).order("created_at", { ascending: true });
    setAnsprechpartner(ap || []);

    // NESTplay-Anbindung: Live-Spiele des eigenen Unternehmens
    const spiele = await fetchGamesForCompany(nestplayRef);
    setNestplayGames(spiele);
    setNestplaySpiele(spiele.length);
  }, [session]); // eslint-disable-line

  const ladeAdmin = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    const { data: ev } = await supabase.from("veranstaltungen").select("*").order("datum", { ascending: true });
    setAdminEvents(ev || []);
    const { data: po } = await supabase.from("posts").select("*").order("veroeffentlicht_am", { ascending: false });
    setAdminPosts(po || []);
    const { data: bu } = await supabase.from("buchungen").select("*").order("created_at", { ascending: false });
    setBuchungen(bu || []);
    const { data: an } = await supabase.from("veranstaltung_anmeldungen").select("*").order("created_at", { ascending: false });
    setAnmeldungen(an || []);
    // NEST Explore: Termine (zentral auf nest-explore.de gepflegt) + die Unternehmen,
    // die sich zu einem Termin angemeldet haben – hier nur lesend als Übersicht.
    const { data: mt } = await supabase.from("messe_termine").select("*").order("datum", { ascending: true });
    setAdminMesseTermine((mt || []).map(mapMesseTermin));
    const { data: mb } = await supabase.from("messe_buchungen").select("*").order("created_at", { ascending: false });
    setMesseBuchungen(mb || []);
  }, [isAdmin]); // eslint-disable-line

  useEffect(() => { if (session) ladeDaten(); }, [session, ladeDaten]);
  useEffect(() => { if (isAdmin) ladeAdmin(); }, [isAdmin, ladeAdmin]);

  // NESTplay-Unternehmen für die Auswahl laden (Registrierung + Konto-Bereich)
  useEffect(() => {
    const gebraucht = authMode === "register" || !!session;
    if (gebraucht && nestplayConfigured && !companies.length) {
      fetchNestplayCompanies().then(setCompanies).catch(() => {});
    }
  }, [authMode, session, companies.length]);

  async function login(e) {
    e.preventDefault(); setAuthErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setAuthErr("Login fehlgeschlagen: " + fehlerText(error, "Bitte prüfe E-Mail und Passwort."));
  }

  function waehleFirma(c) {
    setFirmaRef(c.ref); setFirmaQuery(c.name); setFirmaOpen(false);
  }
  function setFirmaFreitext(v) {
    setFirmaQuery(v); setFirmaRef(null); setFirmaOpen(true); // Freitext -> Mapping später über den Namen
  }

  /* Registrierung: läuft über die eigene Route /api/registrierung.
     Der direkte Weg über supabase.auth.signUp() hängt am SMTP-Server, der im
     Supabase-Dashboard hinterlegt ist. Lehnt der die Anmeldung ab, bricht der
     ganze Signup ab (HTTP 500), der Zugang wird zurückgerollt und es geht keine
     Bestätigungsmail raus – Unternehmen können sich danach also weder bestätigen
     noch anmelden. Die eigene Route legt den Zugang über die Admin-API an und
     verschickt die Mail über denselben Weg wie die übrigen Formulare. */
  async function registrieren(e) {
    e.preventDefault(); setAuthErr(""); setRegMsg("");
    const firmaName = firmaQuery.trim();
    if (!firmaName) { setAuthErr("Bitte wähle oder nenne dein Unternehmen."); return; }
    if (!IST_EMAIL.test(email.trim())) { setAuthErr("Bitte eine gültige E-Mail-Adresse angeben."); return; }
    if (pass.length < 8) { setAuthErr("Das Passwort muss mindestens 8 Zeichen haben."); return; }
    setRegBusy(true);
    try {
      const antwort = await fetch("/api/registrierung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pass, firma: firmaName, nestplayRef: firmaRef || firmaName }),
      });
      const daten = await antwort.json().catch(() => ({}));
      if (!antwort.ok || !daten.ok) throw new Error(daten.error || "");
      // Bewusst neutral formuliert: gibt es die Adresse schon, kommt statt der
      // Bestätigung eine Mail mit Link zum Passwortsetzen – das Formular
      // verrät aber nicht, welcher der beiden Fälle zutrifft.
      setRegMsg("Fast geschafft! Wir haben dir eine E-Mail an " + email.trim() + " geschickt. Bitte bestätige darüber deine Adresse und melde dich anschließend an. Schau bitte auch im Spam-Ordner nach.");
      setAuthMode("login");
    } catch (err) {
      setAuthErr("Registrierung fehlgeschlagen: " + fehlerText(err));
    } finally {
      setRegBusy(false);
    }
  }
  async function logout() { await supabase.auth.signOut(); setStellen([]); setEvents([]); setAdminEvents([]); setAdminPosts([]); setBuchungen([]); setAnmeldungen([]); setAdminMesseTermine([]); setMesseBuchungen([]); setNestplayGames([]); setNestplaySpiele(0); setNetzStellen(0); setNetzSpiele(0); }

  // ---- Konto: Unternehmensname & Passwort ändern ----
  async function firmaSpeichern(e) {
    e.preventDefault(); setFirmaMsg(""); setFirmaOpen(false);
    const name = firmaQuery.trim();
    if (!name) { setFirmaMsg("Bitte ein Unternehmen wählen oder eingeben."); return; }
    const meta = session.user.user_metadata || {};
    const { error } = await supabase.auth.updateUser({ data: { ...meta, firma: name, nestplay_ref: firmaRef || name } });
    if (error) { setFirmaMsg("Fehler: " + fehlerText(error)); return; }
    // Eigene Stellen auf den neuen Namen aktualisieren
    if (!isAdmin) await supabase.from("stellen").update({ firma: name }).eq("partner_id", session.user.id);
    setForm((f) => ({ ...f, firma: name }));
    toast("Unternehmensname aktualisiert ✅");
    ladeDaten();
  }
  async function passwortAendern(e) {
    e.preventDefault(); setPwMsg("");
    if (pwNeu.length < 8) { setPwMsg("Das Passwort muss mindestens 8 Zeichen haben."); return; }
    const { error } = await supabase.auth.updateUser({ password: pwNeu });
    if (error) { setPwMsg("Fehler: " + fehlerText(error)); return; }
    setPwNeu(""); setPwMsg(""); toast("Passwort geändert ✅");
  }

  async function buchungLoeschen(id, name) { if (!bestaetigeLoeschen("Buchung von " + (name || "Gast"))) return; await supabase.from("buchungen").delete().eq("id", id); toast("Buchung gelöscht"); ladeAdmin(); }

  // NEST-Explore-Buchung löschen. Der Termin führt in `belegt` mit, wie viele
  // Plätze vergeben sind (daraus baut nest-explore.de die Ausgebucht-Anzeige) –
  // beim Löschen wird der Platz deshalb wieder freigegeben. Abgelehnte
  // Buchungen belegen keinen Platz, dort bleibt der Zähler unverändert.
  async function messeBuchungLoeschen(b, m) {
    if (!bestaetigeLoeschen("Buchung von " + (b.unternehmen || "Unternehmen"))) return;
    const { error } = await supabase.from("messe_buchungen").delete().eq("id", b.id);
    if (error) { toast("Fehler: " + error.message); return; }
    const platzFrei = m && b.status !== "abgelehnt" && m.belegt > 0;
    if (platzFrei) await supabase.from("messe_termine").update({ belegt: m.belegt - 1 }).eq("id", m.id);
    toast("Explore-Buchung gelöscht" + (platzFrei ? " · Platz wieder frei" : ""));
    ladeAdmin();
  }

  async function speichern(e) {
    e.preventDefault(); setMsg("");
    // Nur echte Spalten an die DB schicken (keyword1..3 -> keywords-Array)
    const keywords = [form.keyword1, form.keyword2, form.keyword3].map((k) => (k || "").trim()).filter(Boolean);
    const werte = { firma: form.firma, beruf: form.beruf, art: form.art, ort: form.ort, start: form.start, url: form.url, logo_url: form.logo_url, keywords };
    if (form.id) {
      const { error } = await supabase.from("stellen").update(werte).eq("id", form.id);
      if (error) { setMsg("Fehler: " + error.message); return; }
      setForm((f) => ({ ...LEER, firma: f.firma })); setBerufFrei(false); setStelleFormOffen(false);
      toast("Stelle aktualisiert ✅");
      ladeDaten();
      return;
    }
    const eintrag = { ...werte, partner_id: session.user.id, aktiviert_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("stellen").insert(eintrag);
    if (error) { setMsg("Fehler: " + error.message); return; }
    setForm((f) => ({ ...LEER, firma: f.firma })); setBerufFrei(false); setStelleFormOffen(false);
    toast("Stelle veröffentlicht ✅ (30 Tage sichtbar)");
    ladeDaten();
  }
  function stelleBearbeiten(s) {
    const kw = Array.isArray(s.keywords) ? s.keywords : [];
    setForm({ id: s.id, firma: s.firma || "", beruf: s.beruf || "", art: s.art || "Ausbildung", ort: s.ort || "Wuppertal", start: s.start || "", url: s.url || "", logo_url: s.logo_url || "", keyword1: kw[0] || "", keyword2: kw[1] || "", keyword3: kw[2] || "" });
    setBerufFrei(false); // steht der Beruf nicht im Katalog, zeigt die Ableitung automatisch Freitext
    setMsg("");
    setStelleFormOffen(true);
    if (typeof document !== "undefined") setTimeout(() => { const el = document.getElementById("abschnitt-stellen-form"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
  }
  async function verlaengern(id) {
    const { error } = await supabase.from("stellen").update({ aktiviert_am: new Date().toISOString().slice(0, 10) }).eq("id", id);
    if (error) { toast("Fehler: " + error.message); return; }
    toast("Stelle um 30 Tage verlängert ✅");
    ladeDaten();
  }
  async function loeschen(id, name) { if (!bestaetigeLoeschen(name || "Stelle")) return; await supabase.from("stellen").delete().eq("id", id); if (form.id === id) setForm((f) => ({ ...LEER, firma: f.firma })); toast("Stelle gelöscht"); ladeDaten(); }

  /* Passwort vergessen: läuft über die eigene Route /api/passwort-reset.
     Der direkte Weg über supabase.auth.resetPasswordForEmail() hängt am SMTP-
     Server, der im Supabase-Dashboard hinterlegt ist – lehnt der die Anmeldung
     ab, kommt von Supabase nur ein leerer 500er zurück ("Fehler: {}") und es
     geht keine Mail raus. Die eigene Route nutzt denselben Mailversand wie die
     übrigen Formulare und ist davon unabhängig. */
  async function passwortReset() {
    setResetMsg(""); setAuthErr("");
    const adresse = email.trim();
    if (!IST_EMAIL.test(adresse)) { setResetMsg("Bitte trage oben zuerst deine E-Mail-Adresse ein."); return; }
    setResetBusy(true);
    try {
      const antwort = await fetch("/api/passwort-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adresse }),
      });
      const daten = await antwort.json().catch(() => ({}));
      if (!antwort.ok || !daten.ok) throw new Error(daten.error || "");
      // Bewusst neutral formuliert: das Formular verrät nicht, ob es zu der
      // Adresse einen Zugang gibt.
      setResetMsg("Wenn es zu " + adresse + " einen Zugang gibt, ist der Link zum Zurücksetzen jetzt unterwegs. Schau bitte auch im Spam-Ordner nach.");
    } catch (e) {
      setResetMsg("Fehler: " + fehlerText(e) + " Melde dich gern direkt bei info@nest-bildungsbar.de.");
    } finally {
      setResetBusy(false);
    }
  }

  // Neues Passwort nach dem Klick auf den Link aus der Reset-Mail setzen.
  async function passwortNeuSetzen(e) {
    e.preventDefault(); setPwMsg("");
    if (pwNeu.length < 8) { setPwMsg("Das Passwort muss mindestens 8 Zeichen haben."); return; }
    const { error } = await supabase.auth.updateUser({ password: pwNeu });
    if (error) { setPwMsg("Fehler: " + fehlerText(error)); return; }
    setPwNeu(""); setPwMsg(""); setRecovery(false);
    toast("Neues Passwort gespeichert ✅ Du bist jetzt angemeldet.");
  }

  // Optionales Firmen-Logo zur Stelle hochladen (Bucket "logos").
  async function logoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setLogoUploading(true); setMsg("");
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const pfad = `stellen/${session.user.id}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("logos").upload(pfad, file, { cacheControl: "3600", upsert: true });
    if (error) { setMsg("Logo-Upload-Fehler: " + error.message); setLogoUploading(false); return; }
    const { data } = supabase.storage.from("logos").getPublicUrl(pfad);
    setForm((f) => ({ ...f, logo_url: data.publicUrl }));
    setLogoUploading(false);
  }

  // ---- Admin: Ansprechpartner (anlegen / bearbeiten / löschen, mit Bild) ----
  const apSet = (k) => (e) => setApForm((f) => ({ ...f, [k]: e.target.value }));
  async function apBildUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setApUploading(true); setApMsg("");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const pfad = `ansprechpartner/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("logos").upload(pfad, file, { cacheControl: "3600", upsert: false });
    if (error) { setApMsg("Upload-Fehler: " + error.message); setApUploading(false); return; }
    const { data } = supabase.storage.from("logos").getPublicUrl(pfad);
    setApForm((f) => ({ ...f, bild_url: data.publicUrl }));
    setApUploading(false);
  }
  async function apSpeichern(e) {
    e.preventDefault(); setApMsg("");
    if (!apForm.name) { setApMsg("Name ist Pflicht."); return; }
    const { id, created_at, ...werte } = apForm;
    werte.sortierung = parseInt(werte.sortierung, 10) || 0;
    const schreiben = (w) => (id
      ? supabase.from("ansprechpartner").update(w).eq("id", id)
      : supabase.from("ansprechpartner").insert(w));
    let { error } = await schreiben(werte);
    // Fallback, solange die Website-Spalte noch nicht angelegt ist (supabase/portal-fixes.sql)
    if (error && /website/i.test(error.message)) {
      const { website, ...ohneWebsite } = werte;
      ({ error } = await schreiben(ohneWebsite));
      if (!error) toast("Gespeichert – Hinweis: Für das Feld „Website“ bitte supabase/portal-fixes.sql ausführen.");
    } else if (!error) {
      toast("Ansprechpartner gespeichert ✅");
    }
    if (error) { setApMsg("Fehler: " + error.message); return; }
    setApForm(AP_LEER);
    setApMsg("");
    ladeDaten();
  }
  function apBearbeiten(ap) {
    setApForm({ ...AP_LEER, ...ap });
    setApMsg("");
    if (typeof document !== "undefined") { const el = document.getElementById("abschnitt-ap-form"); if (el) el.scrollIntoView({ behavior: "smooth" }); }
  }
  // Die im Code hinterlegten Standard-Kontakte in die Datenbank übernehmen,
  // damit sie im Admin-Bereich bearbeitet und gelöscht werden können.
  async function apDefaultsUebernehmen() {
    const eintraege = AP_DEFAULT.map(({ id, ...rest }) => ({ ...AP_LEER, ...rest }));
    let { error } = await supabase.from("ansprechpartner").insert(eintraege);
    if (error && /website/i.test(error.message)) {
      ({ error } = await supabase.from("ansprechpartner").insert(eintraege.map(({ website, ...r }) => r)));
    }
    if (error) { toast("Fehler: " + error.message); return; }
    toast("Standard-Ansprechpartner übernommen ✅ – jetzt bearbeitbar");
    ladeDaten();
  }
  async function apLoeschen(id, name) { if (!bestaetigeLoeschen(name || "Ansprechpartner")) return; await supabase.from("ansprechpartner").delete().eq("id", id); if (apForm.id === id) setApForm(AP_LEER); toast("Ansprechpartner gelöscht"); ladeDaten(); }

  // ---- Admin: Veranstaltungen ----
  // Sprechender Direktlink: Slug aus dem Titel, bei Doppelungen mit Datum ergänzt.
  function eventSlug(titel, datum, ausserId) {
    const basis = slugify(titel) || "veranstaltung";
    const belegt = (s) => adminEvents.some((v) => v.slug === s && v.id !== ausserId);
    if (!belegt(basis)) return basis;
    const mitDatum = basis + "-" + datum;
    if (!belegt(mitDatum)) return mitDatum;
    return mitDatum + "-" + Math.random().toString(36).slice(2, 6);
  }
  async function eventSpeichern(e) {
    e.preventDefault(); setEvMsg("");
    if (!evForm.titel || !evForm.datum) { setEvMsg("Titel und Datum sind Pflicht."); return; }
    const { id, created_at, ...werte } = evForm;
    // Bestehende Slugs bleiben stabil (verteilte Links funktionieren weiter)
    werte.slug = werte.slug || eventSlug(werte.titel, werte.datum, id);
    const schreiben = (w) => (id
      ? supabase.from("veranstaltungen").update(w).eq("id", id)
      : supabase.from("veranstaltungen").insert(w));
    let { error } = await schreiben(werte);
    // Fallback, solange die Slug-Spalte noch nicht angelegt ist (supabase/portal-fixes.sql)
    if (error && /slug/i.test(error.message)) {
      const { slug, ...ohneSlug } = werte;
      ({ error } = await schreiben(ohneSlug));
    }
    if (error) { setEvMsg("Fehler: " + error.message); return; }
    setEvForm(EVENT_LEER);
    toast(id ? "Veranstaltung aktualisiert ✅" : "Veranstaltung gespeichert ✅");
    ladeAdmin(); ladeDaten();
  }
  function eventBearbeiten(v) {
    setEvForm({ id: v.id, titel: v.titel || "", datum: v.datum || "", uhrzeit: v.uhrzeit || "", ort: v.ort || "Wuppertal", adresse: v.adresse || "", bild_url: v.bild_url || "", beschreibung: v.beschreibung || "", slug: v.slug || "" });
    setEvMsg("");
    if (typeof document !== "undefined") { const el = document.getElementById("abschnitt-event-form"); if (el) el.scrollIntoView({ behavior: "smooth" }); }
  }
  // Bild zur Veranstaltung hochladen (Bucket "blog")
  async function eventBildUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setEvUploading(true); setEvMsg("");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const pfad = `veranstaltungen/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("blog").upload(pfad, file, { cacheControl: "3600", upsert: false });
    if (error) { setEvMsg("Upload-Fehler: " + error.message); setEvUploading(false); return; }
    const { data } = supabase.storage.from("blog").getPublicUrl(pfad);
    setEvForm((f) => ({ ...f, bild_url: data.publicUrl }));
    setEvUploading(false);
  }
  async function eventLoeschen(id, titel) { if (!bestaetigeLoeschen(titel || "Veranstaltung")) return; await supabase.from("veranstaltungen").delete().eq("id", id); toast("Veranstaltung gelöscht"); ladeAdmin(); ladeDaten(); }
  async function anmeldungLoeschen(id, firma) { if (!bestaetigeLoeschen("Anmeldung von " + (firma || "Unternehmen"))) return; await supabase.from("veranstaltung_anmeldungen").delete().eq("id", id); toast("Anmeldung gelöscht"); ladeAdmin(); }
  function linkKopieren(pfad) {
    const url = (typeof window !== "undefined" ? window.location.origin : "") + pfad;
    if (typeof navigator !== "undefined" && navigator.clipboard) { navigator.clipboard.writeText(url).then(() => toast("Link kopiert ✅")).catch(() => toast(url)); }
    else toast(url);
  }
  function csvFeld(v) { const s = String(v == null ? "" : v); return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function csvDownload(zeilen, dateiname) {
    const csv = "﻿" + zeilen.map((r) => r.map(csvFeld).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = dateiname;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  // Namensschilder-Export: eine Zeile pro Person (Ansprechpartner:in + Begleitpersonen)
  function namensschilderExport(ev, list) {
    const titel = (ev && ev.titel) || "Veranstaltung";
    const datum = (ev && ev.datum) || "";
    const zeilen = [["Name", "Unternehmen", "Rolle", "Veranstaltung", "Datum"]];
    list.forEach((a) => {
      zeilen.push([a.name, a.firma, "Ansprechpartner:in", titel, datum]);
      (Array.isArray(a.begleitpersonen) ? a.begleitpersonen : []).forEach((bp) => {
        if (bp && bp.trim()) zeilen.push([bp.trim(), a.firma, "Begleitperson", titel, datum]);
      });
    });
    const slug = slugify(titel + (datum ? "-" + datum : "")) || "veranstaltung";
    csvDownload(zeilen, `namensschilder-${slug}.csv`);
    toast("Namensschilder exportiert ✅");
  }
  // Aussteller-Export je NEST-Explore-Termin: Unternehmen inkl. Kontaktdaten
  function ausstellerExport(m, list) {
    const zeilen = [["Unternehmen", "Ansprechpartner:in", "E-Mail", "Telefon", "Berufe", "Plätze", "Status", "Schule", "Datum"]];
    list.forEach((b) => {
      zeilen.push([
        b.unternehmen, [b.vorname, b.nachname].filter(Boolean).join(" "),
        b.email, b.telefon, b.berufe, b.plaetze,
        (MESSE_STATUS[b.status] || {}).text || b.status,
        m.schule || b.schule, m.datum,
      ]);
    });
    const slug = slugify((m.schule || "nest-explore") + "-" + m.datum) || "nest-explore";
    csvDownload(zeilen, `aussteller-${slug}.csv`);
    toast("Ausstellerliste exportiert ✅");
  }

  // ---- Admin: Blog ----
  async function postSpeichern(e) {
    e.preventDefault(); setPoMsg("");
    if (!poForm.titel) { setPoMsg("Titel ist Pflicht."); return; }
    const slug = poForm.slug ? slugify(poForm.slug) : slugify(poForm.titel);
    const { id, created_at, veroeffentlicht_am, ...rest } = poForm;
    const werte = { ...rest, slug };
    if (id) {
      const { error } = await supabase.from("posts").update(werte).eq("id", id);
      if (error) { setPoMsg("Fehler: " + error.message); return; }
      setPoForm(POST_LEER); setPoVorschau(false);
      toast("Beitrag aktualisiert ✅");
      ladeAdmin();
      return;
    }
    const eintrag = { ...werte, veroeffentlicht_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("posts").insert(eintrag);
    if (error) { setPoMsg("Fehler: " + error.message); return; }
    setPoForm(POST_LEER); setPoVorschau(false);
    setPoMsg("Beitrag gespeichert ✅");
    ladeAdmin();
  }
  function postBearbeiten(p) {
    setPoForm({ ...POST_LEER, ...p });
    setPoMsg(""); setPoVorschau(false);
    if (typeof document !== "undefined") { const el = document.getElementById("abschnitt-blog-form"); if (el) el.scrollIntoView({ behavior: "smooth" }); }
  }
  // Formatierung in den Beitragstext einfügen (umschließt die aktuelle Auswahl)
  function formatEinfuegen(vor, nach = "", platzhalter = "Text") {
    const el = typeof document !== "undefined" ? document.getElementById("po-inhalt") : null;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const ende = el.selectionEnd ?? el.value.length;
    const auswahl = el.value.slice(start, ende) || platzhalter;
    const neu = el.value.slice(0, start) + vor + auswahl + nach + el.value.slice(ende);
    setPoForm((f) => ({ ...f, inhalt: neu }));
    setTimeout(() => { el.focus(); el.setSelectionRange(start + vor.length, start + vor.length + auswahl.length); }, 0);
  }
  async function postLoeschen(id, titel) { if (!bestaetigeLoeschen(titel || "Beitrag")) return; await supabase.from("posts").delete().eq("id", id); toast("Beitrag gelöscht"); ladeAdmin(); }

  // ---- Admin: Bild-Upload (Supabase Storage, Bucket "blog") ----
  async function bildUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true); setPoMsg("");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const pfad = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("blog").upload(pfad, file, { cacheControl: "3600", upsert: false });
    if (error) { setPoMsg("Upload-Fehler: " + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("blog").getPublicUrl(pfad);
    setPoForm((f) => ({ ...f, bild_url: data.publicUrl }));
    setUploading(false);
    setPoMsg("Bild hochgeladen ✅");
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setEv = (k) => (e) => setEvForm((f) => ({ ...f, [k]: e.target.value }));
  const setPo = (k) => (e) => setPoForm((f) => ({ ...f, [k]: k === "published" ? e.target.checked : e.target.value }));

  return (
    <div>
      {!session || recovery ? (
        <section className="hero">
          <div className="container"><div className="hero-inner"><div className="hero-text">
            <span className="hero-badge">Partner-Login</span>
            <h1>Willkommen im<br /><em>Partner-Login</em></h1>
            <p className="lead">Stellen, NESTplay, NEST Explore, Workshops, Ansprechpartner und euer NEST-Assistent – alles an einem Ort.</p>
          </div></div></div>
        </section>
      ) : null}

      {/* Portal · Kacheln, Pill-Buttons und Felder wie im Brilliant-System (bb.css, .bb-portal) */}
      <section className={"bg-light bb-portal" + (session && !recovery ? " pd-seite" : "")}>
        <div className="container" style={{ maxWidth: session && !recovery ? "1280px" : "920px" }}>

          {!supabaseConfigured ? (
            <div className="card"><h3>Supabase noch nicht verbunden</h3>
              <p>Trage in den Umgebungsvariablen <code>NEXT_PUBLIC_SUPABASE_URL</code> und <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ein (siehe README), dann funktioniert das Login.</p>
            </div>
          ) : loading ? (
            <p>Lädt …</p>
          ) : recovery && session ? (
            /* Über den Link aus der Reset-Mail gekommen: direkt neues Passwort
               setzen, statt im Dashboard danach suchen zu müssen. */
            <div className="card" style={{ maxWidth: "460px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 6px" }}>Neues Passwort vergeben</h2>
              <p style={{ fontSize: "13px", color: "var(--text-soft)", margin: "0 0 16px" }}>
                Für <strong>{session.user.email}</strong>. Mindestens 8 Zeichen – danach bist du direkt angemeldet.
              </p>
              <form onSubmit={passwortNeuSetzen} className="tb-form">
                <div className="field"><label>Neues Passwort</label><input type="password" value={pwNeu} onChange={(ev) => setPwNeu(ev.target.value)} placeholder="mindestens 8 Zeichen" autoComplete="new-password" required /></div>
                {pwMsg ? <p style={{ color: pwMsg.startsWith("Fehler") ? "#c2415a" : "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{pwMsg}</p> : null}
                <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>Passwort speichern</button>
              </form>
            </div>
          ) : !session ? (
            <div className="card" style={{ maxWidth: "460px", margin: "0 auto" }}>
              <div className="auth-tabs">
                <button type="button" className={"auth-tab" + (authMode === "login" ? " active" : "")} onClick={() => { setAuthMode("login"); setAuthErr(""); }}>Anmelden</button>
                <button type="button" className={"auth-tab" + (authMode === "register" ? " active" : "")} onClick={() => { setAuthMode("register"); setAuthErr(""); }}>Registrieren</button>
              </div>

              {authMode === "login" ? (
                <>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 18px" }}>Login</h2>
                  <form onSubmit={login} className="tb-form">
                    <div className="field"><label>E-Mail</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                    <div className="field"><label>Passwort</label><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required /></div>
                    {regMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{regMsg}</p> : null}
                    {authErr ? <p style={{ color: "#c2415a", fontSize: "14px" }}>{authErr}</p> : null}
                    {resetMsg ? <p style={{ color: resetMsg.startsWith("Fehler") ? "#c2415a" : "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{resetMsg}</p> : null}
                    <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>Anmelden</button>
                  </form>
                  <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "12px" }}>
                    <button type="button" className="link-btn" onClick={passwortReset} disabled={resetBusy}>{resetBusy ? "Link wird verschickt …" : "Passwort vergessen?"}</button>
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "4px" }}>
                    Noch kein Zugang? <button type="button" className="link-btn" onClick={() => { setAuthMode("register"); setAuthErr(""); }}>Jetzt als Unternehmen registrieren</button>.
                  </p>
                </>
              ) : (() => {
                const f = firmaQuery.trim().toLowerCase();
                const treffer = companies.filter((c) => !f || c.name.toLowerCase().includes(f)).slice(0, 8);
                return (
                  <>
                    <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 6px" }}>Unternehmen registrieren</h2>
                    <p style={{ fontSize: "13px", color: "var(--text-soft)", margin: "0 0 16px" }}>Wähle dein Unternehmen aus NESTplay aus – so passt die Zuordnung garantiert.</p>
                    <form onSubmit={registrieren} className="tb-form">
                      <div className="field combo-field">
                        <label>Unternehmen *</label>
                        <input
                          type="text" value={firmaQuery} autoComplete="off"
                          placeholder={nestplayConfigured ? "Unternehmen suchen …" : "Unternehmensname eingeben"}
                          onChange={(e) => setFirmaFreitext(e.target.value)}
                          onFocus={() => setFirmaOpen(true)}
                          onBlur={() => setTimeout(() => setFirmaOpen(false), 150)}
                          required
                        />
                        {firmaRef && firmaRef !== firmaQuery ? <span className="combo-ok">✓ aus NESTplay übernommen</span> : null}
                        {firmaOpen && treffer.length ? (
                          <div className="combo-list">
                            {treffer.map((c) => (
                              <button type="button" className="combo-item" key={c.ref} onMouseDown={(e) => { e.preventDefault(); waehleFirma(c); }}>
                                <span>{c.name}</span>
                                <span className="combo-count">{c.count} {c.count === 1 ? "Spiel" : "Spiele"}</span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                        {firmaOpen && nestplayConfigured && f && !treffer.length ? (
                          <div className="combo-list"><div className="combo-empty">Kein Treffer – „{firmaQuery}" wird als neuer Name verwendet.</div></div>
                        ) : null}
                      </div>
                      {!nestplayConfigured ? <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "-4px 0 0" }}>Hinweis: NESTplay ist noch nicht verbunden – die Auswahlliste ist daher leer, du kannst den Namen aber frei eintragen.</p> : null}
                      <div className="field"><label>E-Mail</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                      <div className="field"><label>Passwort</label><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="mindestens 8 Zeichen" required /></div>
                      {authErr ? <p style={{ color: "#c2415a", fontSize: "14px" }}>{authErr}</p> : null}
                      <button className="btn btn-primary" type="submit" disabled={regBusy} style={{ width: "100%", justifyContent: "center" }}>{regBusy ? "Wird angelegt …" : "Registrieren"}</button>
                    </form>
                    <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "16px" }}>
                      Schon registriert? <button type="button" className="link-btn" onClick={() => { setAuthMode("login"); setAuthErr(""); }}>Zum Login</button>.
                    </p>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="pd-shell">
              <PortalNav isAdmin={isAdmin} firma={isAdmin ? "NEST BildungsBar" : firmaName} email={session.user.email} onLogout={logout} />
              <main className="pd-main">

              {/* ============ ÜBERSICHT: Begrüßung, Assistent, eigene Zahlen ============ */}
              <section id="abschnitt-dashboard" className="pd-sec">
                <div className="pd-hallo">
                  <span className="pd-datum">{new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}</span>
                  <h1>Willkommen, <em>{isAdmin ? "NEST-Team" : (firmaName || "schön, dass ihr da seid")}</em></h1>
                  <p>Euer Partner-Login nach unseren zwei Kernpunkten: <b className="pd-txt-finden">Azubis finden</b> und <b className="pd-txt-halten">Azubis halten</b>. Fragt den Assistenten oder springt direkt in einen Bereich.</p>
                </div>
                <div id="abschnitt-assistent" className="pd-assistent">
                  <Assistent onNetzwerkFrage={() => setNetzwerkStand((n) => n + 1)} />
                  {/* Was der Assistent nicht weiß: Fragen ans Netzwerk und eigene Erfahrungen */}
                  <div id="abschnitt-netzwerk" className="pd-assistent-netz">
                    {!isAdmin ? (
                      <>
                        <div className="pd-assistent-spalte"><Netzwerk neuLaden={netzwerkStand} /></div>
                        <div className="pd-assistent-spalte"><Erfahrungen userId={session.user.id} /></div>
                      </>
                    ) : (
                      <p className="pd-leer">Fragen ans Netzwerk und Freigaben verwaltet ihr im Admin-Bereich unter „Assistent &amp; Netzwerk“.</p>
                    )}
                  </div>
                </div>
                {!isAdmin && (() => {
                  const aktive = stellen.filter((s) => { const r = tageRestStelle(s.aktiviert_am); return r != null && r >= 0; });
                  const restWerte = aktive.map((s) => tageRestStelle(s.aktiviert_am));
                  const minRest = restWerte.length ? Math.min(...restWerte) : null;
                  const a = ampelStatus(minRest);
                  return (
                    <div className="pd-kpis">
                      <a className="pd-kpi" href="#abschnitt-stellen">
                        <span className="pd-kpi-kopf"><span className="pd-kpi-ic pd-kpi-ic--finden">{ICON.stellen}</span>Eure Stellen online</span>
                        <b className="pd-kpi-zahl">{aktive.length}</b>
                        <span className="pd-kpi-fuss">{stellen.length ? `von ${stellen.length} veröffentlichten Stellen` : "noch keine Stelle veröffentlicht"}</span>
                      </a>
                      <a className="pd-kpi" href="#abschnitt-nestplay">
                        <span className="pd-kpi-kopf"><span className="pd-kpi-ic pd-kpi-ic--finden">{ICON.nestplay}</span>Eure NESTplay-Spiele</span>
                        <b className="pd-kpi-zahl">{nestplaySpiele}</b>
                        <span className="pd-kpi-fuss">{nestplayConfigured ? "live im Unterricht" : "NESTplay nicht verbunden"}</span>
                      </a>
                      <a className={"pd-kpi pd-kpi--ampel " + (minRest == null ? "" : a.cls)} href="#abschnitt-stellen">
                        <span className="pd-kpi-kopf"><span className="pd-kpi-ic pd-kpi-ic--zeit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>Restlaufzeit nächste Stelle</span>
                        <b className="pd-kpi-zahl">{minRest == null ? "–" : minRest + (minRest === 1 ? " Tag" : " Tage")}</b>
                        <span className="pd-kpi-fuss">{minRest == null ? "keine aktive Stelle" : <span className={"ampel-badge " + a.cls}><i className="ampel-dot"></i>{a.text}</span>}</span>
                      </a>
                    </div>
                  );
                })()}
              </section>

              {/* ============ KERNPUNKT 1: AZUBIS FINDEN ============ */}
              <section className="pd-sec">
                <KernpunktBanner
                  id="abschnitt-finden" nr={1} art="finden"
                  titel="Azubis finden" unter="Junge Menschen lernen euch kennen"
                  text="Mit euren Stellen in der Berufswelt, eurem Quiz bei NESTplay und NEST Explore an Schulen lernen Schüler:innen euch kennen, bevor sie sich bewerben."
                  punkte={[{ href: "#abschnitt-stellen", label: "Stellen" }, !isAdmin && { href: "#abschnitt-nestplay", label: "NESTplay" }, { href: "#abschnitt-messe", label: "NEST Explore" }].filter(Boolean)}
                  phoneTitel="Azubis finden"
                  zeilen={[
                    ["Stellen online", String(stellen.filter((s) => { const r = tageRestStelle(s.aktiviert_am); return r != null && r >= 0; }).length)],
                    !isAdmin && ["NESTplay-Spiele", String(nestplaySpiele)],
                    ["Explore-Termin", messeTermine[0] ? messeTermine[0].tag + ". " + messeTermine[0].monat_kurz : "–"],
                  ].filter(Boolean)}
                />

                {/* Unterpunkt: Stellen */}
                <div id="abschnitt-stellen" className="pd-unter">
                  <UnterKopf icon={ICON.stellen} art="finden" titel="Stellen in der Berufswelt" text="Eure Ausbildungsplätze erscheinen 30 Tage lang in der NEST Berufswelt und auf der Startseite.">
                    {stellen.length ? (
                      <button type="button" className={"btn " + (stelleFormOffen || form.id ? "btn-outline" : "btn-primary")} onClick={() => {
                        if (form.id) { setForm((f) => ({ ...LEER, firma: f.firma })); setBerufFrei(false); setMsg(""); setStelleFormOffen(false); return; }
                        setStelleFormOffen((v) => !v);
                      }}>{stelleFormOffen || form.id ? "Formular schließen" : "Neue Stelle"}</button>
                    ) : null}
                  </UnterKopf>
                  {stelleFormOffen || form.id || !stellen.length ? (
                  <div className="card pd-karte" id="abschnitt-stellen-form">
                <h3>{form.id ? "Stelle bearbeiten" : "Neue Ausbildungsstelle veröffentlichen"}</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "16px" }}>{form.id ? "Änderungen werden sofort übernommen." : "Erscheint auf der Berufswelt – automatisch 30 Tage sichtbar."}</p>
                <form onSubmit={speichern} className="tb-form">
                  <div className="row2">
                    <div className="field"><label>Unternehmen *</label><input value={form.firma} onChange={set("firma")} required /></div>
                    <div className="field"><label>Beruf *</label>
                      {berufsKategorien.length ? (
                        <select
                          value={zeigeBerufFrei ? "__frei__" : form.beruf}
                          onChange={(e) => {
                            const wert = e.target.value;
                            if (wert === "__frei__") { setBerufFrei(true); setForm((f) => ({ ...f, beruf: "" })); }
                            else { setBerufFrei(false); setForm((f) => ({ ...f, beruf: wert })); }
                          }}
                          required={!zeigeBerufFrei}
                        >
                          <option value="" disabled>Beruf auswählen …</option>
                          {berufsKategorien.map((k) => (
                            <optgroup key={k.name} label={k.name}>
                              {k.berufe.map((b) => <option key={b} value={b}>{b}</option>)}
                            </optgroup>
                          ))}
                          <option value="__frei__">Anderer Beruf (frei eintragen)</option>
                        </select>
                      ) : null}
                      {(!berufsKategorien.length || zeigeBerufFrei) ? (
                        <input value={form.beruf} onChange={set("beruf")} placeholder="z. B. Mechatroniker:in" required style={berufsKategorien.length ? { marginTop: "8px" } : undefined} />
                      ) : null}
                      {berufsKategorien.length && zeigeBerufFrei ? (
                        <p style={{ color: "var(--text-soft)", fontSize: "12px", margin: "6px 0 0" }}>
                          Tipp: Wähle möglichst einen Beruf aus der Liste – nur dann erscheint die Stelle auch auf der passenden Berufsseite in der Berufswelt.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Art</label>
                      <select value={form.art} onChange={set("art")}><option>Ausbildung</option><option>Duales Studium</option><option>Praktikum</option><option>Freiwilligendienst</option></select>
                    </div>
                    <div className="field"><label>Standort</label>
                      <select value={form.ort} onChange={set("ort")}><option>Wuppertal</option><option>Essen</option><option>Solingen</option><option>Remscheid</option></select>
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Start / Dauer</label><input value={form.start} onChange={set("start")} placeholder="z. B. ab 08/2026 · 3,5 Jahre" /></div>
                    <div className="field"><label>Link (Bewerbung/Karriereseite) *</label><input type="url" value={form.url} onChange={set("url")} placeholder="https://…" required /></div>
                  </div>
                  <div className="field">
                    <label>Stichwörter (max. 3, optional)</label>
                    <p style={{ color: "var(--text-soft)", fontSize: "13px", margin: "2px 0 8px" }}>
                      Mit diesen Stichwörtern wird deine Stelle über die Suche und die Filter in der Berufswelt
                      gefunden – auch wenn Schüler:innen umgangssprachliche Begriffe eingeben. Beispiele: „Auto", „Technik", „Pflege".
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <input value={form.keyword1} onChange={set("keyword1")} placeholder="Stichwort 1" style={{ flex: "1 1 0", minWidth: "120px" }} />
                      <input value={form.keyword2} onChange={set("keyword2")} placeholder="Stichwort 2" style={{ flex: "1 1 0", minWidth: "120px" }} />
                      <input value={form.keyword3} onChange={set("keyword3")} placeholder="Stichwort 3" style={{ flex: "1 1 0", minWidth: "120px" }} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Logo (optional) – ersetzt in der Berufswelt die Buchstaben</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      {form.logo_url ? <img src={form.logo_url} alt="Logo-Vorschau" style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "10px", border: "1px solid var(--line)", background: "#fff", padding: "3px" }} /> : null}
                      <input type="file" accept="image/*" onChange={logoUpload} />
                      {logoUploading ? <span style={{ fontSize: "13px", color: "var(--text-soft)" }}>lädt …</span> : null}
                      {form.logo_url ? <button type="button" className="btn btn-outline" style={{ padding: "4px 10px" }} onClick={() => setForm((f) => ({ ...f, logo_url: "" }))}>Entfernen</button> : null}
                    </div>
                  </div>
                  {msg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{msg}</p> : null}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button className="btn btn-primary" type="submit">{form.id ? "Änderungen speichern" : "Stelle veröffentlichen"}</button>
                    {form.id ? <button type="button" className="btn btn-outline" onClick={() => { setForm((f) => ({ ...LEER, firma: f.firma })); setBerufFrei(false); setMsg(""); }}>Abbrechen</button> : null}
                  </div>
                </form>
                  </div>
                  ) : null}
              {stellen.length ? (
                <div className="card-grid cols-2" style={{ marginBottom: "28px" }}>
                  {stellen.map((s) => {
                    const rest = tageRestStelle(s.aktiviert_am);
                    const a = ampelStatus(rest);
                    return (
                      <div className="card" key={s.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                          <span className="badge">{s.art} · {s.ort}</span>
                          <span className={"ampel-badge " + a.cls}><i className="ampel-dot"></i>{rest == null || rest < 0 ? "abgelaufen" : "noch " + rest + (rest === 1 ? " Tag" : " Tage")}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                          {s.logo_url ? <img src={s.logo_url} alt={s.firma} style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", padding: "3px", flexShrink: 0 }} /> : null}
                          <h3 style={{ margin: 0 }}>{s.beruf}</h3>
                        </div>
                        <p style={{ color: "var(--text-soft)" }}>{s.firma}{s.start ? " · " + s.start : ""}</p>
                        <p style={{ fontSize: "12px", color: "var(--text-mute)" }}>aktiviert am {s.aktiviert_am}</p>
                        {s.url ? <p style={{ fontSize: "12px", margin: "2px 0 0" }}><a href={s.url} target="_blank" rel="noopener">Bewerbungslink ↗</a></p> : null}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                          <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => stelleBearbeiten(s)}>Bearbeiten</button>
                          {rest == null || rest < 0 || rest <= 10
                            ? <button className="btn btn-primary" style={{ padding: "6px 14px" }} onClick={() => verlaengern(s.id)}>Verlängern</button>
                            : null}
                          <button className="btn btn-danger" style={{ padding: "6px 14px" }} onClick={() => loeschen(s.id, s.beruf)}>Löschen</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : <p className="pd-leer">Ihr habt noch keine Stellen veröffentlicht. Über das Formular oben erscheint eure erste Stelle 30 Tage lang in der Berufswelt.</p>}

                </div>

                {/* Unterpunkt: NESTplay */}
                {!isAdmin && (() => {
                  const firma = (stellen[0] && stellen[0].firma) || form.firma || "";
                  return (
                    <div id="abschnitt-nestplay" className="pd-unter">
                      <UnterKopf icon={ICON.nestplay} art="finden" titel="NESTplay im Unterricht" text="Euer Quiz läuft an den Partnerschulen, auch wenn ihr nicht vor Ort seid. Hier seht ihr eure Spiele, die gerade live sind.">
                        <a className="btn btn-outline" href={NESTPLAY_URL} target="_blank" rel="noopener">Zu NESTplay ↗</a>
                      </UnterKopf>
                    {!nestplayConfigured ? (
                      <div className="card" style={{ marginTop: "10px" }}>
                        <p style={{ margin: 0, color: "var(--text-soft)", fontSize: "14px" }}>
                          NESTplay ist noch nicht verbunden. Hinterlege <code>NEXT_PUBLIC_NESTPLAY_SUPABASE_URL</code> und <code>NEXT_PUBLIC_NESTPLAY_SUPABASE_ANON_KEY</code> (anon-Key des nestplay-Projekts) in den Umgebungsvariablen – danach erscheinen die Live-Spiele deines Unternehmens hier automatisch.
                        </p>
                      </div>
                    ) : nestplayGames.length ? (
                      <div className="np-game-grid" style={{ marginTop: "12px" }}>
                        {nestplayGames.map((g) => (
                          <a className="np-game-card" key={g.id} href={gameEditUrl(g)} target="_blank" rel="noopener">
                            <div className="np-game-cover">
                              {g.cover_image ? <img src={g.cover_image} alt={g.name} loading="lazy" /> : <span className="np-game-mono">{(g.name || "?").slice(0, 1).toUpperCase()}</span>}
                              <span className="np-game-live"><i></i>Live</span>
                            </div>
                            <div className="np-game-body">
                              {g.category ? <span className="np-game-cat">{g.category}</span> : null}
                              <div className="np-game-name">{g.name}</div>
                              <span className="np-game-go">Spiel bearbeiten →</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="card" style={{ marginTop: "10px" }}>
                        <p style={{ margin: 0, color: "var(--text-soft)", fontSize: "14px" }}>
                          Für „{firma || "dein Unternehmen"}" sind aktuell keine Live-Spiele in NESTplay hinterlegt. Sobald dein Betrieb in NESTplay ein Spiel auf „Live" stellt, erscheint es hier. Frag dazu gern dein NEST-Team.
                        </p>
                      </div>
                    )}
                    </div>
                  );
                })()}

                {/* Unterpunkt: NEST Explore */}
                <div id="abschnitt-messe" className="pd-unter">
                  <UnterKopf icon={ICON.explore} art="finden" titel="NEST Explore an Schulen" text="In sechs Runden à 7 Minuten lernt ihr Schulklassen persönlich kennen. 290 € pro Termin, exklusiv für Partner zubuchbar.">
                    <a className="btn btn-primary" href="https://nest-explore.de/terminkalender" target="_blank" rel="noopener">Termin buchen ↗</a>
                  </UnterKopf>
                {messeTermine.length ? (
                  <div className="messe-termine">
                    {(alleTermine ? messeTermine : messeTermine.slice(0, 4)).map((m) => (
                      <div
                        className="messe-termin"
                        key={m.id}
                        style={m.highlight ? { borderColor: "var(--gold)", boxShadow: "0 2px 16px rgba(191,149,63,0.18)" } : undefined}
                      >
                        <div className="messe-termin-date">
                          <span className="mt-day">{m.tag}</span>
                          <span className="mt-mon">{m.monat_kurz}</span>
                        </div>
                        <div className="messe-termin-body">
                          <h4>
                            {m.titel}
                            {m.neu ? <span className="badge" style={{ marginLeft: "8px", verticalAlign: "middle" }}>Neu</span> : null}
                            {m.ausgebucht ? <span className="badge ampel-badge ampel-rot" style={{ marginLeft: "8px", verticalAlign: "middle" }}>ausgebucht</span> : null}
                          </h4>
                          <p className="messe-termin-meta">{m.datum_text} · {m.uhrzeit} · {m.ort}</p>
                          {m.info ? <p className="messe-termin-info">{m.info}</p> : null}
                        </div>
                        <a className="btn btn-outline" href="https://nest-explore.de/terminkalender" target="_blank" rel="noopener">Details ↗</a>
                      </div>
                    ))}
                  </div>
                ) : <p className="pd-leer">Aktuell sind keine Termine eingetragen.</p>}
                {messeTermine.length > 4 ? (
                  <button type="button" className="pd-mehr-btn" onClick={() => setAlleTermine((v) => !v)}>{alleTermine ? "Weniger Termine anzeigen" : `Alle ${messeTermine.length} Termine anzeigen`}</button>
                ) : null}
                </div>
              </section>

              {/* ============ KERNPUNKT 2: AZUBIS HALTEN ============ */}
              <section className="pd-sec">
                <KernpunktBanner
                  id="abschnitt-halten" nr={2} art="halten"
                  titel="Azubis halten" unter="Eure Azubis bleiben"
                  text="Mit Workshops für Azubis und Ausbildende, festen Ansprechpartnern und Veranstaltungen im Netzwerk begleiten wir euch durch die ganze Ausbildung."
                  punkte={[{ href: "#abschnitt-workshops", label: "Workshops" }, { href: "#abschnitt-team", label: "Ansprechpartner" }, { href: "#abschnitt-veranstaltungen", label: "Veranstaltungen" }]}
                  phoneTitel="Azubis halten"
                  zeilen={[
                    ["Workshops", "buchbar"],
                    ["Ansprechpartner", String((ansprechpartner.length ? ansprechpartner : AP_DEFAULT).length)],
                    ["Veranstaltung", events[0] && events[0].datum ? String(events[0].datum).slice(8, 10) + "." + String(events[0].datum).slice(5, 7) + "." : "–"],
                  ]}
                />

                {/* Unterpunkt: Workshops */}
                <div id="abschnitt-workshops" className="pd-unter">
                  <UnterKopf icon={ICON.workshops} art="halten" titel="Workshops von NEST AzubiConnect" text="Für Azubis und Ausbildende, z. B. Azubi-Knigge, Kommunikation oder Generationen. Exklusiv für Partner zubuchbar." />
                  <div className="pd-optionen">
                    <a className="pd-option" href="https://nest-azubiconnect.de/workshops.html" target="_blank" rel="noopener">
                      <span className="pd-option-tag">ab 790 € pro Tag</span>
                      <b>Workshop-Tag für euren Betrieb</b>
                      <span>Ein ganzer Tag für eure Azubis oder Ausbildenden, zugeschnitten auf eure Branche.</span>
                      <em>Workshops ansehen{ICON.extern}</em>
                    </a>
                    <a className="pd-option" href="https://nest-azubiconnect.de/offene-workshops.html" target="_blank" rel="noopener">
                      <span className="pd-option-tag">pro Person</span>
                      <b>Offene Workshops</b>
                      <span>Einzelne Azubis oder Ausbildende anmelden und gemeinsam mit anderen Betrieben lernen.</span>
                      <em>Termine &amp; Anmeldung{ICON.extern}</em>
                    </a>
                  </div>
                </div>

                {/* Unterpunkt: Ansprechpartner */}
                <div id="abschnitt-team" className="pd-unter">
                  <UnterKopf icon={ICON.ansprechpartner} art="halten" titel="Eure Ansprechpartner" text="Ein fester Kontakt für alle Fragen rund um eure Ausbildung, dazu Partner aus unserem Netzwerk." />
                  <AnsprechpartnerListe liste={ansprechpartner.length ? ansprechpartner : AP_DEFAULT} />
                </div>

                {/* Unterpunkt: Veranstaltungen */}
                <div id="abschnitt-veranstaltungen" className="pd-unter">
                  <UnterKopf icon={ICON.veranstaltungen} art="halten" titel="Veranstaltungen" text="Ausbildungsdialog zu Fachthemen rund um Ausbildung und viermal im Jahr Netzwerktreffen mit über 70 Ausbildungsbetrieben.">
                    <a className="btn btn-outline" href="/veranstaltungen" target="_blank" rel="noopener">Alle Termine ↗</a>
                  </UnterKopf>
              {events.length ? (
                <div className="va-grid">
                  {events.map((v) => (
                    <div className="va-card" key={v.id}>
                      {v.bild_url ? (
                        <img className="va-card-img" src={v.bild_url} alt={v.titel} loading="lazy" />
                      ) : (
                        <div className="va-card-img va-card-img--leer" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                      )}
                      <div className="va-card-body">
                        <span className="va-card-meta">{kartenDatum(v.datum)}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                        <h4 className="va-card-titel">{v.titel}</h4>
                        <p className="va-card-teaser">{teaser(v.beschreibung)}</p>
                        <a
                          className="btn btn-primary va-card-btn"
                          href={"/veranstaltungen/" + (v.slug || v.id)}
                          target="_blank"
                          rel="noopener"
                        >Details &amp; Anmeldung ↗</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: "var(--text-soft)" }}>Aktuell sind keine Veranstaltungen eingetragen.</p>}
                </div>
              </section>

              {/* ============ ALLES AUF EINEN BLICK ============ */}
              <section id="abschnitt-infos" className="pd-sec">
                <div className="pd-sec-kopf">
                  <span className="section-label">Infos für Partner</span>
                  <h2>Alles auf einen Blick</h2>
                </div>
                <AllesAufEinenBlick />
              </section>

              {/* ============ KONTO ============ */}
              <section id="abschnitt-konto" className="pd-sec">
                <div className="pd-sec-kopf">
                  <span className="section-label">Konto</span>
                  <h2>Konto &amp; Zugang</h2>
                </div>
                <div className="card-grid cols-2">
                  <div className="card">
                    <h3>Unternehmensname ändern</h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "14px" }}>Wird für neue Stellen vorausgefüllt{!isAdmin ? " und in deinen veröffentlichten Stellen aktualisiert" : ""}.</p>
                    <form onSubmit={firmaSpeichern} className="tb-form">
                      {(() => {
                        const f = firmaQuery.trim().toLowerCase();
                        const treffer = companies.filter((c) => !f || c.name.toLowerCase().includes(f)).slice(0, 8);
                        return (
                          <div className="field combo-field">
                            <label>Unternehmen</label>
                            <input
                              type="text" value={firmaQuery} autoComplete="off"
                              placeholder={nestplayConfigured ? "Unternehmen suchen …" : "Unternehmensname eingeben"}
                              onChange={(e) => setFirmaFreitext(e.target.value)}
                              onFocus={() => setFirmaOpen(true)}
                              onBlur={() => setTimeout(() => setFirmaOpen(false), 150)}
                            />
                            {firmaRef && firmaRef !== firmaQuery ? <span className="combo-ok">✓ aus NESTplay übernommen</span> : null}
                            {firmaOpen && treffer.length ? (
                              <div className="combo-list">
                                {treffer.map((c) => (
                                  <button type="button" className="combo-item" key={c.ref} onMouseDown={(e) => { e.preventDefault(); waehleFirma(c); }}>
                                    <span>{c.name}</span>
                                    <span className="combo-count">{c.count} {c.count === 1 ? "Spiel" : "Spiele"}</span>
                                  </button>
                                ))}
                              </div>
                            ) : null}
                            {firmaOpen && nestplayConfigured && f && !treffer.length ? (
                              <div className="combo-list"><div className="combo-empty">Kein Treffer – „{firmaQuery}" wird als Name verwendet.</div></div>
                            ) : null}
                          </div>
                        );
                      })()}
                      {firmaMsg ? <p style={{ color: firmaMsg.startsWith("Fehler") ? "#c2415a" : "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{firmaMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Speichern</button>
                    </form>
                  </div>
                  <div className="card">
                    <h3>Passwort ändern</h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "14px" }}>Mindestens 8 Zeichen. Du bleibst danach eingeloggt.</p>
                    <form onSubmit={passwortAendern} className="tb-form">
                      <div className="field"><label>Neues Passwort</label><input type="password" value={pwNeu} onChange={(e) => setPwNeu(e.target.value)} placeholder="mindestens 8 Zeichen" autoComplete="new-password" /></div>
                      {pwMsg ? <p style={{ color: pwMsg.startsWith("Fehler") ? "#c2415a" : "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{pwMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Passwort ändern</button>
                    </form>
                  </div>
                </div>
              </section>

              <div id="abschnitt-admin" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* =================== ADMIN-BEREICH =================== */}
              {isAdmin && (
                <div style={{ marginTop: "44px", borderTop: "2px solid var(--line)", paddingTop: "32px" }}>
                  <span className="section-label">Nur für Admins</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 22px" }}>Admin-Bereich</h2>

                  {/* NEST-Assistent: Netzwerk-Fragen, Wissen, Partner-Freischaltung */}
                  <AdminAssistent />

                  {/* Auslastung der nächsten Termine */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Auslastung der nächsten Termine</h3>
                  {(() => {
                    const zaehl = {};
                    buchungen.forEach((b) => { if (b.datum) { const k = b.standort + "|" + b.datum; zaehl[k] = (zaehl[k] || 0) + 1; } });
                    return (
                      <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                        {["Wuppertal", "Essen", "Solingen", "Remscheid"].map((ort) => (
                          <div className="card" key={ort}>
                            <span className="badge">{ort} · max. {KAPAZITAET[ort]}/Tag</span>
                            <div style={{ marginTop: "12px" }}>
                              {naechsteTermine(8, ort).map((d) => {
                                const iso = isoDatum(d);
                                const n = zaehl[ort + "|" + iso] || 0;
                                const cap = KAPAZITAET[ort];
                                const voll = n >= cap;
                                const knapp = !voll && cap - n === 1;
                                return (
                                  <div key={iso} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--line)", fontSize: "14px" }}>
                                    <span style={{ color: "var(--navy)" }}>{kurzDatum(d)}</span>
                                    <span style={{ fontWeight: 800, color: voll ? "#c2415a" : (knapp ? "var(--gold-dark)" : "#1f9d63") }}>
                                      {n}/{cap}{voll ? " · ausgebucht" : ""}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Terminbuchungen – abgelaufene Termine werden ausgeblendet */}
                  {(() => {
                  const heuteISO = new Date().toISOString().slice(0, 10);
                  const buchungenAktiv = buchungen.filter((b) => !b.datum || b.datum >= heuteISO);
                  return (<>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 4px" }}>Terminbuchungen ({buchungenAktiv.length})</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "14px", margin: "0 0 14px" }}>Nach Standort gebündelt – ein Klick zeigt die dort gebuchten Termine.</p>
                  {(() => {
                    // Nach Standort bündeln; ein Standort ohne anstehende Buchungen
                    // bleibt sichtbar, damit die vier Städte immer gleich stehen.
                    const proOrt = {};
                    buchungenAktiv.forEach((bu) => { (proOrt[bu.standort] = proOrt[bu.standort] || []).push(bu); });
                    const weitere = Object.keys(proOrt).filter((o) => !STANDORT_ORTE.includes(o)).sort();
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        {STANDORT_ORTE.concat(weitere).map((ort) => {
                          const liste = proOrt[ort] || [];
                          const cap = KAPAZITAET[ort] || 0;
                          // Innerhalb des Standorts nach Termin gruppieren, nächster zuerst
                          const tage = {};
                          liste.forEach((bu) => { const k = bu.datum || bu.datum_text || "ohne Datum"; (tage[k] = tage[k] || []).push(bu); });
                          const keys = Object.keys(tage).sort((a, b) => a.localeCompare(b));
                          const naechster = keys.length ? (tage[keys[0]][0].datum_text || keys[0]) : "";
                          return (
                            <Aufklapper
                              key={ort}
                              titel={ort}
                              unter={keys.length ? "Nächster Termin: " + naechster + " · " + keys.length + (keys.length === 1 ? " Tag belegt" : " Tage belegt") : "Keine anstehenden Buchungen"}
                              meta={liste.length ? liste.length + (liste.length === 1 ? " Gast" : " Gäste") : "frei"}
                              metaFarbe={liste.length ? undefined : "var(--text-mute)"}
                            >
                              {keys.length ? keys.map((k, i) => {
                                const list = tage[k];
                                const first = list[0];
                                const voll = cap && list.length >= cap;
                                return (
                                  <Aufklapper
                                    key={k}
                                    standardOffen={i === 0}
                                    titel={first.datum_text || first.datum || "Ohne Datum"}
                                    meta={list.length + (cap ? "/" + cap : "") + " belegt" + (voll ? " · ausgebucht" : "")}
                                    metaFarbe={voll ? "#c2415a" : undefined}
                                  >
                                    {list.map((bu) => (
                                      <div key={bu.id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                                        <div>
                                          <p style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--navy)" }}>{bu.name} <span style={{ fontWeight: 600, color: "var(--text-mute)" }}>· {bu.uhrzeit}</span></p>
                                          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>
                                            {bu.email ? <a href={`mailto:${bu.email}`}>{bu.email}</a> : "—"}
                                            {bu.telefon ? <> · <a href={`tel:${bu.telefon}`}>{bu.telefon}</a></> : ""}
                                          </p>
                                          {bu.schule ? <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--text-mute)" }}>{bu.schule}</p> : null}
                                          {bu.nachricht ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>„{bu.nachricht}"</p> : null}
                                        </div>
                                        <button className="btn btn-danger" style={{ flexShrink: 0, alignSelf: "flex-start" }} onClick={() => buchungLoeschen(bu.id, bu.name)}>Löschen</button>
                                      </div>
                                    ))}
                                  </Aufklapper>
                                );
                              }) : <p style={{ color: "var(--text-soft)", margin: 0 }}>Für {ort} liegen aktuell keine anstehenden Terminbuchungen vor.</p>}
                            </Aufklapper>
                          );
                        })}
                      </div>
                    );
                  })()}
                  </>);
                  })()}

                  {/* NEST Explore: Termine + angemeldete Unternehmen (nur Übersicht) */}
                  <div id="abschnitt-explore-buchungen" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
                  {(() => {
                    const heuteISO = new Date().toISOString().slice(0, 10);
                    const kommende = adminMesseTermine.filter((m) => m.datum >= heuteISO);
                    const proTermin = {};
                    messeBuchungen.forEach((b) => { if (b.termin_id) (proTermin[b.termin_id] = proTermin[b.termin_id] || []).push(b); });
                    const gesamt = kommende.reduce((s, m) => s + (proTermin[m.id] || []).length, 0);
                    // Buchungen ohne (oder mit gelöschtem) Termin gehen sonst unter
                    const bekannt = new Set(adminMesseTermine.map((m) => m.id));
                    const ohneTermin = messeBuchungen.filter((b) => !b.termin_id || !bekannt.has(b.termin_id));

                    const buchungZeile = (b, m) => {
                      const st = MESSE_STATUS[b.status] || { text: b.status || "offen", cls: "ampel-gelb" };
                      const person = [b.vorname, b.nachname].filter(Boolean).join(" ");
                      return (
                        <div key={b.id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                          <div>
                            <p style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--navy)" }}>
                              {b.unternehmen || "Unternehmen"}
                              <span className={"badge ampel-badge " + st.cls} style={{ marginLeft: "8px", verticalAlign: "middle" }}>{st.text}</span>
                            </p>
                            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>
                              {person || "—"}
                              {b.email ? <> · <a href={`mailto:${b.email}`}>{b.email}</a></> : ""}
                              {b.telefon ? <> · <a href={`tel:${b.telefon.replace(/\s/g, "")}`}>{b.telefon}</a></> : ""}
                            </p>
                            {b.berufe ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-mute)" }}>Berufe: {b.berufe}</p> : null}
                            {b.plaetze ? <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--text-mute)" }}>Plätze: {b.plaetze}</p> : null}
                            {b.anmerkungen ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>„{b.anmerkungen}"</p> : null}
                          </div>
                          <button className="btn btn-danger" style={{ flexShrink: 0, alignSelf: "flex-start" }} onClick={() => messeBuchungLoeschen(b, m)}>Löschen</button>
                        </div>
                      );
                    };

                    return (<>
                      <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 6px" }}>NEST Explore – Termine &amp; Buchungen ({gesamt})</h3>
                      <p style={{ color: "var(--text-soft)", fontSize: "14px", margin: "0 0 14px" }}>
                        Wer ist bei welchem Schultermin dabei? Die Termine selbst werden auf{" "}
                        <a href="https://nest-explore.de" target="_blank" rel="noopener">nest-explore.de</a> gepflegt – Buchungen kannst du hier direkt löschen, der Platz wird dann wieder frei.
                      </p>
                      {kommende.length ? (
                        <div style={{ marginBottom: "32px" }}>
                          {kommende.map((m) => {
                            const list = proTermin[m.id] || [];
                            return (
                              <Aufklapper
                                key={m.id}
                                titel={m.titel}
                                badge={m.ausgebucht ? <span className="badge ampel-badge ampel-rot">ausgebucht</span> : null}
                                unter={[m.datum_text, m.uhrzeit, m.ort, m.klassen, m.schueler ? m.schueler + " Schüler:innen" : ""].filter(Boolean).join(" · ")}
                                meta={list.length + " " + (list.length === 1 ? "Unternehmen" : "Unternehmen") + (m.plaetze ? " · " + m.belegt + "/" + m.plaetze + " Plätze" : "")}
                                metaFarbe={m.ausgebucht ? "#c2415a" : undefined}
                              >
                                {list.length ? (<>
                                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "4px" }}>
                                    <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => ausstellerExport(m, list)}>Ausstellerliste (CSV)</button>
                                  </div>
                                  {list.map((b) => buchungZeile(b, m))}
                                </>) : <p style={{ color: "var(--text-soft)", margin: 0 }}>Noch kein Unternehmen für diesen Termin gebucht.</p>}
                              </Aufklapper>
                            );
                          })}
                        </div>
                      ) : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Aktuell sind keine kommenden NEST-Explore-Termine eingetragen.</p>}

                      {ohneTermin.length ? (
                        <div style={{ marginBottom: "32px" }}>
                          <Aufklapper
                            titel="Ohne Termin-Zuordnung"
                            unter="Buchungen, deren Termin nicht (mehr) im Kalender steht"
                            meta={ohneTermin.length + (ohneTermin.length === 1 ? " Buchung" : " Buchungen")}
                          >
                            {ohneTermin.map((b) => (
                              <div key={b.id}>
                                {b.termin_text || b.schule ? <p style={{ margin: "8px 0 0", fontSize: "13px", fontWeight: 700, color: "var(--text-mute)" }}>{[b.termin_text, b.schule].filter(Boolean).join(" · ")}</p> : null}
                                {buchungZeile(b, null)}
                              </div>
                            ))}
                          </Aufklapper>
                        </div>
                      ) : null}
                    </>);
                  })()}

                  {/* Ansprechpartner verwalten */}
                  <div className="card" style={{ marginBottom: "24px" }} id="abschnitt-ap-form">
                    <h3>{apForm.id ? "Ansprechpartner bearbeiten" : "Ansprechpartner anlegen"}</h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "16px" }}>Erscheint im Partner-Portal im Bereich „Ansprechpartner".</p>
                    <form onSubmit={apSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Name *</label><input value={apForm.name} onChange={apSet("name")} required /></div>
                        <div className="field"><label>Rolle / Thema</label><input value={apForm.rolle} onChange={apSet("rolle")} placeholder="z. B. Kooperation & Unternehmen" /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>E-Mail</label><input type="email" value={apForm.email} onChange={apSet("email")} /></div>
                        <div className="field"><label>Telefon</label><input value={apForm.telefon} onChange={apSet("telefon")} /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>Website</label><input type="url" value={apForm.website || ""} onChange={apSet("website")} placeholder="https://…" /></div>
                        <div className="field"><label>Standort</label><input value={apForm.standort} onChange={apSet("standort")} placeholder="z. B. Wuppertal" /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>Reihenfolge</label><input type="number" value={apForm.sortierung} onChange={apSet("sortierung")} /></div>
                        <div className="field"></div>
                      </div>
                      <div className="field"><label>Kurzinfo</label><input value={apForm.beschreibung} onChange={apSet("beschreibung")} placeholder="Worum kümmert sich die Person?" /></div>
                      <div className="field">
                        <label>Bild</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                          {apForm.bild_url ? <img src={apForm.bild_url} alt="Vorschau" style={{ width: "54px", height: "54px", objectFit: "cover", borderRadius: "50%", border: "1px solid var(--line)" }} /> : null}
                          <input type="file" accept="image/*" onChange={apBildUpload} />
                          {apUploading ? <span style={{ fontSize: "13px", color: "var(--text-soft)" }}>lädt …</span> : null}
                        </div>
                      </div>
                      {apMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{apMsg}</p> : null}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" type="submit">{apForm.id ? "Änderungen speichern" : "Ansprechpartner speichern"}</button>
                        {apForm.id ? <button type="button" className="btn btn-outline" onClick={() => { setApForm(AP_LEER); setApMsg(""); }}>Abbrechen</button> : null}
                      </div>
                    </form>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" }}>Alle Ansprechpartner ({ansprechpartner.length})</h3>
                  {ansprechpartner.length ? (
                    <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                      {ansprechpartner.map((ap) => (
                        <div className="card" key={ap.id}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {ap.bild_url ? <img src={ap.bild_url} alt={ap.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "50%", flexShrink: 0, filter: "grayscale(1)" }} /> : null}
                            <div>
                              <strong style={{ color: "var(--navy)" }}>{ap.name}</strong>
                              {ap.rolle ? <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>{ap.rolle}</p> : null}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                            <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => apBearbeiten(ap)}>Bearbeiten</button>
                            <button className="btn btn-danger" style={{ padding: "6px 14px" }} onClick={() => apLoeschen(ap.id, ap.name)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="card" style={{ marginBottom: "32px" }}>
                      <p style={{ margin: "0 0 12px", color: "var(--text-soft)", fontSize: "14px" }}>
                        Aktuell werden die im Code hinterlegten <strong style={{ color: "var(--navy)" }}>Standard-Kontakte</strong> angezeigt – sie liegen noch nicht in der Datenbank und können deshalb nicht bearbeitet oder gelöscht werden.
                        Mit einem Klick übernimmst du sie in die Datenbank und kannst sie danach frei pflegen (inkl. E-Mail, Telefon und Website).
                      </p>
                      <button type="button" className="btn btn-primary" onClick={apDefaultsUebernehmen}>Standard-Ansprechpartner übernehmen</button>
                    </div>
                  )}

                  {/* Veranstaltung anlegen / bearbeiten */}
                  <div className="card" style={{ marginBottom: "24px" }} id="abschnitt-event-form">
                    <h3>{evForm.id ? "Veranstaltung bearbeiten" : "Veranstaltung anlegen"}</h3>
                    <form onSubmit={eventSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Titel *</label><input value={evForm.titel} onChange={setEv("titel")} placeholder="z. B. OpenHouse Wuppertal" required /></div>
                        <div className="field"><label>Datum *</label><input type="date" value={evForm.datum} onChange={setEv("datum")} required /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>Uhrzeit</label><input value={evForm.uhrzeit} onChange={setEv("uhrzeit")} placeholder="z. B. 17:00–19:00" /></div>
                        <div className="field"><label>Ort (Stadt / Format)</label>
                          <select value={evForm.ort} onChange={setEv("ort")}><option>Wuppertal</option><option>Essen</option><option>Solingen</option><option>Remscheid</option><option>Online</option></select>
                        </div>
                      </div>
                      <div className="field"><label>Genaue Adresse</label><input value={evForm.adresse} onChange={setEv("adresse")} placeholder="z. B. NEST BildungsBar, Hochstraße 65, 42105 Wuppertal" /></div>
                      <div className="field">
                        <label>Bild (optional) – erscheint unter dem Kalender</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                          {evForm.bild_url ? <img src={evForm.bild_url} alt="Vorschau" style={{ width: "84px", height: "60px", objectFit: "cover", borderRadius: "10px", border: "1px solid var(--line)" }} /> : null}
                          <input type="file" accept="image/*" onChange={eventBildUpload} disabled={evUploading} />
                          {evUploading ? <span style={{ fontSize: "13px", color: "var(--text-soft)" }}>lädt …</span> : null}
                          {evForm.bild_url ? <button type="button" className="btn btn-outline" style={{ padding: "4px 10px" }} onClick={() => setEvForm((f) => ({ ...f, bild_url: "" }))}>Entfernen</button> : null}
                        </div>
                      </div>
                      <div className="field"><label>Beschreibung</label><textarea value={evForm.beschreibung} onChange={setEv("beschreibung")} placeholder="Kurzbeschreibung (optional)"></textarea></div>
                      {evMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{evMsg}</p> : null}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" type="submit">{evForm.id ? "Änderungen speichern" : "Veranstaltung speichern"}</button>
                        {evForm.id ? <button type="button" className="btn btn-outline" onClick={() => { setEvForm(EVENT_LEER); setEvMsg(""); }}>Abbrechen</button> : null}
                      </div>
                    </form>
                  </div>

                  {/* Alle Veranstaltungen verwalten */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 6px" }}>Alle Veranstaltungen ({adminEvents.length})</h3>
                  <div className="card" style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", padding: "14px 18px" }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>Der Kalender ist <strong style={{ color: "var(--navy)" }}>nicht im Menü verlinkt</strong> – verteile diesen Link direkt. Pro Veranstaltung gibt es zusätzlich einen Direktlink.</p>
                    <button type="button" className="btn btn-outline" style={{ flexShrink: 0 }} onClick={() => linkKopieren("/veranstaltungen")}>Kalender-Link kopieren</button>
                  </div>
                  {adminEvents.length ? (
                    <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                      {adminEvents.map((v) => (
                        <div className="card" key={v.id}>
                          {v.bild_url ? <img src={v.bild_url} alt={v.titel} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px", marginBottom: "12px" }} /> : null}
                          <span className="num-label">{v.datum}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                          <h3>{v.titel}</h3>
                          <p style={{ color: "var(--text-soft)" }}>{v.ort}</p>
                          {v.adresse ? <p style={{ color: "var(--text-mute)", fontSize: "13px", margin: "2px 0 0" }}>{v.adresse}</p> : null}
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                            <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => eventBearbeiten(v)}>Bearbeiten</button>
                            <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => linkKopieren("/veranstaltungen/" + (v.slug || v.id))}>Link kopieren</button>
                            <button className="btn btn-danger" style={{ padding: "6px 14px" }} onClick={() => eventLoeschen(v.id, v.titel)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Veranstaltungen.</p>}

                  {/* Anmeldungen von Unternehmen zu Veranstaltungen */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" }}>Anmeldungen zu Veranstaltungen ({anmeldungen.length})</h3>
                  {anmeldungen.length ? (() => {
                    const evMap = {};
                    adminEvents.forEach((v) => { evMap[v.id] = v; });
                    const groups = {};
                    anmeldungen.forEach((a) => { (groups[a.veranstaltung_id] = groups[a.veranstaltung_id] || []).push(a); });
                    const keys = Object.keys(groups).sort((a, b) => {
                      const da = (evMap[a] && evMap[a].datum) || "", db = (evMap[b] && evMap[b].datum) || "";
                      return da.localeCompare(db);
                    });
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        {keys.map((k) => {
                          const list = groups[k];
                          const ev = evMap[k];
                          const personen = list.reduce((s, a) => s + (a.personen || 1), 0);
                          return (
                            <div className="card" key={k} style={{ marginBottom: "16px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", borderBottom: "2px solid var(--line)", paddingBottom: "10px", marginBottom: "10px" }}>
                                <h3 style={{ margin: 0 }}>{ev ? ev.titel : "Veranstaltung"}{ev && ev.datum ? <span style={{ fontWeight: 600, color: "var(--text-mute)" }}> · {ev.datum}{ev.uhrzeit ? " · " + ev.uhrzeit : ""}{ev.ort ? " · " + ev.ort : ""}</span> : null}</h3>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                                  <span style={{ fontWeight: 800, color: "var(--gold-dark)" }}>{list.length} {list.length === 1 ? "Unternehmen" : "Unternehmen"} · {personen} {personen === 1 ? "Person" : "Personen"}</span>
                                  <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => namensschilderExport(ev, list)}>Namensschilder (CSV)</button>
                                </div>
                              </div>
                              {list.map((a) => {
                                const begleit = (Array.isArray(a.begleitpersonen) ? a.begleitpersonen : []).filter((bp) => bp && bp.trim());
                                return (
                                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                                  <div>
                                    <p style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--navy)" }}>{a.firma} <span style={{ fontWeight: 600, color: "var(--text-mute)" }}>· {a.personen || 1} {(a.personen || 1) === 1 ? "Person" : "Personen"}</span></p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>
                                      {a.name}{a.email ? <> · <a href={`mailto:${a.email}`}>{a.email}</a></> : ""}{a.telefon ? <> · <a href={`tel:${a.telefon}`}>{a.telefon}</a></> : ""}
                                    </p>
                                    {begleit.length ? <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>Begleitung: {begleit.join(", ")}</p> : null}
                                    {a.nachricht ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>„{a.nachricht}"</p> : null}
                                  </div>
                                  <button className="btn btn-danger" style={{ flexShrink: 0, alignSelf: "flex-start" }} onClick={() => anmeldungLoeschen(a.id, a.firma)}>Löschen</button>
                                </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })() : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Anmeldungen von Unternehmen.</p>}

                  {/* Blogbeitrag anlegen / bearbeiten */}
                  <div className="card" style={{ marginBottom: "24px" }} id="abschnitt-blog-form">
                    <h3>{poForm.id ? "Blogbeitrag bearbeiten" : "Blogbeitrag anlegen"}</h3>
                    <form onSubmit={postSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Titel *</label><input value={poForm.titel} onChange={setPo("titel")} required /></div>
                        <div className="field"><label>Slug (URL)</label><input value={poForm.slug} onChange={setPo("slug")} placeholder="leer = automatisch aus Titel" /></div>
                      </div>
                      <div className="field"><label>Kurztext (Teaser)</label><input value={poForm.excerpt} onChange={setPo("excerpt")} placeholder="1–2 Sätze für die Übersicht" /></div>
                      <div className="field">
                        <label>Beitragsbild</label>
                        <input type="file" accept="image/*" onChange={bildUpload} disabled={uploading} />
                        {uploading ? <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "6px" }}>Lädt hoch …</p> : null}
                        {poForm.bild_url ? (
                          <img src={poForm.bild_url} alt="Vorschau" style={{ width: "100%", maxWidth: "260px", borderRadius: "10px", marginTop: "10px", display: "block" }} />
                        ) : null}
                        <input value={poForm.bild_url} onChange={setPo("bild_url")} placeholder="…oder Bild-URL einfügen" style={{ marginTop: "8px" }} />
                      </div>
                      <div className="field">
                        <label>Inhalt</label>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px" }} onClick={() => formatEinfuegen("\n\n## ", "\n\n", "Überschrift")}>Überschrift</button>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px" }} onClick={() => formatEinfuegen("\n\n### ", "\n\n", "Zwischenüberschrift")}>Zwischenüberschrift</button>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px", fontWeight: 800 }} onClick={() => formatEinfuegen("**", "**", "fetter Text")}>B</button>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px", fontStyle: "italic" }} onClick={() => formatEinfuegen("*", "*", "kursiver Text")}>I</button>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px" }} onClick={() => formatEinfuegen("\n\n- Punkt 1\n- Punkt 2\n- Punkt 3\n\n", "", "")}>Liste</button>
                          <button type="button" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "13px" }} onClick={() => formatEinfuegen("[", "](https://…)", "Linktext")}>Link</button>
                          <button type="button" className={"btn " + (poVorschau ? "btn-primary" : "btn-outline")} style={{ padding: "4px 10px", fontSize: "13px", marginLeft: "auto" }} onClick={() => setPoVorschau((v) => !v)}>{poVorschau ? "Zurück zum Editor" : "Vorschau"}</button>
                        </div>
                        {poVorschau ? (
                          <div className="blog-content" style={{ border: "1px solid var(--line)", borderRadius: "10px", padding: "14px 16px", background: "#fff", minHeight: "140px" }} dangerouslySetInnerHTML={{ __html: inhaltZuHtml(poForm.inhalt) || "<p style='color:#999'>Noch kein Inhalt …</p>" }} />
                        ) : (
                          <textarea id="po-inhalt" value={poForm.inhalt} onChange={setPo("inhalt")} placeholder={"Dein Beitrag …\n\nLeerzeile = neuer Absatz. Über die Buttons oben kannst du Überschriften, fetten Text, Listen und Links einfügen."} style={{ minHeight: "220px" }}></textarea>
                        )}
                        <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "6px 0 0" }}>Leerzeile = neuer Absatz · <code>## Überschrift</code> · <code>**fett**</code> · <code>*kursiv*</code> · <code>- Liste</code> · <code>[Text](https://link)</code> – vorhandenes HTML funktioniert weiterhin.</p>
                      </div>
                      <label className="tb-check"><input type="checkbox" checked={poForm.published} onChange={setPo("published")} /> Sofort veröffentlichen</label>
                      {poMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{poMsg}</p> : null}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" type="submit">{poForm.id ? "Änderungen speichern" : "Beitrag speichern"}</button>
                        {poForm.id ? <button type="button" className="btn btn-outline" onClick={() => { setPoForm(POST_LEER); setPoMsg(""); setPoVorschau(false); }}>Abbrechen</button> : null}
                      </div>
                    </form>
                  </div>

                  {/* Alle Beiträge verwalten */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" }}>Alle Beiträge ({adminPosts.length})</h3>
                  {adminPosts.length ? (
                    <div className="card-grid cols-2">
                      {adminPosts.map((p) => (
                        <div className="card" key={p.id}>
                          <span className="num-label">{p.veroeffentlicht_am} · {p.published ? "veröffentlicht" : "Entwurf"}</span>
                          <h3>{p.titel}</h3>
                          <p style={{ color: "var(--text-soft)", fontSize: "13px" }}>/blog/{p.slug}</p>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                            <button className="btn btn-outline" onClick={() => postBearbeiten(p)}>Bearbeiten</button>
                            <a className="btn btn-outline" href={`/blog/${p.slug}`} target="_blank" rel="noopener">Ansehen</a>
                            <button className="btn btn-danger" onClick={() => postLoeschen(p.id, p.titel)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: "var(--text-soft)" }}>Noch keine Beiträge.</p>}
                </div>
              )}
              </main>
            </div>
          )}
        </div>
      </section>
      {toastMsg ? <div className="pp-toast" role="status">{toastMsg}</div> : null}
    </div>
  );
}
