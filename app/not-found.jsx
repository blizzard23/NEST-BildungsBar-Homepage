export const metadata = { title: "Seite nicht gefunden – NEST BildungsBar" };

export default function NotFound() {
  return (
    <section className="bb-sec bb-notfound">
      <div className="container">
        <div className="bb-split">
          <div>
            <p className="bb-notfound__code">Fehler 404</p>
            <h1 className="bb-h2" style={{ fontSize: "clamp(32px,4.4vw,52px)" }}>Seite nicht gefunden</h1>
            <p className="bb-lead" style={{ marginTop: "16px" }}>Diese Seite gibt es leider nicht (mehr).</p>
            <div className="bb-actions">
              <a className="bb-btn bb-btn--gold" href="/">Zur Startseite</a>
              <a className="bb-btn bb-btn--light" href="/berufswelt">Berufe entdecken</a>
            </div>
          </div>
          <div className="bb-frame bb-frame--43"><img src="/assets/img/standort-wuppertal.jpg" alt="BildungsBar Wuppertal – Innenansicht" /></div>
        </div>
      </div>
    </section>
  );
}
