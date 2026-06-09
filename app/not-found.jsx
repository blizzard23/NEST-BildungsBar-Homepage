export const metadata = { title: "Seite nicht gefunden – NEST BildungsBar" };

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container" style={{ textAlign: "center", padding: "80px 0" }}>
        <span className="section-label" style={{ display: "block" }}>404</span>
        <h1 style={{ color: "var(--navy)", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800 }}>Seite nicht gefunden</h1>
        <p style={{ color: "var(--text-soft)", margin: "12px 0 24px" }}>Diese Seite gibt es leider nicht (mehr).</p>
        <a className="btn btn-primary" href="/">Zur Startseite</a>
      </div>
    </section>
  );
}
