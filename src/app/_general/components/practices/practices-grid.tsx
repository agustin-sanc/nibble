import { prisma } from "@/prisma";
import { PracticeCard } from "@/app/_general/components/practices/practice-card";

export const PracticesGrid = async () => {
  const practices = await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    include: { exercises: true },
  });

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {practices?.length === 0 ? (
        <p>No hay trabajos prácticos para mostrar.</p>
      ) : (
        practices?.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))
      )}
    </div>
  );
};
