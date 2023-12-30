import { prisma } from "@/app/_cross/prisma";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreatePracticeDialog } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-dialog";
import { CreateTheoryDialog } from "@/app/(main-layout)/courses/[courseId]/theories/(create)/create-theory-dialog";
import { getCurrentUser } from "@/app/_cross/utils/get-current-user";

const Course = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const { isProfessor: currentUserIsProfessor } = await getCurrentUser();

  const course = await prisma.course.findUnique({
    where: { id: Number(courseId) },
    include: {
      practices: {
        include: {
          exercises: {
            include: {
              practice: {
                select: {
                  courseId: true,
                },
              },
            },
          },
          theories: true,
        },
      },
      theories: true,
    },
  });

  if (!course) return <p>El curso no existe</p>;

  const hasPractices = course.practices?.length > 0;

  const PracticesSection = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Trabajos prácticos</Header3>

        {currentUserIsProfessor && (
          <CreatePracticeDialog courseId={course.id} />
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
    </>
  );

  const hasTheories = course.theories?.length > 0;

  const TheoriesSection = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Unidades teóricas</Header3>
        {currentUserIsProfessor && <CreateTheoryDialog courseId={course.id} />}
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
  );

  return (
    <>
      <Header2>{course.name}</Header2>
      <p>{course.description}</p>

      <PracticesSection />
      <TheoriesSection />
    </>
  );
};

export default Course;
