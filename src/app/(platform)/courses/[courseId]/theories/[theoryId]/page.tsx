import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { MarkdownViewer } from "@/app/_cross/components/markdown-viewer";
import { database } from "@/app/_cross/database";
import { notFound } from "next/navigation";
import { DeleteTheoryDialog } from "./(delete-theory)/delete-theory-dialog";
import { EditTheoryDialog } from "./(edit-theory)/edit-theory-dialog";

const TheoryDetailPage = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await database.theory.findUnique({
    where: { id: theoryId },
  });

  if (!theory) notFound();

  const user = await getCurrentUser();
  const { isProfessor: currentUserIsProfessor } = user;

  return (
    <>
      <div className="flex items-center justify-end">
        {currentUserIsProfessor && (
          <div className="flex gap-2">
            <EditTheoryDialog theory={theory} />
            <DeleteTheoryDialog theoryId={theoryId} />
          </div>
        )}
      </div>
      <MarkdownViewer source={theory.content} />
    </>
  );
};

export default TheoryDetailPage;
