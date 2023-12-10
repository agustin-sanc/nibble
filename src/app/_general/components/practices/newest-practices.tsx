import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { prisma } from "@/prisma";
import { Header2 } from "@/app/_general/components/typography";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";

export const NewestPractices = async ({ className }: { className: string }) => {
  const practices = await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    include: { exercises: true },
    take: 4,
  });

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />
          <Header2 className="ml-2 mt-2">Últimos trabajos prácticos</Header2>
        </div>

        <Button className="flex items-center gap-2" variant="outline">
          Ver todos <ArrowRight />
        </Button>
      </div>

      <PracticesGrid practices={practices} />
    </div>
  );
};
