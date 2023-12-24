import { ContentGrid } from "@/app/_common/components/content-grid";
import { Header2 } from "@/app/_common/components/typography";
import { prisma } from "@/app/_common/prisma";
import { ContentCard } from "@/app/_common/components/content-card";

const Practices = async () => {
  const practices = await prisma.practice.findMany({
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
