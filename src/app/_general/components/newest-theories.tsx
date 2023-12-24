import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { prisma } from "@/prisma";
import { Header2 } from "@/app/_general/components/typography";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { ContentCard } from "@/app/_general/components/content-card";
import Link from "next/link";

export const NewestTheories = async ({ className }: { className: string }) => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
    include: { practices: true },
    take: 4,
  });

  const existTheories = theories.length > 0;

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />
          <Header2 className="ml-2 mt-2">Últimas unidades teóricas</Header2>
        </div>

        <Button className="flex items-center gap-2" variant="outline" asChild>
          <Link href="/theories" className="flex items-center gap-2">
            Ver todas <ArrowRight />
          </Link>
        </Button>
      </div>

      <ContentGrid>
        {!existTheories && <p>No hay unidades teóricas para mostrar.</p>}

        {existTheories &&
          theories?.map((theory) => (
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
      </ContentGrid>
    </div>
  );
};
