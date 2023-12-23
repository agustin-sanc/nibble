import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";
import { prisma } from "@/prisma";

export default async function Practices() {
  const practices = await prisma.practice.findMany({
    include: { exercises: true },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>Trabajos prácticos</Header2>
      <PracticesGrid practices={practices} />
    </LayoutWithSidePanel>
  );
}
