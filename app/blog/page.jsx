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
      .order("veroeffentlicht_am", { ascending: false });
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

      <section className="bg-white">
        <div className="container">
          {posts.length ? (
            <div className="card-grid cols-3">
              {posts.map((p) => (
                <a key={p.slug} className="card reveal in" href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  {p.bild_url ? (
                    <div className="beruf-thumb" style={{ borderRadius: "10px", marginBottom: "14px" }}>
                      <img src={p.bild_url} alt={p.titel} />
                    </div>
                  ) : null}
                  <span className="num-label">{fmtDate(p.veroeffentlicht_am)}</span>
                  <h3>{p.titel}</h3>
                  <p>{p.excerpt}</p>
                  <span className="badge link">Weiterlesen →</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="section-head centered">
              <span className="section-label">Bald mehr</span>
              <h2>Noch keine Beiträge</h2>
              <p>Sobald im Supabase-Backend Beiträge angelegt sind, erscheinen sie hier automatisch.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
