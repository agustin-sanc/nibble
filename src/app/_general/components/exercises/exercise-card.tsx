"use client";

import { Binary, Laptop } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import type { Exercise } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type ExerciseCardProps = {
  exercise: Exercise;
};

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="mb-2 flex w-[48%] flex-col justify-between rounded border p-4">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Binary />
            <h2 className="ml-2 text-xl font-bold">{exercise.name}</h2>
          </div>
        </div>

        <p className="pb-5 text-sm">{exercise.description}</p>
      </div>

      <Button
        className="flex items-center gap-2"
        variant="outline"
        onClick={() =>
          router.push(
            `/practices/${exercise.practiceId}/exercises/${exercise.id}`,
          )
        }
      >
        <Laptop /> Abrir ejercicio
      </Button>
    </div>
  );
};
