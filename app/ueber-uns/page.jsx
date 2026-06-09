import html from "@/content/ueber-uns";

export const metadata = { title: "Über uns – NEST BildungsBar" };

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
