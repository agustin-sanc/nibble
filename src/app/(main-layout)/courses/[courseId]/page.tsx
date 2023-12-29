import { prisma } from "@/app/_cross/prisma";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import { currentUser } from "@clerk/nextjs";
import { CreatePracticeDialog } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-dialog";
import { CreateTheoryDialog } from "@/app/(main-layout)/courses/[courseId]/theories/(create)/create-theory-dialog";

const Course = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const user = await currentUser();

  if (!user) throw new Error("User not found.");

  const course = await prisma.course.findUnique({
    where: { id: Number(courseId) },
    include: {
      practices: {
        include: {
          exercises: true,
          theories: true,
        },
      },
      theories: true,
    },
  });

  const hasPractices = course?.practices?.length > 0;
  const hasTheories = course?.theories?.length > 0;

  return (
    <>
      {!course && <p>El trabajo práctico no existe.</p>}

      {course && (
        <>
          <Header2>{course.name}</Header2>
          <p>{course.description}</p>

          <div className="flex flex-row items-center justify-between">
            <Header3>Trabajos prácticos</Header3>

            {user?.publicMetadata.isProfessor && (
              <CreatePracticeDialog courseId={Number(courseId)} />
            )}
          </div>

          {!hasPractices && <p>No hay trabajos prácticos aún.</p>}

          {hasPractices && (
            <ContentGrid>
              {course.practices.map((practice) => (
                <ContentCard
                  key={practice.id}
                  type="practice"
                  practice={practice}
                />
              ))}
            </ContentGrid>
          )}

          <div className="flex flex-row items-center justify-between">
            <Header3>Unidades teóricas</Header3>
            {user?.publicMetadata.isProfessor && <CreateTheoryDialog />}
          </div>

          {!hasTheories && <p>No hay unidades teóricas aún.</p>}

          {hasTheories && (
            <ContentGrid>
              {course.theories.map((theory) => (
                <ContentCard key={theory.id} type="theory" theory={theory} />
              ))}
            </ContentGrid>
          )}
        </>
      )}
    </>
  );
};

export default Course;
