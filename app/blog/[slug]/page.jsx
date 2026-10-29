import { supabaseServer } from "@/lib/supabaseServer";
import { inhaltZuHtml } from "@/lib/blogFormat";
import { notFound } from "next/navigation";

export const revalidate = 60;

function fmtDate(d) {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }); }
  catch { return d; }
}

export async function generateMetadata({ params }) {
  const sb = supabaseServer();
  if (!sb) return { title: "Blog – NEST BildungsBar" };
  const { data } = await sb.from("posts").select("titel,excerpt").eq("slug", params.slug).single();
  return { title: (data?.titel || "Blog") + " – NEST BildungsBar", description: data?.excerpt || "" };
}

export default async function PostPage({ params }) {
  const sb = supabaseServer();
  let post = null;
  if (sb) {
    const { data } = await sb
      .from("posts")
      .select("titel,inhalt,bild_url,veroeffentlicht_am,published")
      .eq("slug", params.slug)
      .single();
    if (data && data.published) post = data;
  }
  if (!post) notFound();

  return (
    <div>
      <section className="hero">
        <div className="container"><div className="hero-inner"><div className="hero-text">
          <div className="breadcrumb"><a href="/blog">Blog</a> · {fmtDate(post.veroeffentlicht_am)}</div>
          <h1>{post.titel}</h1>
        </div></div></div>
      </section>

      {/* Artikel · Vorlage: Brilliant „Blog post" (schmale Spalte, gerahmtes Titelbild) */}
      <section className="bb-sec">
        <div className="container bb-article">
          {post.bild_url ? (
            <div className="bb-frame bb-frame--wide bb-article__img"><img src={post.bild_url} alt={post.titel} /></div>
          ) : null}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: inhaltZuHtml(post.inhalt) }} />
          <div className="bb-article__foot"><a className="bb-link" href="/blog">Zurück zum Blog</a></div>
        </div>
      </section>
    </div>
  );
}
