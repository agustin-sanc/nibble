import {
  Code,
  Header2,
  Header3,
  UnorderedList,
} from "@/app/_common/components/typography";

import Link from "next/link";
import { Fragment } from "react";
import { prisma } from "@/app/_common/prisma";
import { ArrowUpRight } from "lucide-react";
import { Solution } from "@/app/(authed)/(custom-layout)/practices/[practiceId]/exercises/[exerciseId]/solution";
import { TestExamples } from "@/app/(authed)/(custom-layout)/practices/[practiceId]/exercises/[exerciseId]/test-examples";

type ExercisePageProps = {
  params: { exerciseId: string; practiceId: string };
};

export default async function Exercise({
  params: { exerciseId, practiceId },
}: ExercisePageProps) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(exerciseId) },
    include: { practice: { include: { theories: true } } },
  });

  const blackBoxTestExamples = await prisma.blackBoxTest.findMany({
    where: { exerciseId: Number(exerciseId), isExample: true },
  });

  const renderCodeWithLineBreaks = (text: string) =>
    text.split("\n").map((line, index) => (
      <Fragment key={index}>
        <Code>{line}</Code>
        <br />
      </Fragment>
    ));

  return (
    <div className="flex flex-col gap-2 px-8 pt-8">
      <div>
        <Link
          href={`/practices/${practiceId}`}
          className="text-xs hover:underline"
        >
          &lt; Volver al trabajo práctico
        </Link>

        <div className="mt-5 flex flex-row items-center justify-between">
          <Header2>{exercise?.name}</Header2>
        </div>
      </div>

      <div className="flex flex-row gap-10">
        <div className="w-[50%]">
          {exercise && (
            <>
              <Header3>Descripción</Header3>
              <p className="mt-4">{exercise?.description}</p>

              <TestExamples examples={blackBoxTestExamples} />

              {exercise.practice.theories.length > 0 && (
                <div>
                  <Header3>Teoría recomendada</Header3>

                  <UnorderedList>
                    {exercise.practice.theories.map((theory) => (
                      <li key={theory.id}>
                        <Link
                          href={`/theories/${theory.id}`}
                          className="flex flex-row items-center hover:underline"
                          target="_blank"
                        >
                          {theory.name}
                          <ArrowUpRight size={20} />
                        </Link>
                      </li>
                    ))}
                  </UnorderedList>
                </div>
              )}
            </>
          )}
        </div>

        <Solution />
      </div>
    </div>
  );
}
