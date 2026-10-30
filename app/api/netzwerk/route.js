import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendeMail, mailKonfiguriert, absender, empfaengerTeam } from "@/lib/mailer";

/* „An Netzwerk weitergeben" und „Erfahrung teilen" im Partner-Login.
   Gespeichert wird über die Datenbankfunktionen im Namen des angemeldeten
   Betriebs (Prüfung von Partner-Status, Empfängern und Anonymität dort);
   diese Route verschickt danach die Benachrichtigungen.
     aktion "frage"       Partner fragt  -> Mail an NEST
     aktion "weitergeben" NEST wählt Betriebe -> Mail an jeden neuen Empfänger
     aktion "antwort"     Betrieb antwortet  -> Mail an den Fragenden (+ NEST)
     aktion "erfahrung"   Partner hat Wissen eingereicht -> Mail an NEST */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PORTAL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nest-bildungsbar.de").replace(/\/$/, "") + "/partner-portal";

function clean(v, max) { return String(v == null ? "" : v).trim().slice(0, max); }
function antwort(status, daten) { return NextResponse.json(daten, { status }); }

const MELDUNGEN = {
  kein_partner: [401, "Bitte melde dich an."],
  kein_admin: [403, "Nur für das NEST-Team."],
  limit_erreicht: [429, "Ihr habt heute schon viele Fragen ans Netzwerk gestellt. Bitte versucht es morgen wieder."],
  nicht_empfaenger: [403, "Diese Frage wurde nicht an euch weitergegeben."],
  frage_unbekannt: [404, "Die Frage gibt es nicht mehr."],
};
function dbFehler(err, wo) {
  const treffer = Object.keys(MELDUNGEN).find((k) => (err?.message || "").includes(k));
  if (treffer) return antwort(MELDUNGEN[treffer][0], { error: MELDUNGEN[treffer][1] });
  console.error("[netzwerk] " + wo, err);
  return antwort(500, { error: "Das hat gerade nicht geklappt. Bitte versucht es später noch einmal." });
}

async function mailen(mail, wo) {
  if (!mailKonfiguriert()) { console.warn("[netzwerk] Mailversand nicht konfiguriert – " + wo); return false; }
  try { await sendeMail({ from: absender("NEST Partner-Login"), ...mail }); return true; }
  catch (err) { console.error("[netzwerk] Mail " + wo, err); return false; }
}

