import html from "@/content/kontakt";

export const metadata = { title: "Kontakt – NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
