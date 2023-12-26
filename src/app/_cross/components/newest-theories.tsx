import { ArrowRight, Library } from "lucide-react";
import { Button } from "@/app/_cross/components/button";
import { prisma } from "@/app/_cross/prisma";
import { Header2 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import Link from "next/link";

export const NewestTheories = async () => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
    include: { practices: true },
    take: 4,
  });

  const existTheories = theories.length > 0;

  return (
    <div className="mt-7">
      <div className="mb-6 flex justify-between">
        <div className="flex items-center">
          <Library size={30} />
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
