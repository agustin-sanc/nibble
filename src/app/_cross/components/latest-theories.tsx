import { ArrowRight, Library } from "lucide-react";
import { Button } from "@/app/_cross/components/button";
import { prisma } from "@/app/_cross/prisma";
import { Header2 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import Link from "next/link";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { EmptyState } from "@/app/_cross/components/empty-state";

export const LatestTheories = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  const theories = await prisma.theory.findMany({
    where: {
      ...(user.isProfessor
        ? { course: { ownerId: user.id } }
        : { course: { studentIds: { has: user.id } } }),
    },
    orderBy: { createdAt: "desc" },
    include: { practices: true },
    take: 4,
  });

  const hasTheories = theories.length > 0;

  return (
    <div className="mt-7">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Library size={30} />
          <Header2 className="ml-2 mt-2">Últimas unidades teóricas</Header2>
        </div>

        {hasTheories && (
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <Link href="/theories" className="flex items-center gap-2">
              Ver todas <ArrowRight />
            </Link>
          </Button>
        )}
      </div>

      <ContentGrid>
        {!hasTheories && (
          <EmptyState title="No hay unidades teóricas para mostrar." />
        )}

        {hasTheories &&
          theories?.map((theory) => (
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
      </ContentGrid>
    </div>
  );
};
