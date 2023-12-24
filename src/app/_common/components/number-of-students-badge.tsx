import { Badge } from "@/app/_common/components/badge";

export const NumberOfStudentsBadge = ({ number }: { number: number }) => {
  const hasOneStudent = number === 1;

  return (
    <Badge variant="outline">
      {`${number} ${hasOneStudent ? "alumno" : "alumnos"}`}
    </Badge>
  );
};
