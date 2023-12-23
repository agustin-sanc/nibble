import {
  Code,
  Header2,
  Header3,
  UnorderedList,
} from "@/app/_general/components/typography";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_general/components/accordion";
import Link from "next/link";
import { Fragment } from "react";
import { prisma } from "@/prisma";
import { Solution } from "@/app/practices/[practiceId]/exercises/[exerciseId]/solution";
import { Badge } from "@/app/_general/components/badge";
import { ArrowUpRight } from "lucide-react";

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

              {blackBoxTestExamples.length > 0 && (
                <>
                  <Header3>Ejemplos</Header3>

                  <Accordion type="multiple">
                    {blackBoxTestExamples.map((example, index) => (
                      <AccordionItem
                        key={String(example.id)}
                        value={String(example.id)}
                      >
                        <AccordionTrigger>
                          <div className="flex gap-3">
                            <Badge variant="outline">Caja negra</Badge>
                            Caso de prueba {index + 1}
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="flex gap-4">
                          <div className="flex w-1/3 flex-col gap-2">
                            <p className="font-semibold">Entrada</p>

                            <div className="rounded border p-2">
                              {example.batchInput.map((input) => (
                                <>
                                  <Code className="mb-1">{input}</Code>
                                  <br />
                                </>
                              )) ?? <p>No tiene.</p>}
                            </div>
                          </div>

                          <div className="flex w-1/3 flex-col gap-2">
                            <p className="font-semibold">Resultado</p>

                            <div className="rounded border p-2">
                              {example.batchOutput.map((output) => (
                                <>
                                  <Code className="mb-1">{output}</Code>
                                  <br />
                                </>
                              )) ?? <p>No tiene.</p>}
                            </div>
                          </div>

                          <div className="flex w-1/3 flex-col gap-2">
                            <p className="font-semibold">Descripción</p>
                            <p>{example.description}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              )}

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
