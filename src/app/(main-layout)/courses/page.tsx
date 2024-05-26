import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreateCourseDialog } from "@/app/(main-layout)/courses/(create)/create-course-dialog";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { Button } from "@/app/_cross/components/button";

const Courses = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  const { id: currentUserId, isProfessor: currentUserIsProfessor } = user;

  const courses = await prisma.course.findMany({
    where: {
      ...(currentUserIsProfessor
        ? { ownerId: currentUserId }
        : { studentIds: { has: currentUserId } }),
    },
  });

  const hasCourses = courses.length > 0;

  const EmptyState = () => (
    <div
      className="mt-4 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No creaste ningún curso aún.
        </h3>

        <CreateCourseDialog />
      </div>
    </div>
  );

  return (
    <>
      <Header2>Cursos</Header2>

      {currentUserIsProfessor && !hasCourses && <EmptyState />}

      {!currentUserIsProfessor && !hasCourses && (
        <p>No fuiste agregado a un curso aún.</p>
      )}

      {hasCourses && (
        <ContentGrid>
          {courses.map((course) => (
            <ContentCard key={course.id} type="course" course={course} />
          ))}
        </ContentGrid>
      )}
    </>
  );
};

export default Courses;
