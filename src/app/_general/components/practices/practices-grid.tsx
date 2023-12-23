import { PracticeCard } from "@/app/_general/components/practices/practice-card";
import type { Exercise, Practice } from "@prisma/client";

type PracticesGridProps = {
  practices: (Practice & { exercises: Exercise[] })[];
};

export const PracticesGrid = ({ practices }: PracticesGridProps) => (
  <div className="my-6 flex flex-wrap justify-between gap-5">
    {practices?.length === 0 ? (
      <p>No hay trabajos prácticos para mostrar.</p>
    ) : (
      practices?.map((practice) => (
        <PracticeCard key={practice.id} practice={practice} />
      ))
    )}
  </div>
);
