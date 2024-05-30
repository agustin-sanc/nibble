import { Header2 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { database } from "@/app/_cross/database";
import { ContentCard } from "@/app/_cross/components/content-card";

const Theories = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  if (!courseId) throw new Error("courseId must be defined");

  const theories = await database.theory.findMany({
    where: { courseId: Number(courseId) },
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
