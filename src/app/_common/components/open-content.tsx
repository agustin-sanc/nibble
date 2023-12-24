import { Button } from "@/app/_common/components/button";
import Link from "next/link";

type OpenExerciseProps = {
  type: "exercise";
  practiceId: number;
  exerciseId: number;
};

type OpenContentProps =
  | OpenExerciseProps
  | {
      id: number;
      type: "practice" | "theory" | "course";
    };

export const OpenContent = (props: OpenContentProps) => {
  let label: string, href: string;

  switch (props.type) {
    case "course":
      label = "Abrir curso";
      href = `/courses/${props.id}`;
      break;

    case "practice":
      label = "Abrir trabajo práctico";
      href = `/practices/${props.id}`;
      break;

    case "exercise":
      label = "Abrir ejercicio";
      href = `/practices/${props.practiceId}/exercises/${props.exerciseId}`;
      break;

    case "theory":
      label = "Abrir unidad teórica";
      href = `/theories/${props.id}`;
      break;
  }

  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
