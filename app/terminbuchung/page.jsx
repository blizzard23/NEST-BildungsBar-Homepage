import html from "@/content/terminbuchung";

export const metadata = { title: "Termin buchen – kostenfreie Beratung | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
