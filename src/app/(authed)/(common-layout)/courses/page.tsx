import { ContentGrid } from "@/app/_common/components/content-grid";
import { Header2 } from "@/app/_common/components/typography";
import { prisma } from "@/app/_common/prisma";
import { ContentCard } from "@/app/_common/components/content-card";
import { Button } from "@/app/_common/components/button";
import { currentUser } from "@clerk/nextjs";

const Courses = async () => {
  const user = await currentUser();
  const courses = await prisma.course.findMany({});
  const existCourses = courses.length > 0;

  return (
    <>
      <div className="flex justify-between">
        <Header2>Cursos</Header2>

        {user?.publicMetadata.isProfessor && <Button>Crear curso</Button>}
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
