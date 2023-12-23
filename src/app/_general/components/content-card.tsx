import { Binary, BookText } from "lucide-react";
import type { Practice, Exercise } from "@prisma/client";
import { OpenPractice } from "@/app/_general/components/open-practice";
import { type Theory } from "@prisma/client";
import { NumberOfExercisesBadge } from "@/app/_general/components/number-of-exercises-badge";
import { OpenTheory } from "@/app/_general/components/open-theory";

type PracticeCardProps = {
  type: "practice";
  practice: Practice & { exercises: Exercise[] };
};

type TheoryCardProps = {
  type: "theory";
  theory: Theory;
};

export const ContentCard = (props: PracticeCardProps | TheoryCardProps) => {
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
        </div>

        <p className="pb-5 text-sm">{description}</p>

        {props.type === "practice" ? (
          <OpenPractice id={props.practice.id} />
        ) : (
          <OpenTheory id={props.theory.id} />
        )}
      </div>
    </div>
  );
};
