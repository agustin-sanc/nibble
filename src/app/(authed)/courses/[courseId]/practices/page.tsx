import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";
import { ContentCard } from "@/app/_cross/components/content-card";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { CreatePracticeDialog } from "@/app/(authed)/courses/[courseId]/practices/(create-practice)/create-practice-dialog";
import { EmptyState } from "@/app/_cross/components/empty-state";
import { CreateCourseDialog } from "@/app/(authed)/courses/(create-course)/create-course-dialog";

const CoursePracticesPage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  if (!courseId) throw new Error("courseId must be defined");

  const user = await getCurrentUser();
  const { id: currentUserId, isProfessor: currentUserIsProfessor } = user;

  const course = await database.course.findUnique({
    where: {
      id: courseId,
      ...(currentUserIsProfessor
        ? { ownerId: currentUserId }
        : { studentIds: { has: currentUserId } }),
    },
  });

  if (!course) throw new Error("User does not have access to this course");

  const practices = await database.practice.findMany({
    where: {
      courseId,
    },
    include: { exercises: true },
  });

  const courseHasPractices = practices.length > 0;

  return (
    <>
      <div className="flex justify-between">
        <Header2>Trabajos prácticos</Header2>

        {currentUserIsProfessor && courseHasPractices && (
          <CreatePracticeDialog courseId={courseId} />
        )}
      </div>

      <ContentGrid>
        {currentUserIsProfessor && !courseHasPractices && (
          <EmptyState title="No creaste un curso aún.">
            <CreateCourseDialog />
          </EmptyState>
        )}

        {courseHasPractices &&
          practices?.map((practice) => (
            <ContentCard
              key={practice.id}
              type="practice"
              practice={practice}
            />
          ))}
      </ContentGrid>
    </>
  );
};

export default CoursePracticesPage;
