import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ContentGrid } from "@/app/_general/components/content-grid";

const Theory = async ({
  params: { theoryId },
}: {
  params: { theoryId: string };
}) => {
  const theory = await prisma.theory.findUnique({
    where: { id: Number(theoryId) },
    include: { practices: { include: { exercises: true } } },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>{theory?.name}</Header2>
      <p>{theory?.description}</p>

      <Header3>Trabajos prácticos sobre el tema</Header3>
      {/*<ContentGrid />*/}
    </LayoutWithSidePanel>
  );
};

export default Theory;
