import html from "@/content/deine-zukunft";

export const metadata = { title: "Deine Zukunft – über 200 Ausbildungsberufe | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
