import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { PracticeCard } from "@/app/_general/components/practices/practice-card";
import { prisma } from "@/prisma";

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

          <h2 className="ml-3 text-3xl font-semibold">
            Últimos trabajos prácticos
          </h2>
        </div>

        <Button className="flex items-center gap-2" variant="outline">
          Ver todos <ArrowRight />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {practices?.length === 0 ? (
          <p>No hay trabajos prácticos para mostrar.</p>
        ) : (
          practices?.map((practice) => (
            <PracticeCard key={practice.id} practice={practice} />
          ))
        )}
      </div>
    </div>
  );
};