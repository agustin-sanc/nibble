import type { Exercise, Test } from "@prisma/client";
import { ExerciseCard } from "@/app/_general/components/exercises/exercise-card";

type ExercisesGridProps = {
  exercises: (Exercise & { tests: Test[] })[];
};

export const ExercisesGrid = ({ exercises }: ExercisesGridProps) => (
  <div className="mt-6 flex flex-row flex-wrap justify-between gap-5">
    {exercises?.length === 0 ? (
      <p>No hay ejercicios en este trabajo práctico.</p>
    ) : (
      exercises?.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))
    )}
  </div>
);
