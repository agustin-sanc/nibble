import { database } from "@/app/_cross/database";
import { MarkdownViewer } from "@/app/_cross/components/markdown-viewer";
import { notFound } from "next/navigation";

const TheoryDetailPage = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await database.theory.findUnique({
    where: { id: theoryId },
  });

  if (!theory) notFound();

  return <MarkdownViewer source={theory.content} />;
};

export default TheoryDetailPage;
