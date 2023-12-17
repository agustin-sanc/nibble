import { prisma } from "@/prisma";
import { Code, Header2, Header3 } from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { Button } from "@/app/_general/components/button";
import { Textarea } from "@/app/_general/components/text-area";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_general/components/accordion";
import Link from "next/link";
import { Fragment } from "react";

export default async function Exercise({
  params: { exerciseId, practiceId },
}: {
  params: { exerciseId: string; practiceId: string };
}) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(exerciseId) },
    include: { exampleTests: true },
  });

  // import SyntaxHighlighter from "react-syntax-highlighter";
  // import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
  // const codeString = "int resultado = promedio / 30;";
  // <SyntaxHighlighter language="cpp" style={docco}>
  //   {codeString}
  // </SyntaxHighlighter>

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

          <Header2 className="mt-5">{exercise?.name}</Header2>
          <p>{exercise?.description}</p>

          {exercise?.exampleTests.length > 0 && (
            <>
              <Header3>Ejemplos</Header3>
              <Accordion type="multiple" collapsible>
                {exercise?.exampleTests.map((example, index) => (
                  <AccordionItem
                    key={String(example.id)}
                    value={String(example.id)}
                  >
                    <AccordionTrigger>
                      Caso de prueba {index + 1}
                    </AccordionTrigger>

                    <AccordionContent className="flex gap-4">
                      <div className="flex w-1/3 flex-col gap-2">
                        <p className="font-semibold">Entrada</p>

                        <div className="rounded border p-2">
                          {renderCodeWithLineBreaks(example.input)}
                        </div>
                      </div>

                      <div className="flex w-1/3 flex-col gap-2">
                        <p className="font-semibold">Resultado</p>

                        <div className="rounded border p-2">
                          {renderCodeWithLineBreaks(example.output)}
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

          <Header3>Solución</Header3>
          <Textarea className="mb-4 ml-1 mr-3 mt-4 h-[300px] w-[99%] font-mono" />
          <Button>Evaluar solución</Button>
        </>
      )}
    </LayoutWithSidePanel>
  );
}
