import { database } from "@/app/_cross/database";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreatePracticeDialog } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-dialog";
import { CreateTheoryDialog } from "@/app/(main-layout)/courses/[courseId]/theories/(create)/create-theory-dialog";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { EditCourseDialog } from "@/app/(main-layout)/courses/[courseId]/(edit)/edit-course-dialog";
import { EmptyState } from "@/app/_cross/components/empty-state";
import { DeleteCourseDialog } from "@/app/(main-layout)/courses/[courseId]/(delete)/delete-course-dialog";
import { notFound, redirect } from "next/navigation";

const Course = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const user = await getCurrentUser();

  if (!user) redirect("/dashboard");
  if (!courseId) notFound();

  const course = await database.course.findUnique({
    where: {
      id: courseId,
      ...(user.isProfessor
        ? { ownerId: user.id }
        : { studentIds: { has: user.id } }),
    },
    include: {
      practices: {
        include: {
          exercises: {
            include: {
              practice: true,
            },
          },
          theories: true,
        },
      },
      theories: true,
    },
  });

  if (!course) notFound();

  const hasPractices = course.practices?.length > 0;

  const Practices = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Trabajos prácticos</Header3>

        {user.isProfessor && hasPractices && (
          <CreatePracticeDialog courseId={course.id} />
        )}
      </div>

      {!hasPractices && (
        <EmptyState title="Este curso no tiene trabajos prácticos aún.">
          {user.isProfessor && <CreatePracticeDialog courseId={course.id} />}
        </EmptyState>
      )}

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

  const Theories = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Unidades teóricas</Header3>

        {user.isProfessor && hasTheories && (
          <CreateTheoryDialog courseId={course.id} />
        )}
      </div>

      {!hasTheories && (
        <EmptyState title="Este curso no tiene unidades teóricas aún.">
          {user.isProfessor && <CreateTheoryDialog courseId={course.id} />}
        </EmptyState>
      )}

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
      <div className="flex items-center justify-between">
        <Header2>{course.name}</Header2>

        {user.isProfessor && (
          <div className="flex gap-2">
            <EditCourseDialog course={course} />
            <DeleteCourseDialog courseId={course.id} />
          </div>
        )}
      </div>

      <p>{course.description}</p>

      <Practices />
      <Theories />
    </>
  );
};

export default Course;
