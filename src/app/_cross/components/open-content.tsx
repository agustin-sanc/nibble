import { Button } from "@/app/_cross/components/button";
import Link from "next/link";

type OpenCourseProps = {
  type: "course";
  courseId: string;
};

type OpenPracticeProps = {
  type: "practice";
  courseId: string;
  practiceId: string;
};

type OpenTheoryProps = {
  type: "theory";
  courseId: string;
  theoryId: string;
};

type OpenExerciseProps = {
  type: "exercise";
  courseId: string | null;
  practiceId: string | null;
  exerciseId: string;
};

type OpenContentProps =
  | OpenCourseProps
  | OpenExerciseProps
  | OpenPracticeProps
  | OpenTheoryProps;

export const OpenContent = (props: OpenContentProps) => {
  let label: string, href: string;

  switch (props.type) {
    case "course":
      label = "Abrir curso";
      href = `/courses/${props.courseId}`;
      break;

    case "practice":
      label = "Abrir trabajo práctico";
      href = `/courses/${props.courseId}/practices/${props.practiceId}`;
      break;

    case "exercise":
      label = "Abrir ejercicio";
      href = `/courses/${props.courseId}/practices/${props.practiceId}/exercises/${props.exerciseId}`;
      break;

    case "theory":
      label = "Abrir unidad teórica";
      href = `/courses/${props.courseId}/theories/${props.theoryId}`;
      break;
  }

  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
