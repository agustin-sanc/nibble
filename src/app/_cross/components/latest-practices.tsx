import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/app/_cross/components/button";
import { prisma } from "@/app/_cross/prisma";
import { Header2 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import Link from "next/link";
import { EmptyState } from "@/app/_cross/components/empty-state";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";

export const LatestPractices = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  const practices = await prisma.practice.findMany({
    where: {
      ...(user.isProfessor
        ? { course: { ownerId: user.id } }
        : { course: { studentIds: { has: user.id } } }),
    },
    orderBy: { createdAt: "desc" },
    include: { exercises: true, course: true },
    take: 4,
  });

  const hasPractices = practices.length > 0;

  return (
    <div className="mt-7">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />
          <Header2 className="ml-2 mt-2">Últimos trabajos prácticos</Header2>
        </div>

        {hasPractices && (
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <Link href="/latest-practices" className="flex items-center gap-2">
              Ver todos <ArrowRight />
            </Link>
          </Button>
        )}
      </div>

      <ContentGrid>
        {!hasPractices && (
          <EmptyState title="No hay trabajos prácticos para mostrar." />
        )}

        {hasPractices &&
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
