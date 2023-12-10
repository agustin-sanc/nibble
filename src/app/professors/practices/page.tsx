import InnerLayout from "@/app/_general/components/inner-layout";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";
import { CreatePracticeDialog } from "@/app/professors/practices/create-practice-dialog";
import { prisma } from "@/prisma";

export default async function Practices() {
  const practices = await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    include: { exercises: true },
  });

  return (
    <InnerLayout>
      <div className="flex items-center justify-between">
        <Header2>Trabajos prácticos</Header2>
        <CreatePracticeDialog />
      </div>

      <PracticesGrid practices={practices} />
    </InnerLayout>
  );
}
