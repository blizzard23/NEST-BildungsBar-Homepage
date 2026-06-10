import html from "@/content/home";

export const metadata = { title: "NEST BildungsBar – Locker. Persönlich. Kostenfrei." };

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
