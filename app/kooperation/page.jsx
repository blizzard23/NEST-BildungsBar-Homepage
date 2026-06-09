import html from "@/content/kooperation";

export const metadata = { title: "Für Unternehmen – Kooperation & Ausbildung | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
