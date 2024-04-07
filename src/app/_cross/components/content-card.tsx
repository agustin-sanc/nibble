import { Binary, BookText, Users, Layers2 } from "lucide-react";
import type { Practice, Theory, Exercise, Course } from "@prisma/client";
import { NumberOfExercisesBadge } from "@/app/_cross/components/number-of-exercises-badge";
import { NumberOfStudentsBadge } from "@/app/_cross/components/number-of-students-badge";
import { OpenContent } from "@/app/_cross/components/open-content";
import { type ReactNode } from "react";

type CourseCardProps = {
  type: "course";
  course: Course;
};

type PracticeCardProps = {
  type: "practice";
  practice: Practice & { exercises: Exercise[] };
};

type ExerciseCardProps = {
  type: "exercise";
  exercise: Exercise & { practice: Practice | null };
};

type TheoryCardProps = {
  type: "theory";
  theory: Theory;
};

type ContentCardProps =
  | PracticeCardProps
  | ExerciseCardProps
  | TheoryCardProps
  | CourseCardProps;

export const ContentCard = (props: ContentCardProps) => {
  let name: string, description: string;

  let titleIcon: ReactNode, titleBadge: ReactNode;

  switch (props.type) {
    case "course": {
      titleIcon = <Users />;

      name = props.course.name;
      description = props.course.description;

      const studentsNumber = props.course.studentIds.length;
      titleBadge = <NumberOfStudentsBadge number={studentsNumber} />;

      break;
    }

    case "practice": {
      titleIcon = <Layers2 />;

      name = props.practice.name;
      description = props.practice.description;

      const exercisesNumber = props.practice.exercises.length;
      titleBadge = <NumberOfExercisesBadge number={exercisesNumber} />;

      break;
    }

    case "theory": {
      titleIcon = <BookText />;
      name = props.theory.name;
      description = props.theory.description;

      break;
    }

    case "exercise": {
      titleIcon = <Binary />;
      name = props.exercise.name;
      description = props.exercise.description;

      break;
    }
  }

  return (
    <div className="mb-2 flex w-[48%] flex-col justify-between rounded border p-4">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            {titleIcon}
            <h2 className="ml-2 text-xl font-bold">{name}</h2>
          </div>

          {titleBadge}
        </div>

        <p className="pb-5 text-sm">{description}</p>

        {props.type === "course" && (
          <OpenContent type="course" courseId={props.course.id} />
        )}

        {props.type === "practice" && (
          <OpenContent
            type="practice"
            courseId={props.practice.courseId}
            practiceId={props.practice.id}
          />
        )}

        {props.type === "theory" && (
          <OpenContent
            type="theory"
            courseId={props.theory.courseId}
            theoryId={props.theory.id}
          />
        )}

        {props.type === "exercise" && (
          <OpenContent
            type="exercise"
            courseId={props.exercise.practice?.courseId ?? null}
            practiceId={props.exercise.practiceId}
            exerciseId={props.exercise.id}
          />
        )}
      </div>
    </div>
  );
};
