import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { Header2 } from "@/app/_general/components/typography";
import { prisma } from "@/app/_general/prisma";
import { ContentCard } from "@/app/_general/components/content-card";

const Practices = async () => {
  const practices = await prisma.practice.findMany({
    include: { exercises: true },
  });

  const existPractices = practices.length > 0;

  return (
    <LayoutWithSidePanel>
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
    </LayoutWithSidePanel>
  );
};

export default Practices;
