// Wandelt den Blog-Inhalt in HTML um.
// - Enthält der Text bereits HTML-Blöcke (<p>, <h2>, <ul> …), wird er unverändert übernommen.
// - Sonst wird einfache Formatierung unterstützt:
//   Leerzeile = neuer Absatz, ## Überschrift, ### Zwischenüberschrift,
//   **fett**, *kursiv*, "- " Aufzählung, [Text](https://link)

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  return out;
}

export function inhaltZuHtml(text) {
  const t = String(text || "").trim();
  if (!t) return "";
  if (/<\s*(p|h[1-6]|ul|ol|li|div|br|img|blockquote|table)\b/i.test(t)) return t;

  const bloecke = t.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const html = [];
  bloecke.forEach((block) => {
    const zeilen = block.split("\n").map((z) => z.trim()).filter(Boolean);
    if (!zeilen.length) return;
    // Reiner Listen-Block
    if (zeilen.every((z) => /^[-*•]\s+/.test(z))) {
      html.push("<ul>" + zeilen.map((z) => "<li>" + inline(z.replace(/^[-*•]\s+/, "")) + "</li>").join("") + "</ul>");
      return;
    }
    // Gemischter Block: Überschriften einzeln, Rest als Absatz (Zeilenumbruch = <br>)
    let absatz = [];
    const flush = () => { if (absatz.length) { html.push("<p>" + absatz.map(inline).join("<br />") + "</p>"); absatz = []; } };
    zeilen.forEach((z) => {
      const h3 = z.match(/^###\s+(.*)/);
      const h2 = h3 ? null : z.match(/^##\s+(.*)/);
      if (h3) { flush(); html.push("<h3>" + inline(h3[1]) + "</h3>"); }
      else if (h2) { flush(); html.push("<h2>" + inline(h2[1]) + "</h2>"); }
      else absatz.push(z);
    });
    flush();
  });
  return html.join("\n");
}
