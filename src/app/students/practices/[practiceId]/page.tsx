import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ExercisesGrid } from "@/app/_general/components/exercises/exercises-grid";
import { TheoriesGrid } from "@/app/_general/components/theories/theories-grid";

export default async function Practice({
  params: { practiceId },
}: {
  params: { practiceId: string };
}) {
  const practice = await prisma.practice.findUnique({
    where: { id: Number(practiceId) },
    include: { exercises: true, theories: true },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>{practice?.name}</Header2>
      <p>{practice?.description}</p>

      <Header3>Ejercicios</Header3>
      <ExercisesGrid exercises={practice?.exercises ?? []} />

      <Header3>Teoría relacionada</Header3>
      <TheoriesGrid theories={practice?.theories ?? []} />
    </LayoutWithSidePanel>
  );
}
