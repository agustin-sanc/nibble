import { PracticeCard } from "@/app/_general/components/practices/practice-card";
import { prisma } from "@/prisma";

export const PracticesGrid = async () => {
  const practices = await prisma.practice.findMany({
    include: { exercises: true },
  });

  const existPractices = practices.length > 0;

  return (
    <div className="my-6 flex flex-wrap justify-between gap-5">
      {!existPractices && <p>No hay trabajos prácticos para mostrar.</p>}

      {existPractices &&
        practices?.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
    </div>
  );
};
