import { subjects } from "@/data/subjects";
import SubjectClient from "@/components/SubjectClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const subject = subjects.find((s) => s.slug === params.slug);

  if (!subject) {
    notFound();
  }

  return <SubjectClient subject={subject} />;
}
