import html from "@/content/berufswelt";

export const metadata = { title: "Berufswelt – über 150 Ausbildungsberufe | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
