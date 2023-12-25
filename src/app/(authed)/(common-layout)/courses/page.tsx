import { ContentGrid } from "@/app/_common/components/content-grid";
import { Header2 } from "@/app/_common/components/typography";
import { prisma } from "@/app/_common/prisma";
import { ContentCard } from "@/app/_common/components/content-card";
import { currentUser } from "@clerk/nextjs";
import { CreateCourseDialog } from "@/app/(authed)/(common-layout)/courses/create-course-dialog";

const Courses = async () => {
  const user = await currentUser();
  const courses = await prisma.course.findMany({});
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
