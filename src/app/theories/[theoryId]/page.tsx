import { prisma } from "@/prisma";
import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { MarkdownViewer } from "@/app/_general/components/markdown-viewer";

const Theory = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await prisma.theory.findUnique({
    where: { id: Number(theoryId) },
  });

  return (
    <LayoutWithSidePanel>
      {!theory && <p>La unidad teórica no existe.</p>}
      {theory && <MarkdownViewer source={theory.content} />}
    </LayoutWithSidePanel>
  );
};

export default Theory;
