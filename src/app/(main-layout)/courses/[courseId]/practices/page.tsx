import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";

const Practices = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  if (!courseId) throw new Error("courseId must be defined");

  const practices = await prisma.practice.findMany({
    where: { courseId: Number(courseId) },
    include: { exercises: true },
  });

  const existPractices = practices.length > 0;

  return (
    <>
      <Header2>Trabajos prácticos</Header2>

      <ContentGrid>
        {!existPractices && <p>No hay trabajos prácticos para mostrar.</p>}

        {existPractices &&
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

export default Practices;
