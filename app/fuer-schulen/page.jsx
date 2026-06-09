import html from "@/content/fuer-schulen";

export const metadata = { title: "Für Schulen – kAoA-konforme Workshops | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
