// Gemeinsam genutzt vom NEST-Assistenten im Partner-Login und vom Azubi-Chat.

// **fett** innerhalb einer Zeile
function inline(text, schluessel) {
  const teile = String(text).split(/(\*\*[^*]+\*\*)/g);
  return teile.map((t, i) =>
    /^\*\*[^*]+\*\*$/.test(t) ? <strong key={schluessel + "-" + i}>{t.slice(2, -2)}</strong> : <span key={schluessel + "-" + i}>{t}</span>
  );
}

/* Antworttext eines Chats ohne HTML-Einschleusung darstellen:
   Absätze, Aufzählungen mit „-“ oder „•“, nummerierte Listen und **fett**. */
export function FormatierterText({ text }) {
  const bloecke = [];
  let liste = null;
  String(text || "").split(/\n/).forEach((zeile) => {
    const z = zeile.trimEnd();
    const punkt = z.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)$/);
    if (punkt) {
      if (!liste) { liste = { art: /^\s*\d/.test(z) ? "ol" : "ul", punkte: [] }; bloecke.push(liste); }
      liste.punkte.push(punkt[1]);
      return;
    }
    liste = null;
    if (!z.trim()) { bloecke.push(null); return; }
    const letzter = bloecke[bloecke.length - 1];
    if (letzter && letzter.art === "p") letzter.zeilen.push(z);
    else bloecke.push({ art: "p", zeilen: [z] });
  });
  return (
    <>
      {bloecke.filter(Boolean).map((b, i) => {
        if (b.art === "p") {
          return <p key={i}>{b.zeilen.map((z, j) => <span key={j}>{j ? <br /> : null}{inline(z, i + "-" + j)}</span>)}</p>;
        }
        const Tag = b.art;
        return <Tag key={i}>{b.punkte.map((p, j) => <li key={j}>{inline(p, i + "-" + j)}</li>)}</Tag>;
      })}
    </>
  );
}
