import { prisma } from "@/app/_general/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
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

  const hasExercises = practice?.exercises?.length > 0;
  const hasRelatedTheories = practice?.theories?.length > 0;

  return (
    <>
      {!practice && <p>El trabajo práctico no existe.</p>}

      {practice && (
        <>
          <Header2>{practice.name}</Header2>
          <p>{practice.description}</p>

          <Header3>Ejercicios</Header3>
          {!hasExercises && <p>No hay ejercicios aún.</p>}

          {hasExercises && (
            <ContentGrid>
              {practice.exercises.map((exercise) => (
                <ContentCard
                  key={exercise.id}
                  type="exercise"
                  exercise={exercise}
                />
              ))}
            </ContentGrid>
          )}

          <Header3>Teoría relacionada</Header3>
          {!hasRelatedTheories && <p>No hay teoría relacionada.</p>}

          {hasRelatedTheories && (
            <ContentGrid>
              {practice.theories.map((theory) => (
                <ContentCard key={theory.id} type="theory" theory={theory} />
              ))}
            </ContentGrid>
          )}
        </>
      )}
    </>
  );
};

export default Practice;
