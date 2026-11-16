import html from "@/content/terminbuchung";
import { whatsappKonfiguriert } from "@/lib/whatsapp";

export const metadata = { title: "Termin buchen – kostenfreie Beratung | NEST BildungsBar" };

// Die WhatsApp-Erinnerung (Checkbox + Hinweise zwischen <!--WA--> und <!--/WA-->)
// erscheint nur, wenn der WhatsApp-Versand eingerichtet ist. Nach dem Setzen der
// WHATSAPP_*-Variablen in Vercel einmal neu deployen.
const seite = whatsappKonfiguriert() ? html : html.replace(/<!--WA-->[\s\S]*?<!--\/WA-->/g, "");

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: seite }} />;
}
