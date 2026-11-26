import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { AZUBIS, systemPrompt, zugangGueltig } from "@/lib/azubiChat";
import { clientIp, rateLimitErreicht } from "@/lib/spamSchutz";

/* Azubi-Chat für Workshops: Leon und Lisa als KI-Personas.
   - nur mit dem Zugangscode aus dem Link der Profil-PDFs nutzbar (kein Login),
     zusätzlich Rate-Limit pro IP; der API-Schlüssel bleibt auf dem Server
   - Chatverläufe werden nicht gespeichert
   Antwort im selben NDJSON-Format wie der NEST-Assistent:
     {"t":"text","v":"…"} · {"t":"hinweis","v":"…"} · {"t":"fehler","v":"…"} · {"t":"ende"} */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODELL = "claude-opus-5-5";
const MAX_VERLAUF = 24;
// Pro IP in 10 Minuten. Großzügig, weil ein Workshop-Raum oft über dieselbe
// IP ins Netz geht (gemeinsames WLAN).
const LIMIT_PRO_IP = 80;

function nachricht(v) { return JSON.stringify(v) + "\n"; }

function fehler(status, text) {
  return NextResponse.json({ error: text }, { status, headers: { "Cache-Control": "no-store" } });
}

// Gesprächsverlauf aus dem Browser prüfen: abwechselnd Frage/Antwort,
// beginnt und endet mit einer Frage, Längen begrenzt. Fragen dürfen länger
// sein, damit eine Stellenanzeige hineinpasst.
function pruefeVerlauf(verlauf) {
  if (!Array.isArray(verlauf) || !verlauf.length) return null;
  const teil = verlauf.slice(-MAX_VERLAUF);
  if (teil[0]?.rolle !== "frage") teil.shift();
  const out = [];
  for (const m of teil) {
    const rolle = m?.rolle === "frage" ? "user" : m?.rolle === "antwort" ? "assistant" : null;
    const text = String(m?.text ?? "").trim();
    if (!rolle || !text) return null;
    if (out.length && out[out.length - 1].role === rolle) return null;
    out.push({ role: rolle, content: text.slice(0, 4000) });
  }
  if (!out.length || out[0].role !== "user" || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return fehler(400, "Ungültige Anfrage."); }

  if (!zugangGueltig(body?.zugang)) return fehler(403, "Dieser Link ist nicht (mehr) gültig.");
  const id = typeof body?.azubi === "string" && Object.hasOwn(AZUBIS, body.azubi) ? body.azubi : null;
  if (!id) return fehler(400, "Unbekannte Persona.");
  if (!process.env.ANTHROPIC_API_KEY) return fehler(503, "Der Chat ist noch nicht eingerichtet.");

  if (rateLimitErreicht("azubi-chat", clientIp(req), LIMIT_PRO_IP)) {
    return fehler(429, "Gerade kommen sehr viele Nachrichten auf einmal. Bitte warte ein paar Minuten und versuch es dann noch einmal.");
  }

  const messages = pruefeVerlauf(body?.verlauf);
  if (!messages) return fehler(400, "Ungültiger Gesprächsverlauf.");

  const name = AZUBIS[id].name;
  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const senden = (v) => controller.enqueue(encoder.encode(nachricht(v)));
      try {
        const antwort = client.beta.messages.stream({
          model: MODELL,
          max_tokens: 4000,
          system: [{ type: "text", text: systemPrompt(id), cache_control: { type: "ephemeral" } }],
          messages,
          // Kurze Chat-Antworten: niedrige Effort-Stufe hält die Wartezeit klein.
          output_config: { effort: "low" },
          // Lehnt ein Sicherheitsfilter ab, übernimmt automatisch ein passendes Ersatzmodell.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
        });
        for await (const ev of antwort) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            senden({ t: "text", v: ev.delta.text });
          }
        }
        const fertig = await antwort.finalMessage();
        if (fertig.stop_reason === "refusal") {
          senden({ t: "hinweis", v: `Darauf kann ${name} nicht antworten. Versuch es gern mit einer anderen Frage.` });
        } else if (fertig.stop_reason === "max_tokens") {
          senden({ t: "hinweis", v: "Die Antwort war zu lang und wurde gekürzt." });
        }
        senden({ t: "ende" });
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
          console.error("[azubi-chat] Rate-Limit", err.status, err.message);
          senden({ t: "fehler", v: "Gerade schreiben sehr viele gleichzeitig. Bitte versuch es in einer Minute noch einmal." });
        } else if (err instanceof Anthropic.APIError) {
          console.error("[azubi-chat] API-Fehler", err.status, err.message);
          senden({ t: "fehler", v: `${name} ist gerade nicht erreichbar. Bitte versuch es gleich noch einmal.` });
        } else {
          console.error("[azubi-chat] Fehler", err);
          senden({ t: "fehler", v: `${name} ist gerade nicht erreichbar. Bitte versuch es gleich noch einmal.` });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
