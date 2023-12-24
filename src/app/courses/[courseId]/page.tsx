import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { ContentCard } from "@/app/_general/components/content-card";

const Course = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const course = await prisma.course.findUnique({
    where: { id: Number(courseId) },
    include: {
      practices: {
        include: {
          exercises: true,
          theories: true,
        },
      },
      theories: true,
    },
  });

  return (
    <LayoutWithSidePanel>
      {!course && <p>El trabajo práctico no existe.</p>}

      {course && (
        <>
          <Header2>{course.name}</Header2>
          <p>{course.description}</p>

          <Header3>Trabajos prácticos</Header3>

          <ContentGrid>
            {course.practices.map((practice) => (
              <ContentCard
                key={practice.id}
                type="practice"
                practice={practice}
              />
            ))}
          </ContentGrid>

          <Header3>Unidades teóricas</Header3>

          <ContentGrid>
            {course.theories.map((theory) => (
              <ContentCard key={theory.id} type="theory" theory={theory} />
            ))}
          </ContentGrid>
        </>
      )}
    </LayoutWithSidePanel>
  );
};

export default Course;