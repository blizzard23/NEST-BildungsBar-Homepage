import html from "@/content/referenzen";

export const metadata = { title: "Referenzen – über 70 Partner | NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
