import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ExercisesGrid } from "@/app/_general/components/exercises/exercises-grid";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { ContentCard } from "@/app/_general/components/content-card";

const Practice = async ({
  params: { practiceId },
}: {
  params: { practiceId: string };
}) => {
  const practice = await prisma.practice.findUnique({
    where: { id: Number(practiceId) },
    include: { exercises: true, theories: true },
  });

  return (
    <LayoutWithSidePanel>
      {!practice && <p>El trabajo práctico no existe.</p>}

      {practice && (
        <>
          <Header2>{practice?.name}</Header2>
          <p>{practice?.description}</p>

          <Header3>Ejercicios</Header3>
          <ExercisesGrid exercises={practice?.exercises ?? []} />

          <Header3>Teoría relacionada</Header3>

          <ContentGrid>
            {practice.theories.map((theory) => (
              <ContentCard key={theory.id} type="theory" theory={theory} />
            ))}
          </ContentGrid>
        </>
      )}
    </LayoutWithSidePanel>
  );
};

export default Practice;