import { notFound } from "next/navigation";
import { OS } from "@/components/OS";
import { APP_SLUGS, appFromSlug } from "@/lib/app-route";

export const instant = false;

export function generateStaticParams() {
  return APP_SLUGS.map((app) => ({ app }));
}

export default async function AppPage({ params }: { params: Promise<{ app: string }> }) {
  const app = appFromSlug((await params).app);
  if (!app) notFound();
  return <OS initialApp={app} />;
}
