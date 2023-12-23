import { Badge } from "@/app/_general/components/badge";
import { type Exercise, type Practice } from "@prisma/client";

type Props = {
  practice: Practice & { exercises: Exercise[] };
};

export const NumberOfExercisesBadge = ({ practice }: Props) => {
  const exercises = practice.exercises.length;
  const hasOneExercise = exercises === 1;

  return (
    <Badge variant="outline">
      {`${exercises} ${hasOneExercise ? "ejercicio" : "ejercicios"}`}
    </Badge>
  );
};
