import { Badge } from "@/app/_cross/components/badge";

export const NumberOfStudentsBadge = ({ number }: { number: number }) => {
  const hasOneStudent = number === 1;

  return (
    <Badge variant="outline">
      {`${number} ${hasOneStudent ? "alumno" : "alumnos"}`}
    </Badge>
  );
};
