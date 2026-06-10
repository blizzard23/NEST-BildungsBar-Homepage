import html from "@/content/impressum";

export const metadata = { title: "Impressum – NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
