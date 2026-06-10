import html from "@/content/datenschutz";

export const metadata = { title: "Datenschutzerklärung – NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
