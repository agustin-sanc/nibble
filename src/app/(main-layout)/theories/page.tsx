import { Header2 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";

const Theories = async () => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const existTheories = theories.length > 0;

  return (
    <>
      <Header2>Unidades teóricas</Header2>

      <ContentGrid>
        {!existTheories && <p>No hay unidades teóricas para mostrar.</p>}

        {existTheories &&
          theories.map((theory) => (
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
      </ContentGrid>
    </>
  );
};

export default Theories;
