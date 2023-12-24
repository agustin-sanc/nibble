import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { ContentCard } from "@/app/_general/components/content-card";

const Theory = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await prisma.theory.findUnique({
    where: { id: Number(theoryId) },
    include: { practices: { include: { exercises: true } } },
  });

  let hasPractices = false;
  if (theory && theory.practices) hasPractices = theory.practices.length > 0;

  return (
    <LayoutWithSidePanel>
      {!theory && <p>La unidad teórica no existe.</p>}

      {theory && (
        <>
          <Header2>{theory.name}</Header2>
          <p>{theory.description}</p>

          <Header3>Trabajos prácticos sobre el tema</Header3>
          {!hasPractices && <p>No hay prácticos sobre este tema aún.</p>}

          {hasPractices && (
            <ContentGrid>
              {theory.practices.map((practice) => (
                <ContentCard
                  key={practice.id}
                  type="practice"
                  practice={practice}
                />
              ))}
            </ContentGrid>
          )}
        </>
      )}
    </LayoutWithSidePanel>
  );
};

export default Theory;
