"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";
import { fetchGamesForCompany, fetchLiveGamesTotal, fetchNestplayCompanies, gameEditUrl, nestplayConfigured, NESTPLAY_URL } from "@/lib/nestplayClient";
import { mapMesseTermin } from "@/lib/messeTermine";

const ADMIN_EMAIL = "info@nest-bildungsbar.de";
const LEER = { firma: "", beruf: "", art: "Ausbildung", ort: "Wuppertal", start: "", url: "", logo_url: "", keyword1: "", keyword2: "", keyword3: "" };
const EVENT_LEER = { titel: "", datum: "", uhrzeit: "", ort: "Wuppertal", beschreibung: "" };
const POST_LEER = { slug: "", titel: "", excerpt: "", inhalt: "", bild_url: "", published: true };
const AP_LEER = { name: "", rolle: "", email: "", telefon: "", standort: "", bild_url: "", beschreibung: "", sortierung: 0 };

// Standard-Ansprechpartner – werden gezeigt, solange in der Tabelle `ansprechpartner`
// noch nichts gepflegt ist (Admin kann sie im Portal überschreiben/ergänzen).
const AP_DEFAULT = [
  { id: "d1", name: "Mike Schrott", rolle: "Netzwerk & Partnerschaften", email: "mike@nest-bildungsbar.de", telefon: "+49 151 12345678", bild_url: "/assets/img/team/mike.jpg" },
  { id: "d2", name: "Patrick Müller", rolle: "Kooperation & Unternehmen", email: "patrick@nest-bildungsbar.de", telefon: "+49 151 23456789", bild_url: "/assets/img/team/patrick.jpg" },
  { id: "d3", name: "Sarah Bauer", rolle: "Berufsorientierung & Schulen", email: "sarah@nest-bildungsbar.de", telefon: "+49 151 34567890", bild_url: "/assets/img/team/sarah.jpg" },
];

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Auslastung: Kapazität pro Tag + nächste Di/Do-Termine
const KAPAZITAET = { Wuppertal: 4, Essen: 2 };
const WTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function naechsteTermine(n) {
  const out = [];
  const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
  let guard = 0;
  while (out.length < n && guard < 120) {
    if (d.getDay() === 2 || d.getDay() === 4) out.push(new Date(d));
    d.setDate(d.getDate() + 1); guard++;
  }
  return out;
}
function isoDatum(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function kurzDatum(d) { return WTAGE[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "."; }

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
  const [netzStellen, setNetzStellen] = useState(0);
  const [netzSpiele, setNetzSpiele] = useState(0);
  const [form, setForm] = useState(LEER);
  const [msg, setMsg] = useState("");

  // Admin
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminPosts, setAdminPosts] = useState([]);
  const [buchungen, setBuchungen] = useState([]);
  const [anmeldungen, setAnmeldungen] = useState([]); // Unternehmens-Anmeldungen zu Veranstaltungen
  const [evForm, setEvForm] = useState(EVENT_LEER);
  const [evMsg, setEvMsg] = useState("");
  const [poForm, setPoForm] = useState(POST_LEER);
  const [poMsg, setPoMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [infoFilter, setInfoFilter] = useState("Alle");
  const [logoUploading, setLogoUploading] = useState(false);   // Logo-Upload bei der Stelle
  const [toastMsg, setToastMsg] = useState("");                 // kurze Erfolg-/Hinweis-Meldung
  const [resetMsg, setResetMsg] = useState("");                 // Passwort-Reset-Feedback
  const [firmaMsg, setFirmaMsg] = useState("");                 // Konto: Unternehmensname-Feedback
  const [pwNeu, setPwNeu] = useState("");                       // neues Passwort (Konto)
  const [pwMsg, setPwMsg] = useState("");
  // Ansprechpartner (öffentlich lesbar, vom Admin pflegbar)
  const [ansprechpartner, setAnsprechpartner] = useState([]);
  const [apForm, setApForm] = useState(AP_LEER);
  const [apMsg, setApMsg] = useState("");
  const [apUploading, setApUploading] = useState(false);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  // Kurze Toast-Meldung (verschwindet nach ein paar Sekunden von selbst)
  const toast = useCallback((text) => setToastMsg(text), []);
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(""), 3200);
    return () => clearTimeout(t);
  }, [toastMsg]);
  // Sicherheitsabfrage vor dem Löschen
  const bestaetigeLoeschen = (was) => window.confirm(`„${was}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`);

  const KAT_CFG = {
    "Kooperation": {
      cls: "info-card--koop",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    },
    "NESTplay": {
      cls: "info-card--play",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="12" r="1"/><circle cx="18" cy="10" r="1"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
    },
    "Messe": {
      cls: "info-card--messe",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
  };

  const INFO_CARDS = [
    { kat: "Kooperation", titel: "Wie die Kooperation funktioniert", text: "Als NEST-Partner erhältst du Zugang zu allen Formaten: Workshops an Schulen, Messeauftritt, NESTplay-Einsatz und regelmäßige Netzwerktreffen – alles aus einer Hand." },
    { kat: "Kooperation", titel: "Onboarding & Offboarding", text: "Wir begleiten dich vom ersten Gespräch bis zum laufenden Betrieb. Onboarding-Termin, Materialien und persönlicher Ansprechpartner inklusive." },
    { kat: "Kooperation", titel: "Ausbildungsdialog", text: "Einmal pro Saison treffen sich alle Partner zum Ausbildungsdialog – für Austausch, Feedback und gemeinsame Weiterentwicklung der NEST-Formate." },
    { kat: "Kooperation", titel: "Stellenpool & Berufswelt", text: "Veröffentliche deine Ausbildungsstellen direkt auf der NEST-Berufswelt-Seite. Schüler:innen können Stellen speichern und mit einem Link teilen." },
    { kat: "NESTplay", titel: "NESTplay für Unternehmen", text: "Präsentiere deinen Betrieb im Unterricht als interaktives Live-Quiz. Schüler:innen spielen in Echtzeit und merken sich deinen Betrieb nachhaltig." },
    { kat: "NESTplay", titel: "Quiz-Inhalte erstellen", text: "Du lieferst 5 Fragen zu deinem Unternehmen und Ausbildungsberuf – unser Team kümmert sich um die technische Umsetzung und den Einsatz in der Klasse." },
    { kat: "NESTplay", titel: "Ablauf eines NESTplay-Workshops", text: "45–90 Minuten direkt in der Schule. Unternehmensvorstellung, Live-Quiz-Runde, Ergebnisdiskussion und Kontaktmöglichkeit – alles in einem Format." },
    { kat: "Messe", titel: "NEST Explore Ausbildungsmesse", text: "Das zentrale Format für direkte Begegnungen: Schüler:innen, Schulklassen und Jugendliche treffen regionale Ausbildungsunternehmen an einem Ort." },
    { kat: "Messe", titel: "Aussteller-Infos", text: "Als Aussteller erhältst du einen eigenen Stand, Besucherführung durch Schulklassen und die Möglichkeit, interaktive Elemente einzusetzen." },
    { kat: "Messe", titel: "Messetermin & Anmeldung", text: "NEST Explore findet einmal jährlich statt. Schulen buchen Zeitfenster vorab – du kannst deinen Auftritt gezielt auf Klassen und Schulformen abstimmen." },
    { kat: "Kooperation", titel: "Netzwerktreffen", text: "Regelmäßige Treffen mit anderen NEST-Partnern: Austausch über Ausbildungstrends, gemeinsame Aktionen und direkte Kommunikation mit dem NEST-Team." },
    { kat: "Kooperation", titel: "Gemeinwohl & Verantwortung", text: "Dein Engagement als NEST-Partner stärkt die Region: Du investierst in den Ausbildungsnachwuchs und trägst zur Jugendberufsorientierung vor Ort bei." },
  ];

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
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

    // Vergleichswert: aktive Stellen im gesamten Netzwerk (RLS gibt nur aktive Stellen frei)
    const grenze = new Date(Date.now() - STELLEN_TAGE * 86400000).toISOString().slice(0, 10);
    const { count: netzCount } = await supabase
      .from("stellen").select("*", { count: "exact", head: true })
      .gte("aktiviert_am", grenze);
    setNetzStellen(netzCount || 0);

    // NESTplay-Anbindung: Live-Spiele des Unternehmens + Netzwerk-Gesamtzahl
    const [spiele, gesamt] = await Promise.all([
      fetchGamesForCompany(nestplayRef),
      fetchLiveGamesTotal(),
    ]);
    setNestplayGames(spiele);
    setNestplaySpiele(spiele.length);
    setNetzSpiele(gesamt);
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
    if (error) setAuthErr("Login fehlgeschlagen: " + error.message);
  }

  function waehleFirma(c) {
    setFirmaRef(c.ref); setFirmaQuery(c.name); setFirmaOpen(false);
  }
  function setFirmaFreitext(v) {
    setFirmaQuery(v); setFirmaRef(null); setFirmaOpen(true); // Freitext -> Mapping später über den Namen
  }

  async function registrieren(e) {
    e.preventDefault(); setAuthErr(""); setRegMsg("");
    const firmaName = firmaQuery.trim();
    if (!firmaName) { setAuthErr("Bitte wähle oder nenne dein Unternehmen."); return; }
    if (pass.length < 8) { setAuthErr("Das Passwort muss mindestens 8 Zeichen haben."); return; }
    setRegBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email, password: pass,
      options: { data: { firma: firmaName, nestplay_ref: firmaRef || firmaName } },
    });
    setRegBusy(false);
    if (error) { setAuthErr("Registrierung fehlgeschlagen: " + error.message); return; }
    if (data.session) {
      setRegMsg("Willkommen! Dein Zugang ist aktiv.");
    } else {
      setRegMsg("Fast geschafft! Wir haben dir eine E-Mail zur Bestätigung geschickt. Bitte bestätige deine Adresse und melde dich anschließend an.");
      setAuthMode("login");
    }
  }
  async function logout() { await supabase.auth.signOut(); setStellen([]); setEvents([]); setAdminEvents([]); setAdminPosts([]); setBuchungen([]); setAnmeldungen([]); setNestplayGames([]); setNestplaySpiele(0); setNetzStellen(0); setNetzSpiele(0); }

  // ---- Konto: Unternehmensname & Passwort ändern ----
  async function firmaSpeichern(e) {
    e.preventDefault(); setFirmaMsg(""); setFirmaOpen(false);
    const name = firmaQuery.trim();
    if (!name) { setFirmaMsg("Bitte ein Unternehmen wählen oder eingeben."); return; }
    const meta = session.user.user_metadata || {};
    const { error } = await supabase.auth.updateUser({ data: { ...meta, firma: name, nestplay_ref: firmaRef || name } });
    if (error) { setFirmaMsg("Fehler: " + error.message); return; }
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
    if (error) { setPwMsg("Fehler: " + error.message); return; }
    setPwNeu(""); setPwMsg(""); toast("Passwort geändert ✅");
  }

  async function buchungLoeschen(id, name) { if (!bestaetigeLoeschen("Buchung von " + (name || "Gast"))) return; await supabase.from("buchungen").delete().eq("id", id); toast("Buchung gelöscht"); ladeAdmin(); }

  async function speichern(e) {
    e.preventDefault(); setMsg("");
    // Nur echte Spalten an die DB schicken (keyword1..3 -> keywords-Array)
    const keywords = [form.keyword1, form.keyword2, form.keyword3].map((k) => (k || "").trim()).filter(Boolean);
    const werte = { firma: form.firma, beruf: form.beruf, art: form.art, ort: form.ort, start: form.start, url: form.url, logo_url: form.logo_url, keywords };
    if (form.id) {
      const { error } = await supabase.from("stellen").update(werte).eq("id", form.id);
      if (error) { setMsg("Fehler: " + error.message); return; }
      setForm((f) => ({ ...LEER, firma: f.firma }));
      toast("Stelle aktualisiert ✅");
      ladeDaten();
      return;
    }
    const eintrag = { ...werte, partner_id: session.user.id, aktiviert_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("stellen").insert(eintrag);
    if (error) { setMsg("Fehler: " + error.message); return; }
    setForm((f) => ({ ...LEER, firma: f.firma }));
    toast("Stelle veröffentlicht ✅ (30 Tage sichtbar)");
    ladeDaten();
  }
  function stelleBearbeiten(s) {
    const kw = Array.isArray(s.keywords) ? s.keywords : [];
    setForm({ id: s.id, firma: s.firma || "", beruf: s.beruf || "", art: s.art || "Ausbildung", ort: s.ort || "Wuppertal", start: s.start || "", url: s.url || "", logo_url: s.logo_url || "", keyword1: kw[0] || "", keyword2: kw[1] || "", keyword3: kw[2] || "" });
    setMsg("");
    if (typeof document !== "undefined") { const el = document.getElementById("abschnitt-stellen"); if (el) el.scrollIntoView({ behavior: "smooth" }); }
  }
  async function verlaengern(id) {
    const { error } = await supabase.from("stellen").update({ aktiviert_am: new Date().toISOString().slice(0, 10) }).eq("id", id);
    if (error) { toast("Fehler: " + error.message); return; }
    toast("Stelle um 30 Tage verlängert ✅");
    ladeDaten();
  }
  async function loeschen(id, name) { if (!bestaetigeLoeschen(name || "Stelle")) return; await supabase.from("stellen").delete().eq("id", id); if (form.id === id) setForm((f) => ({ ...LEER, firma: f.firma })); toast("Stelle gelöscht"); ladeDaten(); }

  async function passwortReset() {
    setResetMsg("");
    if (!email) { setResetMsg("Bitte zuerst deine E-Mail-Adresse oben eintragen."); return; }
    const redirectTo = typeof window !== "undefined" ? window.location.origin + "/partner-portal" : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setResetMsg(error ? "Fehler: " + error.message : "Wir haben dir einen Link zum Zurücksetzen geschickt – schau in dein Postfach.");
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
    const { id, ...werte } = apForm;
    const { error } = id
      ? await supabase.from("ansprechpartner").update(werte).eq("id", id)
      : await supabase.from("ansprechpartner").insert(werte);
    if (error) { setApMsg("Fehler: " + error.message); return; }
    setApForm(AP_LEER);
    setApMsg("");
    toast("Ansprechpartner gespeichert ✅");
    ladeDaten();
  }
  function apBearbeiten(ap) { setApForm({ ...AP_LEER, ...ap }); setApMsg(""); }
  async function apLoeschen(id, name) { if (!bestaetigeLoeschen(name || "Ansprechpartner")) return; await supabase.from("ansprechpartner").delete().eq("id", id); if (apForm.id === id) setApForm(AP_LEER); toast("Ansprechpartner gelöscht"); ladeDaten(); }

  // ---- Admin: Veranstaltungen ----
  async function eventSpeichern(e) {
    e.preventDefault(); setEvMsg("");
    if (!evForm.titel || !evForm.datum) { setEvMsg("Titel und Datum sind Pflicht."); return; }
    const { error } = await supabase.from("veranstaltungen").insert(evForm);
    if (error) { setEvMsg("Fehler: " + error.message); return; }
    setEvForm(EVENT_LEER);
    toast("Veranstaltung gespeichert ✅");
    ladeAdmin(); ladeDaten();
  }
  async function eventLoeschen(id, titel) { if (!bestaetigeLoeschen(titel || "Veranstaltung")) return; await supabase.from("veranstaltungen").delete().eq("id", id); toast("Veranstaltung gelöscht"); ladeAdmin(); ladeDaten(); }
  async function anmeldungLoeschen(id, firma) { if (!bestaetigeLoeschen("Anmeldung von " + (firma || "Unternehmen"))) return; await supabase.from("veranstaltung_anmeldungen").delete().eq("id", id); toast("Anmeldung gelöscht"); ladeAdmin(); }
  function linkKopieren(pfad) {
    const url = (typeof window !== "undefined" ? window.location.origin : "") + pfad;
    if (typeof navigator !== "undefined" && navigator.clipboard) { navigator.clipboard.writeText(url).then(() => toast("Link kopiert ✅")).catch(() => toast(url)); }
    else toast(url);
  }

  // ---- Admin: Blog ----
  async function postSpeichern(e) {
    e.preventDefault(); setPoMsg("");
    if (!poForm.titel) { setPoMsg("Titel ist Pflicht."); return; }
    const slug = poForm.slug ? slugify(poForm.slug) : slugify(poForm.titel);
    const eintrag = { ...poForm, slug, veroeffentlicht_am: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("posts").insert(eintrag);
    if (error) { setPoMsg("Fehler: " + error.message); return; }
    setPoForm(POST_LEER);
    setPoMsg("Beitrag gespeichert ✅");
    ladeAdmin();
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
      <section className="hero">
        <div className="container"><div className="hero-inner"><div className="hero-text">
          <span className="hero-badge">Partner-Portal</span>
          <h1>Willkommen im<br /><em>Partner-Portal</em></h1>
          <p className="lead">Verwalte deine Ausbildungsstellen, sieh dir kommende Veranstaltungen an – alles an einem Ort.</p>
        </div></div></div>
      </section>

      <section className="bg-light">
        <div className="container" style={{ maxWidth: "920px" }}>

          {!supabaseConfigured ? (
            <div className="card"><h3>Supabase noch nicht verbunden</h3>
              <p>Trage in den Umgebungsvariablen <code>NEXT_PUBLIC_SUPABASE_URL</code> und <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ein (siehe README), dann funktioniert das Login.</p>
            </div>
          ) : loading ? (
            <p>Lädt …</p>
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
                    {resetMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{resetMsg}</p> : null}
                    <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>Anmelden</button>
                  </form>
                  <p style={{ fontSize: "13px", color: "var(--text-soft)", marginTop: "12px" }}>
                    <button type="button" className="link-btn" onClick={passwortReset}>Passwort vergessen?</button>
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
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span className="section-label">Eingeloggt{isAdmin ? " · Admin" : ""}</span>
                  <strong style={{ color: "var(--navy)", fontSize: "18px" }}>{session.user.email}</strong>
                </div>
                <button className="btn btn-outline" onClick={logout} style={{ borderColor: "var(--navy)", color: "var(--navy)", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Abmelden
                </button>
              </div>

              {/* Sektions-Navigation */}
              <nav className="pp-nav">
                {[
                  !isAdmin && { href: "#abschnitt-dashboard", label: "Dashboard" },
                  { href: "#abschnitt-stellen", label: "Stellen" },
                  !isAdmin && { href: "#abschnitt-nestplay", label: "NESTplay" },
                  { href: "#abschnitt-messe", label: "Messe" },
                  { href: "#abschnitt-team", label: "Ansprechpartner" },
                  { href: "#abschnitt-veranstaltungen", label: "Veranstaltungen" },
                  { href: "#abschnitt-infos", label: "Infos" },
                  { href: "#abschnitt-konto", label: "Konto" },
                  isAdmin && { href: "#abschnitt-admin", label: "Admin" },
                ].filter(Boolean).map((n) => (
                  <a key={n.href} href={n.href} className="pp-nav-link">{n.label}</a>
                ))}
              </nav>

              {/* Konto & Zugang */}
              <div id="abschnitt-konto" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              <div style={{ marginBottom: "36px" }}>
                <span className="section-label">Konto</span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 14px" }}>Konto &amp; Zugang</h3>
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
              </div>

              <div id="abschnitt-dashboard" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* Dashboard – Kennzahlen im Vergleich */}
              {!isAdmin && (() => {
                const aktive = stellen.filter((s) => { const r = tageRestStelle(s.aktiviert_am); return r != null && r >= 0; });
                const restWerte = aktive.map((s) => tageRestStelle(s.aktiviert_am));
                const minRest = restWerte.length ? Math.min(...restWerte) : null;
                const a = ampelStatus(minRest);
                const pct = (mine, total) => (total > 0 ? Math.min(100, Math.round((mine / total) * 100)) : 0);
                return (
                  <div style={{ marginBottom: "36px" }}>
                    <span className="section-label">Übersicht</span>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 4px" }}>Dein Dashboard im Vergleich</h3>
                    <p style={{ color: "var(--text-soft)", fontSize: "14px", margin: "0 0 18px" }}>Deine wichtigsten Kennzahlen – direkt im Vergleich zum gesamten NEST-Netzwerk.</p>
                    <div className="dash-grid">
                      {/* NESTplay-Spiele */}
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <div className="dash-ic dash-ic--play">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="12" r="1"/><circle cx="18" cy="10" r="1"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
                          </div>
                          {nestplayConfigured
                            ? <span className="dash-live"><i></i>NESTplay verbunden</span>
                            : <span className="dash-off">nicht verbunden</span>}
                        </div>
                        <div className="dash-compare">
                          <div><div className="dash-num">{nestplaySpiele}</div><div className="dash-sub">deine</div></div>
                          <div className="dash-vs">/</div>
                          <div><div className="dash-num dash-num--muted">{netzSpiele}</div><div className="dash-sub">Netzwerk</div></div>
                        </div>
                        <div className="dash-bar"><span style={{ width: pct(nestplaySpiele, netzSpiele) + "%" }}></span></div>
                        <div className="dash-lbl">NESTplay-Spiele online</div>
                      </div>
                      {/* Aktuelle Stellen */}
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <div className="dash-ic dash-ic--job">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                          </div>
                        </div>
                        <div className="dash-compare">
                          <div><div className="dash-num">{aktive.length}</div><div className="dash-sub">deine</div></div>
                          <div className="dash-vs">/</div>
                          <div><div className="dash-num dash-num--muted">{netzStellen}</div><div className="dash-sub">Netzwerk</div></div>
                        </div>
                        <div className="dash-bar dash-bar--gold"><span style={{ width: pct(aktive.length, netzStellen) + "%" }}></span></div>
                        <div className="dash-lbl">Aktuelle Stellen online</div>
                      </div>
                      {/* Restlaufzeit + Ampelsystem */}
                      <div className={"dash-card dash-card--ampel " + a.cls}>
                        <div className="dash-card-top">
                          <div className="dash-ic dash-ic--time">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </div>
                          <span className={"ampel-badge " + a.cls}><i className="ampel-dot"></i>{a.text}</span>
                        </div>
                        <div className="dash-num">{minRest == null ? "–" : minRest + (minRest === 1 ? " Tag" : " Tage")}</div>
                        <div className="dash-sub">Restlaufzeit deiner nächsten Stelle</div>
                        <div className="ampel-legend" style={{ marginTop: "12px" }}>
                          <span><i className="ampel-dot ampel-gruen"></i> mehr als 10 Tage</span>
                          <span><i className="ampel-dot ampel-gelb"></i> 4–10 Tage</span>
                          <span><i className="ampel-dot ampel-rot"></i> 3 Tage oder weniger</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Neue Stelle */}
              <div className="card" style={{ marginBottom: "28px" }} id="abschnitt-stellen">
                <h3>{form.id ? "Stelle bearbeiten" : "Neue Ausbildungsstelle veröffentlichen"}</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "14px", marginBottom: "16px" }}>{form.id ? "Änderungen werden sofort übernommen." : "Erscheint auf der Berufswelt – automatisch 30 Tage sichtbar."}</p>
                <form onSubmit={speichern} className="tb-form">
                  <div className="row2">
                    <div className="field"><label>Unternehmen *</label><input value={form.firma} onChange={set("firma")} required /></div>
                    <div className="field"><label>Beruf *</label><input value={form.beruf} onChange={set("beruf")} placeholder="z. B. Mechatroniker:in" required /></div>
                  </div>
                  <div className="row2">
                    <div className="field"><label>Art</label>
                      <select value={form.art} onChange={set("art")}><option>Ausbildung</option><option>Duales Studium</option><option>Praktikum</option><option>Freiwilligendienst</option></select>
                    </div>
                    <div className="field"><label>Standort</label>
                      <select value={form.ort} onChange={set("ort")}><option>Wuppertal</option><option>Essen</option></select>
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
                    {form.id ? <button type="button" className="btn btn-outline" onClick={() => { setForm((f) => ({ ...LEER, firma: f.firma })); setMsg(""); }}>Abbrechen</button> : null}
                  </div>
                </form>
              </div>

              {/* Eigene Stellen */}
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Deine Stellen ({stellen.length})</h3>
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
              ) : <p style={{ color: "var(--text-soft)", marginBottom: "28px" }}>Du hast noch keine Stellen veröffentlicht.</p>}

              <div id="abschnitt-nestplay" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* Deine NESTplay-Spiele (Live-Anbindung an nest-play.de) */}
              {!isAdmin && (() => {
                const firma = (stellen[0] && stellen[0].firma) || form.firma || "";
                return (
                  <div style={{ marginBottom: "36px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                      <div>
                        <span className="section-label">NESTplay</span>
                        <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 4px" }}>Deine NESTplay-Spiele</h3>
                      </div>
                      <a className="btn btn-outline" href={NESTPLAY_URL} target="_blank" rel="noopener">Zu NESTplay ↗</a>
                    </div>
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

              {/* NESTplay Promo für Partner */}
              {!isAdmin && (
                <div className="np-promo" style={{ marginTop: "28px" }}>
                  <div className="np-promo-text">
                    <span className="np-promo-label">Für Unternehmen</span>
                    <div className="np-promo-h">NESTplay. – dein Betrieb<br /><em>im Unterricht</em></div>
                    <p className="np-promo-p">Präsentiere deinen Betrieb direkt in der Klasse als interaktives Live-Quiz. Schüler:innen spielen in Echtzeit – und erinnern sich nachhaltig an dein Unternehmen.</p>
                    <a href="https://nestplay.de" target="_blank" rel="noopener" className="btn btn-primary" style={{ display: "inline-flex" }}>Zu NESTplay. →</a>
                  </div>
                  <div className="np-promo-phone">
                    <div className="np-mini-phone">
                      <div className="np-phone-screen">
                        <div className="np-phone-head" style={{ padding: "22px 12px 12px" }}>
                          <div className="np-phone-pl">NESTplay · Frage 3/5</div>
                          <div className="np-phone-h4">Dein Unternehmen</div>
                        </div>
                        <div className="np-phone-body" style={{ padding: "10px" }}>
                          <div className="np-phone-q">Wie viele Azubis startet euer Betrieb pro Jahr?</div>
                          <div className="np-phone-opts">
                            <div className="np-phone-opt np-o-a">2–3</div>
                            <div className="np-phone-opt np-o-b">5–8</div>
                            <div className="np-phone-opt np-o-c">10–15</div>
                            <div className="np-phone-opt np-o-d">20+</div>
                          </div>
                          <div style={{ background: "var(--navy)", padding: "8px 10px", display: "flex", justifyContent: "space-between", marginTop: "8px", borderRadius: "6px" }}>
                            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}>Team Adler</span>
                            <b style={{ fontSize: "11px", color: "#EFA500", fontWeight: 900 }}>40 Pkt.</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div id="abschnitt-messe" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* NEST Explore (Messe) – Promo-Mockup + kommende Termine */}
              {!isAdmin && (
                <div className="np-promo" style={{ marginTop: "36px" }}>
                  <div className="np-promo-text">
                    <span className="np-promo-label">Für Unternehmen</span>
                    <div className="np-promo-h">NEST Explore – die Messe<br /><em>kommt in die Schule</em></div>
                    <p className="np-promo-p">Trefft motivierte Schüler:innen direkt vor Ort – unsere Ausbildungsmesse bringt euch persönlich mit Schulklassen zusammen, komplett von NEST organisiert.</p>
                    <a href="https://nest-messe.de" target="_blank" rel="noopener" className="btn btn-primary" style={{ display: "inline-flex" }}>Zu NEST Explore →</a>
                  </div>
                  <div className="np-promo-phone">
                    <div className="np-mini-phone">
                      <div className="np-phone-screen">
                        <div className="np-phone-head" style={{ padding: "22px 12px 12px" }}>
                          <div className="np-phone-pl">NEST Explore · Terminkalender</div>
                          <div className="np-phone-h4">Schul-Termine</div>
                        </div>
                        <div className="np-phone-body" style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "7px" }}>
                          <div style={{ background: "#fff", borderRadius: "6px", padding: "7px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "9.5px", fontWeight: 700, color: "var(--navy)" }}>Gesamtschule Barmen</span>
                            <b style={{ fontSize: "9px", color: "var(--gold-dark)", fontWeight: 900 }}>08. Apr</b>
                          </div>
                          <div style={{ background: "#fff", borderRadius: "6px", padding: "7px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "9.5px", fontWeight: 700, color: "var(--navy)" }}>Berufskolleg Elberfeld</span>
                            <b style={{ fontSize: "9px", color: "var(--gold-dark)", fontWeight: 900 }}>22. Apr</b>
                          </div>
                          <div style={{ background: "var(--navy)", borderRadius: "6px", padding: "7px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)" }}>Realschule Vohwinkel</span>
                            <b style={{ fontSize: "9px", color: "#EFA500", fontWeight: 900 }}>13. Mai</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Kommende Messetermine (NEST Explore) */}
              <div style={{ marginTop: "36px" }}>
                <span className="section-label">NEST Explore</span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 14px" }}>Kommende Messetermine</h3>
                {messeTermine.length ? (
                  <div className="messe-termine">
                    {messeTermine.map((m) => (
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
                        <a className="btn btn-outline" href="https://nest-messe.de/terminkalender" target="_blank" rel="noopener">Details ↗</a>
                      </div>
                    ))}
                  </div>
                ) : <p style={{ color: "var(--text-soft)" }}>Aktuell sind keine Messetermine eingetragen.</p>}
              </div>

              <div id="abschnitt-team" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* Ansprechpartner */}
              <div style={{ marginBottom: "36px" }}>
                <span className="section-label">Für euch da</span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 18px" }}>Ansprechpartner</h3>
                <div className="ap-grid">
                  {(ansprechpartner.length ? ansprechpartner : AP_DEFAULT).map((ap) => (
                    <div className="ap-card" key={ap.id || ap.email}>
                      {ap.bild_url ? <img className="ap-photo" src={ap.bild_url} alt={ap.name} /> : null}
                      <div className="ap-body">
                        {ap.rolle ? <div className="ap-topic">{ap.rolle}</div> : null}
                        <div className="ap-name">{ap.name}</div>
                        {ap.beschreibung ? <p style={{ fontSize: "13px", color: "var(--text-soft)", margin: "0 0 8px" }}>{ap.beschreibung}</p> : null}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {ap.standort ? <span style={{ fontSize: "13px", color: "var(--text-soft)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {ap.standort}
                          </span> : null}
                          {ap.email ? <a href={`mailto:${ap.email}`} style={{ fontSize: "13px", color: "var(--navy)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            {ap.email}
                          </a> : null}
                          {ap.telefon ? <a href={`tel:${ap.telefon.replace(/\s/g, "")}`} style={{ fontSize: "13px", color: "var(--navy)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            {ap.telefon}
                          </a> : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="abschnitt-veranstaltungen" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* Kommende Veranstaltungen (für alle) */}
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Kommende Veranstaltungen</h3>
              {events.length ? (
                <div className="card-grid cols-2">
                  {events.map((v) => (
                    <div className="card" key={v.id}>
                      <span className="num-label">{v.datum}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                      <h3>{v.titel}</h3>
                      <p style={{ color: "var(--text-soft)" }}>{v.ort}</p>
                      {v.beschreibung ? <p>{v.beschreibung}</p> : null}
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: "var(--text-soft)" }}>Aktuell sind keine Veranstaltungen eingetragen.</p>}

              <div id="abschnitt-infos" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* Filterbarer Info-Bereich */}
              <div style={{ marginTop: "36px", marginBottom: "12px" }}>
                <span className="section-label">Infos für Partner</span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 16px" }}>Alles auf einen Blick</h3>
                <div className="info-filter-row">
                  {["Alle", "Kooperation", "NESTplay", "Messe"].map((f) => (
                    <button key={f} className={"info-filter-btn" + (infoFilter === f ? " active" : "")} onClick={() => setInfoFilter(f)}>{f}</button>
                  ))}
                </div>
                <div className="info-card-grid">
                  {INFO_CARDS.filter((c) => infoFilter === "Alle" || c.kat === infoFilter).map((c) => {
                    const cfg = KAT_CFG[c.kat] || {};
                    return (
                      <div className={"info-card " + (cfg.cls || "")} key={c.titel}>
                        <div className="info-card-hd">
                          <div className="info-card-hd-icon">{cfg.icon}</div>
                          <span className="info-card-hd-label">{c.kat}</span>
                        </div>
                        <div className="info-card-body-wrap">
                          <div className="info-card-title">{c.titel}</div>
                          <p className="info-card-text">{c.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div id="abschnitt-admin" style={{ scrollMarginTop: "84px" }} aria-hidden="true"></div>
              {/* =================== ADMIN-BEREICH =================== */}
              {isAdmin && (
                <div style={{ marginTop: "44px", borderTop: "2px solid var(--line)", paddingTop: "32px" }}>
                  <span className="section-label">Nur für Admins</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "var(--navy)", margin: "4px 0 22px" }}>Admin-Bereich</h2>

                  {/* Auslastung der nächsten Termine */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Auslastung der nächsten Termine</h3>
                  {(() => {
                    const termine = naechsteTermine(8);
                    const zaehl = {};
                    buchungen.forEach((b) => { if (b.datum) { const k = b.standort + "|" + b.datum; zaehl[k] = (zaehl[k] || 0) + 1; } });
                    return (
                      <div className="card-grid cols-2" style={{ marginBottom: "32px" }}>
                        {["Wuppertal", "Essen"].map((ort) => (
                          <div className="card" key={ort}>
                            <span className="badge">{ort} · max. {KAPAZITAET[ort]}/Tag</span>
                            <div style={{ marginTop: "12px" }}>
                              {termine.map((d) => {
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
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>Terminbuchungen ({buchungenAktiv.length})</h3>
                  {buchungenAktiv.length ? (() => {
                    const groups = {};
                    buchungenAktiv.forEach((bu) => {
                      const k = bu.standort + "|" + (bu.datum || bu.datum_text || "");
                      (groups[k] = groups[k] || []).push(bu);
                    });
                    const keys = Object.keys(groups).sort((a, b) => {
                      const da = groups[a][0].datum || "", db = groups[b][0].datum || "";
                      return db.localeCompare(da);
                    });
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        {keys.map((k) => {
                          const list = groups[k];
                          const first = list[0];
                          const cap = KAPAZITAET[first.standort] || 0;
                          const voll = cap && list.length >= cap;
                          return (
                            <div className="card" key={k} style={{ marginBottom: "16px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", borderBottom: "2px solid var(--line)", paddingBottom: "10px", marginBottom: "10px" }}>
                                <h3 style={{ margin: 0 }}>{first.datum_text || first.datum} · {first.standort}</h3>
                                <span style={{ fontWeight: 800, color: voll ? "#c2415a" : "var(--gold-dark)" }}>{list.length}{cap ? "/" + cap : ""} belegt{voll ? " · ausgebucht" : ""}</span>
                              </div>
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
                            </div>
                          );
                        })}
                      </div>
                    );
                  })() : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Keine anstehenden Terminbuchungen.</p>}
                  </>);
                  })()}

                  {/* Ansprechpartner verwalten */}
                  <div className="card" style={{ marginBottom: "24px" }}>
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
                        <div className="field"><label>Standort</label><input value={apForm.standort} onChange={apSet("standort")} placeholder="z. B. Wuppertal" /></div>
                        <div className="field"><label>Reihenfolge</label><input type="number" value={apForm.sortierung} onChange={apSet("sortierung")} /></div>
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
                            {ap.bild_url ? <img src={ap.bild_url} alt={ap.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "50%", flexShrink: 0 }} /> : null}
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
                  ) : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Ansprechpartner angelegt – es werden die Standard-Kontakte angezeigt.</p>}

                  {/* Veranstaltung anlegen */}
                  <div className="card" style={{ marginBottom: "24px" }}>
                    <h3>Veranstaltung anlegen</h3>
                    <form onSubmit={eventSpeichern} className="tb-form">
                      <div className="row2">
                        <div className="field"><label>Titel *</label><input value={evForm.titel} onChange={setEv("titel")} placeholder="z. B. OpenHouse Wuppertal" required /></div>
                        <div className="field"><label>Datum *</label><input type="date" value={evForm.datum} onChange={setEv("datum")} required /></div>
                      </div>
                      <div className="row2">
                        <div className="field"><label>Uhrzeit</label><input value={evForm.uhrzeit} onChange={setEv("uhrzeit")} placeholder="z. B. 17:00–19:00" /></div>
                        <div className="field"><label>Ort</label>
                          <select value={evForm.ort} onChange={setEv("ort")}><option>Wuppertal</option><option>Essen</option><option>Online</option></select>
                        </div>
                      </div>
                      <div className="field"><label>Beschreibung</label><textarea value={evForm.beschreibung} onChange={setEv("beschreibung")} placeholder="Kurzbeschreibung (optional)"></textarea></div>
                      {evMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{evMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Veranstaltung speichern</button>
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
                          <span className="num-label">{v.datum}{v.uhrzeit ? " · " + v.uhrzeit : ""}</span>
                          <h3>{v.titel}</h3>
                          <p style={{ color: "var(--text-soft)" }}>{v.ort}</p>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                            <button className="btn btn-outline" style={{ padding: "6px 14px" }} onClick={() => linkKopieren("/veranstaltungen/" + v.id)}>Link kopieren</button>
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
                                <span style={{ fontWeight: 800, color: "var(--gold-dark)" }}>{list.length} {list.length === 1 ? "Unternehmen" : "Unternehmen"} · {personen} {personen === 1 ? "Person" : "Personen"}</span>
                              </div>
                              {list.map((a) => (
                                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                                  <div>
                                    <p style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--navy)" }}>{a.firma} <span style={{ fontWeight: 600, color: "var(--text-mute)" }}>· {a.personen || 1} {(a.personen || 1) === 1 ? "Person" : "Personen"}</span></p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "var(--text-soft)" }}>
                                      {a.name}{a.email ? <> · <a href={`mailto:${a.email}`}>{a.email}</a></> : ""}{a.telefon ? <> · <a href={`tel:${a.telefon}`}>{a.telefon}</a></> : ""}
                                    </p>
                                    {a.nachricht ? <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-soft)" }}>„{a.nachricht}"</p> : null}
                                  </div>
                                  <button className="btn btn-danger" style={{ flexShrink: 0, alignSelf: "flex-start" }} onClick={() => anmeldungLoeschen(a.id, a.firma)}>Löschen</button>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })() : <p style={{ color: "var(--text-soft)", marginBottom: "32px" }}>Noch keine Anmeldungen von Unternehmen.</p>}

                  {/* Blogbeitrag anlegen */}
                  <div className="card" style={{ marginBottom: "24px" }}>
                    <h3>Blogbeitrag anlegen</h3>
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
                      <div className="field"><label>Inhalt (HTML)</label><textarea value={poForm.inhalt} onChange={setPo("inhalt")} placeholder="<p>Dein Beitrag …</p>" style={{ minHeight: "140px" }}></textarea></div>
                      <label className="tb-check"><input type="checkbox" checked={poForm.published} onChange={setPo("published")} /> Sofort veröffentlichen</label>
                      {poMsg ? <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "14px" }}>{poMsg}</p> : null}
                      <button className="btn btn-primary" type="submit">Beitrag speichern</button>
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
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                            <a className="btn btn-outline" href={`/blog/${p.slug}`} target="_blank" rel="noopener">Ansehen</a>
                            <button className="btn btn-danger" onClick={() => postLoeschen(p.id, p.titel)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: "var(--text-soft)" }}>Noch keine Beiträge.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {toastMsg ? <div className="pp-toast" role="status">{toastMsg}</div> : null}
    </div>
  );
}
