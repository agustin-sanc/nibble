import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { prisma } from "@/prisma";
import { TheoryCard } from "@/app/_general/components/theories/theory-card";
import { Header2 } from "@/app/_general/components/typography";

export const NewestTheories = async ({ className }: { className: string }) => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />
          <Header2 className="ml-2 mt-2">Últimas unidades teóricas</Header2>
        </div>

        <Button className="flex items-center gap-2" variant="outline">
          Ver todas <ArrowRight />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {theories?.length === 0 ? (
          <p>No hay unidades teóricas para mostrar.</p>
        ) : (
          theories?.map((theory) => (
            <TheoryCard key={theory.id} theory={theory} />
          ))
        )}
      </div>
    </div>
  );
};
