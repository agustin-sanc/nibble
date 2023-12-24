import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { Header2 } from "@/app/_general/components/typography";
import { prisma } from "@/prisma";
import { ContentCard } from "@/app/_general/components/content-card";

const Courses = async () => {
  const courses = await prisma.course.findMany({});
  const existCourses = courses.length > 0;

  return (
    <LayoutWithSidePanel>
      <Header2>Cursos</Header2>

      <ContentGrid>
        {!existCourses && <p>No fuiste agregado a un curso aún.</p>}

        {existCourses &&
          courses.map((course) => (
            <ContentCard key={course.id} type="course" course={course} />
          ))}
      </ContentGrid>
    </LayoutWithSidePanel>
  );
};

export default Courses;
