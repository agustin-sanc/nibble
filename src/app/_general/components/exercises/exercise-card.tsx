"use client";

import { Binary, Laptop } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import type { Exercise, Test } from "@prisma/client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type ExerciseCardProps = {
  exercise: Exercise & { tests: Test[] };
};

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { user } = useUser();

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

      <Link
        href={`/${
          !user?.publicMetadata.isProfessor ? "students" : "professors"
        }/practices/${exercise.practiceId}/exercises/${exercise.id}`}
      >
        <Button className="flex items-center gap-2" variant="outline">
          <Laptop /> Abrir ejercicio
        </Button>
      </Link>
    </div>
  );
};
