import { notFound } from "next/navigation";
import { OS } from "@/components/OS";
import { WORK_SLUGS, workFromSlug } from "@/lib/app-route";

export const instant = false;

export function generateStaticParams() {
  return WORK_SLUGS.map((work) => ({ work }));
}

export default async function WorkPage({ params }: { params: Promise<{ work: string }> }) {
  const work = workFromSlug((await params).work);
  if (!work) notFound();
  return <OS initialApp="projects" initialWork={work} />;
}
