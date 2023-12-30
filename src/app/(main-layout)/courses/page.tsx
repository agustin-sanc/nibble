import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreateCourseDialog } from "@/app/(main-layout)/courses/(create)/create-course-dialog";
import { getCurrentUser } from "@/app/_cross/get-current-user";

const Courses = async () => {
  const { id: currentUserId, isProfessor: currentUserIsProfessor } =
    await getCurrentUser();

  const courses = await prisma.course.findMany({
    where: {
      ...(currentUserIsProfessor
        ? { ownerId: currentUserId }
        : { studentIds: { has: currentUserId } }),
    },
  });

  const hasCourses = courses.length > 0;

  console.log({ currentUserId, currentUserIsProfessor, courses });

  return (
    <>
      <div className="flex justify-between">
        <Header2>Cursos</Header2>
        {currentUserIsProfessor && <CreateCourseDialog />}
      </div>

      <ContentGrid>
        {!hasCourses && (
          <p>
            {currentUserIsProfessor
              ? "No creaste un curso aún."
              : "No fuiste agregado a un curso aún."}
          </p>
        )}

        {hasCourses &&
          courses.map((course) => (
            <ContentCard key={course.id} type="course" course={course} />
          ))}
      </ContentGrid>
    </>
  );
};

export default Courses;
