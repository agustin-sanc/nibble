import { Code, Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_general/components/accordion";
import Link from "next/link";
import { Fragment } from "react";
import { prisma } from "@/prisma";
import { SolutionDialog } from "@/app/students/practices/[practiceId]/exercises/[exerciseId]/solution-dialog";
import { Badge } from "@/app/_general/components/badge";

type ExercisePageProps = {
  params: { exerciseId: string; practiceId: string };
};

export default async function Exercise({
  params: { exerciseId, practiceId },
}: ExercisePageProps) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(exerciseId) },
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
    <LayoutWithSidePanel>
      {!exercise && <p>No se encontró el ejercicio.</p>}

      {exercise && (
        <>
          <Link
            href={`/students/practices/${practiceId}`}
            className="text-xs hover:underline"
          >
            &lt; Volver al trabajo práctico
          </Link>

          <div className="mb-5 mt-5 flex flex-row items-center justify-between">
            <Header2>{exercise?.name}</Header2>
            <SolutionDialog />
          </div>

          <p>{exercise?.description}</p>

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
                              <Code>{input}</Code>
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
                              <Code>{output}</Code>
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
        </>
      )}
    </LayoutWithSidePanel>
  );
}
