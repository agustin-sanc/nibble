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

export default async function Exercise({
  params: { exerciseId },
}: {
  params: { exerciseId: string };
}) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(exerciseId) },
    include: { exampleTests: true },
  });

  return (
    <LayoutWithSidePanel>
      {!exercise && <p>No se encontró el ejercicio.</p>}

      {exercise && (
        <>
          <Header2>{exercise?.name}</Header2>
          <p>{exercise?.description}</p>

          <Header3>Algunos casos de prueba</Header3>

          <Accordion type="multiple" collapsible>
            {exercise?.exampleTests.map((example, index) => (
              <AccordionItem
                key={String(example.id)}
                value={String(example.id)}
              >
                <AccordionTrigger>Caso de prueba {index + 1}</AccordionTrigger>

                <AccordionContent className="flex gap-4">
                  <div className="flex w-1/3 flex-col gap-2">
                    <p className="font-semibold">Entrada</p>

                    <div className="rounded border p-2">
                      <Code>{example.input}</Code>
                    </div>
                  </div>

                  <div className="flex w-1/3 flex-col gap-2">
                    <p className="font-semibold">Resultado</p>

                    <div className="rounded border p-2">
                      <Code>{example.output}</Code>
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

          <Header3>Solución</Header3>
          <Textarea className="mb-4 ml-1 mr-3 mt-4 h-[300px] w-[99%]" />
          <Button>Evaluar solución</Button>
        </>
      )}
    </LayoutWithSidePanel>
  );
}
