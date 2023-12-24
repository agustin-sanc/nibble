import { prisma } from "@/app/_general/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
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

  const hasPractices = course?.practices?.length > 0;
  const hasTheories = course?.theories?.length > 0;

  return (
    <>
      {!course && <p>El trabajo práctico no existe.</p>}

      {course && (
        <>
          <Header2>{course.name}</Header2>
          <p>{course.description}</p>

          <Header3>Trabajos prácticos</Header3>
          {!hasPractices && <p>No hay trabajos prácticos aún.</p>}

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

          <Header3>Unidades teóricas</Header3>
          {!hasTheories && <p>No hay unidades teóricas aún.</p>}

          {hasTheories && (
            <ContentGrid>
              {course.theories.map((theory) => (
                <ContentCard key={theory.id} type="theory" theory={theory} />
              ))}
            </ContentGrid>
          )}
        </>
      )}
    </>
  );
};

export default Course;
