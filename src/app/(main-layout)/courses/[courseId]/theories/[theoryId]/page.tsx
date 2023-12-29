import { prisma } from "@/app/_cross/prisma";
import { MarkdownViewer } from "@/app/_cross/components/markdown-viewer";

const Theory = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await prisma.theory.findUnique({
    where: { id: Number(theoryId) },
  });

  return (
    <>
      {!theory && <p>La unidad teórica no existe.</p>}
      {theory && <MarkdownViewer source={theory.content} />}
    </>
  );
};

export default Theory;
