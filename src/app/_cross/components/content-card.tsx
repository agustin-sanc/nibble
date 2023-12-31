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
  exercise: Exercise & { practice: { courseId: number } };
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

export const ContentCard = ({ type, ...props }: ContentCardProps) => {
  const { name, description } = props[type];

  let titleIcon: ReactNode, titleBadge: ReactNode;

  switch (type) {
    case "course": {
      titleIcon = <Users />;

      const studentsNumber = props.course.studentIds.length;
      titleBadge = <NumberOfStudentsBadge number={studentsNumber} />;

      break;
    }

    case "practice": {
      titleIcon = <Layers2 />;

      const exercisesNumber = props.practice.exercises.length;
      titleBadge = <NumberOfExercisesBadge number={exercisesNumber} />;

      break;
    }

    case "theory": {
      titleIcon = <BookText />;
      break;
    }

    case "exercise": {
      titleIcon = <Binary />;
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

        {type === "course" && (
          <OpenContent type="course" courseId={props[type].id} />
        )}

        {type === "practice" && (
          <OpenContent
            type="practice"
            courseId={props[type].courseId}
            practiceId={props[type].id}
          />
        )}

        {type === "theory" && (
          <OpenContent
            type="theory"
            courseId={props[type].courseId}
            theoryId={props[type].id}
          />
        )}

        {type === "exercise" && (
          <OpenContent
            type="exercise"
            courseId={props[type].practice.courseId}
            practiceId={props[type].practiceId}
            exerciseId={props[type].id}
          />
        )}
      </div>
    </div>
  );
};
