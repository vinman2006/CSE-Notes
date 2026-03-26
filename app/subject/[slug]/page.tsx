import { subjects } from "@/data/subjects";
import SubjectClient from "@/components/SubjectClient";

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);

  return <SubjectClient subject={subject} />;
}
