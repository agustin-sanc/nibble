import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreateCourseDialog } from "@/app/(main-layout)/courses/(create)/create-course-dialog";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { EmptyState } from "@/app/_cross/components/empty-state";

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

  return (
    <>
      <div className="flex justify-between">
        <Header2>Cursos</Header2>
        {currentUserIsProfessor && hasCourses && <CreateCourseDialog />}
      </div>

      {currentUserIsProfessor && !hasCourses && (
        <EmptyState title="No creaste un curso aún.">
          <CreateCourseDialog />
        </EmptyState>
      )}

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
