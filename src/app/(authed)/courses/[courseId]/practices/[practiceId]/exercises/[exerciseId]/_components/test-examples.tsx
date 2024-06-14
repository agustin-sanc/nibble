import { Code, Header3 } from "@/app/_cross/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_cross/components/accordion";
import { Badge } from "@/app/_cross/components/badge";
import { type BlackBoxTest } from "@prisma/client";
import type { GrayBoxTest, WhiteBoxTest } from "@prisma/client";

type Test = BlackBoxTest | WhiteBoxTest | GrayBoxTest;
type TestExamplesProps = { examples: Test[] };

export const TestExamples = ({ examples }: TestExamplesProps) => {
  const isBlackBoxTest = (test: Test) => "batchInput" in test;
  const isGrayBoxTest = (test: Test) => "functionName" in test;

  const showBlackBoxTest = (test: BlackBoxTest) => (
    <>
      <div className="flex w-1/3 flex-col gap-2">
        <p className="font-semibold">Entrada</p>

        <div className="rounded border p-2">
          {test.batchInput.map((input) => (
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
          {test.batchOutput.map((output) => (
            <>
              <Code className="mb-1">{output}</Code>
              <br />
            </>
          )) ?? <p>No tiene.</p>}
        </div>
      </div>

      <div className="flex w-1/3 flex-col gap-2">
        <p className="font-semibold">Descripción</p>
        <p>{test.description}</p>
      </div>
    </>
  );

  return (
    <>
      <Header3>Ejemplos</Header3>

      <Accordion type="multiple">
        {examples.map((example, index) => (
          <AccordionItem key={String(example.id)} value={String(example.id)}>
            <AccordionTrigger>
              <div className="flex gap-3">
                <Badge variant="outline">
                  {isBlackBoxTest(example)
                    ? "Caja negra"
                    : isGrayBoxTest(example)
                    ? "Caja gris"
                    : "Caja blanca"}
                </Badge>
                Caso de prueba {index + 1}
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex gap-4">
              {isBlackBoxTest(example) &&
                showBlackBoxTest(example as BlackBoxTest)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
