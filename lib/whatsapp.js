/* WhatsApp-Terminerinnerung über die WhatsApp Cloud API (Meta).

   Genutzt von:
   - app/terminbuchung/page.jsx   – blendet die Opt-in-Checkbox nur ein, wenn
                                     WhatsApp konfiguriert ist
   - app/api/buchung/route.js     – speichert den Wunsch (whatsapp_erinnerung)
   - app/api/cron/erinnerungen    – verschickt die Erinnerung am Vortag

   Benötigte Umgebungsvariablen (Vercel → Settings → Environment Variables):
   WHATSAPP_TOKEN     dauerhaftes Access-Token (System-User im Meta Business Manager)
   WHATSAPP_PHONE_ID  Telefonnummern-ID aus dem WhatsApp-Manager
   WHATSAPP_TEMPLATE  Name eines GENEHMIGTEN Templates mit genau einer Variablen {{1}}
   WHATSAPP_LANG      Sprachcode des Templates (Standard: "de")

   Fehlt eine der ersten drei, ist WhatsApp aus: keine Checkbox, nur E-Mail. */

const GRAPH_URL = "https://graph.facebook.com/v20.0";
const TIMEOUT_MS = 15000;

export function whatsappKonfiguriert() {
  return !!(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.WHATSAPP_TEMPLATE);
}

/* Telefonnummer grob nach E.164 (ohne führendes +), deutsche Nummern ohne
   Ländervorwahl werden als +49 gelesen. Liefert "" bei unbrauchbarer Nummer. */
export function normTel(t) {
  let n = String(t || "").replace(/[^\d+]/g, "");
  if (!n) return "";
  if (n.startsWith("+")) n = n.slice(1);
  else if (n.startsWith("00")) n = n.slice(2);
  else if (n.startsWith("0")) n = "49" + n.slice(1);
  return /^\d{8,15}$/.test(n) ? n : "";
}

/* Schickt das Erinnerungs-Template. `wann` landet in der Variablen {{1}},
   z. B. "Dienstag, 17. November 2026 um 17:00 Uhr in Wuppertal".
   Gibt true zurück, wenn Meta die Nachricht angenommen hat. */
export async function sendeWhatsAppErinnerung(tel, wann) {
  const to = normTel(tel);
  if (!whatsappKonfiguriert() || !to) return false;
  try {
    const res = await fetch(`${GRAPH_URL}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.WHATSAPP_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: process.env.WHATSAPP_TEMPLATE,
          language: { code: process.env.WHATSAPP_LANG || "de" },
          components: [{ type: "body", parameters: [{ type: "text", text: wann }] }],
        },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      // Häufige Ursachen: Token abgelaufen (401), Template nicht genehmigt oder
      // Variablenanzahl passt nicht (400), Nummer hat kein WhatsApp.
      const daten = await res.json().catch(() => ({}));
      console.warn("WhatsApp-Erinnerung fehlgeschlagen (" + res.status + "): " + (daten?.error?.message || "unbekannt"));
    }
    return res.ok;
  } catch (e) {
    console.warn("WhatsApp-Erinnerung nicht zugestellt: " + (e?.message || "unbekannt"));
    return false;
  }
}
