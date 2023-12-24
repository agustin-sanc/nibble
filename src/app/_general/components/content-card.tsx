import { Binary, BookText } from "lucide-react";
import type { Practice, Theory, Exercise, Course } from "@prisma/client";
import { NumberOfExercisesBadge } from "@/app/_general/components/number-of-exercises-badge";
import { NumberOfStudentsBadge } from "@/app/_general/components/number-of-students-badge";
import { OpenContent } from "@/app/_general/components/open-content";

type PracticeCardProps = {
  type: "practice";
  practice: Practice & { exercises: Exercise[] };
};

type TheoryCardProps = {
  type: "theory";
  theory: Theory;
};

type CourseCardProps = {
  type: "course";
  course: Course;
};

type ContentCardProps = PracticeCardProps | TheoryCardProps | CourseCardProps;

export const ContentCard = (props: ContentCardProps) => {
  const name = props[`${props.type}`].name;
  const description = props[`${props.type}`].description;

  return (
    <div className="mb-2 flex w-[48%] flex-col justify-between rounded border p-4">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            {props.type === "practice" ? <Binary /> : <BookText />}
            <h2 className="ml-2 text-xl font-bold">{name}</h2>
          </div>

          {props.type === "practice" && (
            <NumberOfExercisesBadge practice={props.practice} />
          )}

          {props.type === "course" && (
            <NumberOfStudentsBadge number={props.course.studentIds.length} />
          )}
        </div>

        <p className="pb-5 text-sm">{description}</p>

        <OpenContent id={props[`${props.type}`].id} type={props.type} />
      </div>
    </div>
  );
};