export async function POST(req) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return antwort(503, { error: "Supabase ist nicht konfiguriert." });

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return antwort(401, { error: "Bitte melde dich an." });
  let body;
  try { body = await req.json(); } catch { return antwort(400, { error: "Ungültige Anfrage." }); }

  const sb = createClient(url, anon, {
    auth: { persistSession: false },
    global: {
      headers: { Authorization: `Bearer ${token}` },
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
  const { data: nutzer, error: authFehler } = await sb.auth.getUser(token);
  if (authFehler || !nutzer?.user) return antwort(401, { error: "Deine Anmeldung ist abgelaufen. Bitte melde dich neu an." });
  const user = nutzer.user;
  const firma = (user.user_metadata?.firma || "").trim() || user.email;

  switch (body?.aktion) {
    case "frage": {
      const frage = clean(body.frage, 2000);
      const ergaenzung = clean(body.ergaenzung, 2000);
      if (frage.length < 5) return antwort(400, { error: "Bitte formuliert eure Frage etwas ausführlicher." });
      const { data: id, error } = await sb.rpc("netzwerk_frage_stellen", { p_frage: frage, p_ergaenzung: ergaenzung || null });
      if (error) return dbFehler(error, "frage");
      await mailen({
        to: empfaengerTeam(),
        replyTo: user.email,
        subject: "Neue Frage ans Netzwerk – " + firma,
        text: [
          "Ein Partnerbetrieb hat eine Frage ans Netzwerk weitergegeben:", "",
          "Unternehmen: " + firma,
          "E-Mail: " + user.email, "",
          "Frage:", frage,
          ergaenzung ? "\nErgänzung:\n" + ergaenzung : "", "",
          "Im Partner-Login (Admin-Bereich „Fragen ans Netzwerk“) könnt ihr die Frage bearbeiten und an passende Betriebe weitergeben:",
          PORTAL + "#abschnitt-admin-netzwerk",
        ].join("\n"),
      }, "frage");
      return antwort(200, { ok: true, id });
    }

    case "weitergeben": {
      const text = clean(body.text, 4000);
      const empfaenger = Array.isArray(body.empfaenger) ? body.empfaenger.filter((x) => typeof x === "string").slice(0, 50) : [];
      if (!body.frage_id || !empfaenger.length) return antwort(400, { error: "Bitte wählt mindestens einen Betrieb aus." });
      const { data: neu, error } = await sb.rpc("netzwerk_weitergeben", { p_frage_id: body.frage_id, p_text: text || null, p_empfaenger: empfaenger });
      if (error) return dbFehler(error, "weitergeben");
      let fragetext = text;
      if (!fragetext) {
        const { data: f } = await sb.from("netzwerk_fragen").select("frage").eq("id", body.frage_id).maybeSingle();
        fragetext = f?.frage || "";
      }
      let gemailt = 0;
      for (const e of neu || []) {
        if (!e.email) continue;
        const ok = await mailen({
          to: e.email,
          replyTo: empfaengerTeam(),
          subject: "Eine Frage aus dem NEST-Netzwerk an euch",
          text: [
            "Hallo" + (e.firma ? " " + e.firma : "") + ",", "",
            "ein Partnerbetrieb aus dem NEST-Netzwerk hat eine Frage gestellt, bei der ihr mit eurer Erfahrung weiterhelfen könnt:", "",
            fragetext, "",
            "Ihr könnt direkt im Partner-Login antworten. Der fragende Betrieb bleibt anonym; ob euer Firmenname bei der Antwort erscheint, entscheidet ihr selbst.",
            PORTAL + "#abschnitt-netzwerk", "",
            "Danke, dass ihr euer Wissen teilt!",
            "Euer Team der NEST BildungsBar",
          ].join("\n"),
        }, "weitergeben");
        if (ok) gemailt++;
      }
      return antwort(200, { ok: true, neu: (neu || []).length, gemailt });
    }

    case "antwort": {
      const text = clean(body.antwort, 4000);
      if (!body.frage_id || text.length < 5) return antwort(400, { error: "Bitte schreibt eine Antwort." });
      const { data, error } = await sb.rpc("netzwerk_antwort_geben", {
        p_frage_id: body.frage_id, p_antwort: text,
        p_name_zeigen: body.name_zeigen !== false, p_fuer_assistent: body.fuer_assistent === true,
      });
      if (error) return dbFehler(error, "antwort");
      const info = Array.isArray(data) ? data[0] : data;
      if (info?.neu && info.fragender_email) {
        await mailen({
          to: info.fragender_email,
          replyTo: empfaengerTeam(),
          subject: "Neue Antwort auf eure Frage ans Netzwerk",
          text: [
            "Hallo,", "",
            "auf eure Frage ans NEST-Netzwerk ist eine Antwort eingegangen:", "",
            "„" + info.frage + "“", "",
            "Ihr findet sie im Partner-Login unter „Fragen ans Netzwerk“:",
            PORTAL + "#abschnitt-netzwerk", "",
            "Euer Team der NEST BildungsBar",
          ].join("\n"),
        }, "antwort");
      }
      if (info?.neu) {
        await mailen({
          to: empfaengerTeam(),
          subject: "Antwort aus dem Netzwerk – " + firma,
          text: [
            firma + " hat auf eine Frage aus dem Netzwerk geantwortet" + (body.fuer_assistent === true ? " und erlaubt, die Antwort anonym in den Assistenten zu übernehmen" : "") + ".", "",
            "Frage: " + (info.frage || ""), "",
            "Antwort:", text, "",
            PORTAL + "#abschnitt-admin-netzwerk",
          ].join("\n"),
        }, "antwort-team");
      }
      return antwort(200, { ok: true });
    }

    case "erfahrung": {
      if (!body.id) return antwort(400, { error: "Ungültige Anfrage." });
      // Nur der eigene Eintrag ist per RLS sichtbar – so lässt sich keine fremde Mail auslösen.
      const { data: w, error } = await sb.from("assistent_wissen").select("titel, inhalt, kategorie, anonym").eq("id", body.id).maybeSingle();
      if (error) return dbFehler(error, "erfahrung");
      if (!w) return antwort(404, { error: "Eintrag nicht gefunden." });
      await mailen({
        to: empfaengerTeam(),
        replyTo: user.email,
        subject: "Neue Erfahrung zur Freigabe – " + firma,
        text: [
          firma + " hat eine Erfahrung für den Assistenten eingereicht (" + (w.anonym ? "anonym" : "mit Firmennamen") + "):", "",
          "Thema: " + w.kategorie,
          "Titel: " + w.titel, "",
          w.inhalt, "",
          "Freigeben oder bearbeiten im Partner-Login (Admin-Bereich „Wissen für den Assistenten“):",
          PORTAL + "#abschnitt-admin-wissen",
        ].join("\n"),
      }, "erfahrung");
      return antwort(200, { ok: true });
    }

    default:
      return antwort(400, { error: "Unbekannte Aktion." });
  }
}
