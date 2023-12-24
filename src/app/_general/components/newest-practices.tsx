import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { prisma } from "@/prisma";
import { Header2 } from "@/app/_general/components/typography";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { ContentCard } from "@/app/_general/components/content-card";
import Link from "next/link";

export const NewestPractices = async ({ className }: { className: string }) => {
  const practices = await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    include: { exercises: true },
    take: 4,
  });

  const existPractices = practices.length > 0;

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />
          <Header2 className="ml-2 mt-2">Últimos trabajos prácticos</Header2>
        </div>

        <Button className="flex items-center gap-2" variant="outline" asChild>
          <Link href="/practices" className="flex items-center gap-2">
            Ver todos <ArrowRight />
          </Link>
        </Button>
      </div>

      <ContentGrid>
        {!existPractices && <p>No hay trabajos prácticos para mostrar.</p>}

        {existPractices &&
          practices?.map((practice) => (
            <ContentCard
              key={practice.id}
              type="practice"
              practice={practice}
            />
          ))}
      </ContentGrid>
    </div>
  );
};
