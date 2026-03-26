import { subjects } from "@/data/subjects";
import SubjectClient from "@/components/SubjectClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise< { slug: string } >;
}) {
  const { slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);

  if (!subject) {
    notFound();
  }

  return <SubjectClient subject={subject} />;
}
