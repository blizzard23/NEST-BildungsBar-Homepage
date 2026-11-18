// Erzeugt den Partner-Flyer als PDF (DIN A4, Vorder- und Rückseite).
// Aufruf aus dem Projektordner:  node flyer/build-pdf.js
// Optional PNG-Vorschau je Seite: node flyer/build-pdf.js --preview <ordner>
// Benötigt Playwright mit Chromium (npm i -D playwright && npx playwright install chromium).
const path = require("path");
const { chromium } = require("playwright");

const SRC = path.join(__dirname, "nest-partnerschaft-flyer.html");
const OUT = path.join(__dirname, "..", "public", "broschueren", "nest-partnerschaft-flyer.pdf");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + SRC, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, format: "A4", printBackground: true, preferCSSPageSize: true });

  const i = process.argv.indexOf("--preview");
  if (i > -1) {
    const dir = process.argv[i + 1] || __dirname;
    await page.setViewportSize({ width: 794, height: 1123 });
    const pages = await page.$$(".page");
    for (let n = 0; n < pages.length; n++) {
      await pages[n].screenshot({ path: path.join(dir, `flyer-seite-${n + 1}.png`) });
    }
  }
  await browser.close();
  console.log("PDF geschrieben:", OUT);
})();
