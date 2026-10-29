import { supabaseServer } from "@/lib/supabaseServer";

export const metadata = { title: "Blog & Neuigkeiten – NEST BildungsBar" };
export const revalidate = 60;

function fmtDate(d) {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }); }
  catch { return d; }
}

export default async function BlogPage() {
  let posts = [];
  const sb = supabaseServer();
  if (sb) {
    const { data } = await sb
      .from("posts")
      .select("slug,titel,excerpt,bild_url,veroeffentlicht_am")
      .eq("published", true)
      .order("veroeffentlicht_am", { ascending: false })
      .limit(3);
    posts = data || [];
  }

  return (
    <div>
      <section className="hero">
        <div className="container"><div className="hero-inner"><div className="hero-text">
          <span className="hero-badge">Aktuelles</span>
          <h1>Neuigkeiten &amp; <em>Blog</em></h1>
          <p className="lead">Themen rund um Ausbildung, Berufsorientierung und unser Netzwerk – frisch aus der BildungsBar.</p>
        </div></div></div>
      </section>

      {/* Beiträge · Vorlage: Brilliant „Blog" (Kachelbild, Datum, Titel, Anriss) */}
      <section className="bb-sec">
        <div className="container">
          {posts.length ? (
            <>
              <div className="bb-head">
                <h2 className="bb-h2">Neueste Beiträge</h2>
              </div>
              <div className="bb-cards bb-cards--3 bb-posts">
                {posts.map((p) => (
                  <a key={p.slug} className="bb-card" href={`/blog/${p.slug}`}>
                    <span className="bb-card__tile bb-tile">
                      {p.bild_url ? <img src={p.bild_url} alt={p.titel} /> : <span className="bb-posts__ph" aria-hidden="true">NEST</span>}
                    </span>
                    <span className="bb-posts__date">{fmtDate(p.veroeffentlicht_am)}</span>
                    <span className="bb-card__title">{p.titel}</span>
                    {p.excerpt ? <span className="bb-card__meta">{p.excerpt}</span> : null}
                    <span className="bb-link bb-card__link">Weiterlesen</span>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="bb-tile bb-empty">
              <h2 className="bb-h3">Noch keine Beiträge</h2>
              <p className="bb-p">Sobald im Supabase-Backend Beiträge angelegt sind, erscheinen sie hier automatisch.</p>
              <div className="bb-actions"><a className="bb-btn bb-btn--light" href="/berufswelt">Berufe entdecken</a></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
