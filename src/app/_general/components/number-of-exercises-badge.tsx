import { Badge } from "@/app/_general/components/badge";

export const NumberOfExercisesBadge = ({ number }: { number: number }) => {
  const hasOneExercise = number === 1;

  return (
    <Badge variant="outline">
      {`${number} ${hasOneExercise ? "ejercicio" : "ejercicios"}`}
    </Badge>
  );
};
