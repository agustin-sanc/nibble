import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ExercisesGrid } from "@/app/_general/components/exercises/exercises-grid";

export default async function Practice({
  params: { practiceId },
}: {
  params: { practiceId: string };
}) {
  const practice = await prisma.practice.findUnique({
    where: { id: Number(practiceId) },
    include: { exercises: { include: { tests: true } } },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>{practice?.name}</Header2>
      <p>{practice?.description}</p>
      <Header3>Ejercicios</Header3>
      <ExercisesGrid exercises={practice?.exercises ?? []} />
    </LayoutWithSidePanel>
  );
}
