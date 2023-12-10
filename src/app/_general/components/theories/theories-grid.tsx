import { TheoryCard } from "@/app/_general/components/theories/theory-card";
import { prisma } from "@/prisma";

export const TheoriesGrid = async () => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mb-6 mt-6 grid grid-cols-2 gap-4">
      {theories?.length === 0 ? (
        <p>No hay unidades teóricas para mostrar.</p>
      ) : (
        theories.map((theory) => <TheoryCard key={theory.id} theory={theory} />)
      )}
    </div>
  );
};
