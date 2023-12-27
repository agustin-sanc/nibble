import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";
import { currentUser } from "@clerk/nextjs";
import { CreateCourseDialog } from "@/app/(main-layout)/courses/(create)/create-course-dialog";

const Courses = async () => {
  const user = await currentUser();
  if (!user) return;

  const courses = await prisma.course.findMany({
    where: {
      ownerId: user.id,
    },
  });

  const existCourses = courses.length > 0;

  return (
    <>
      <div className="flex justify-between">
        <Header2>Cursos</Header2>

        {user?.publicMetadata.isProfessor && <CreateCourseDialog />}
      </div>

      <ContentGrid>
        {!existCourses && <p>No fuiste agregado a un curso aún.</p>}

        {existCourses &&
          courses.map((course) => (
            <ContentCard key={course.id} type="course" course={course} />
          ))}
      </ContentGrid>
    </>
  );
};

export default Courses;
