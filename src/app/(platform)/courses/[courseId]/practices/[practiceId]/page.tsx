import { database } from "@/app/_cross/database";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { DeletePracticeDialog } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/(delete-practice)/delete-practice-dialog";
import { EditPracticeDialog } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/(edit-practice)/edit-practice-dialog";
import { LinkTheoryDialog } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/(link-theory)/link-theory-dialog";
import Link from "next/link";
import { Button } from "@/app/_cross/components/button";
import { EmptyState } from "@/app/_cross/components/empty-state"; // Añadir esta importación

const PracticeDetailPage = async ({
  params: { practiceId, courseId },
}: {
  params: { practiceId: string; courseId: string };
}) => {
  const practice = await database.practice.findUnique({
    where: { id: practiceId },
    include: { exercises: { include: { practice: true } }, theories: true },
  });

  if (!practice) notFound();

  const user = await getCurrentUser();

  // const course = await database.course.findUnique({
  //   where: { id: practice.courseId },
  // });

  // TODO: Add verification for user access to the practice.

  const hasExercises = practice.exercises?.length > 0;
  const hasRelatedTheories = practice.theories?.length > 0;

  const availableTheories = await database.theory.findMany({
    where: {
      courseId: practice.courseId,
      NOT: {
        id: {
          in: practice.theories.map((theory) => theory.id),
        },
      },
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Header2>{practice.name}</Header2>

        {user.isProfessor && (
          <div className="flex gap-2">
            <EditPracticeDialog practice={practice} />
            <DeletePracticeDialog practiceId={practiceId} />
          </div>
        )}
      </div>

      <p>{practice.description}</p>

      <div className="flex flex-row items-center justify-between">
        <Header3>Ejercicios</Header3>
        {user.isProfessor && (
          <Link
            href={`/courses/${courseId}/practices/${practiceId}/exercises/create`}
          >
            <Button>Crear ejercicio</Button>
          </Link>
        )}
      </div>

      {!hasExercises ? (
        <EmptyState title="No hay ejercicios aún." />
      ) : (
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

      <div className="flex flex-row items-center justify-between">
        <Header3>Teoría relacionada</Header3>

        {user.isProfessor && (
          <LinkTheoryDialog
            practiceId={practiceId}
            availableTheories={availableTheories}
          />
        )}
      </div>

      {!hasRelatedTheories ? (
        <EmptyState title="No hay teoría relacionada aún." />
      ) : (
        <ContentGrid>
          {practice.theories.map((theory) => (
            // TODO: Allow to remove related theory.
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
        </ContentGrid>
      )}
    </>
  );
};

export default PracticeDetailPage;
