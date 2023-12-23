import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";

export default async function Theory({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) {
  const theory = await prisma.theory.findUnique({
    where: { id: Number(theoryId) },
    include: { practices: { include: { exercises: true } } },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>{theory?.name}</Header2>
      <p>{theory?.description}</p>

      <Header3>Trabajos prácticos sobre el tema</Header3>
      <PracticesGrid practices={theory?.practices ?? []} />
    </LayoutWithSidePanel>
  );
}
