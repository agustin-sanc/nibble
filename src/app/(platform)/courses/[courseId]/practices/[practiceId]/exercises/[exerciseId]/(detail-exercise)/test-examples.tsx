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
  const isWhiteBoxTest = (test: Test) => "test" in test;

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

  const showGrayBoxTest = (test: GrayBoxTest) => (
    <>
      <div className="flex w-1/3 flex-col gap-2">
        <p className="font-semibold">Función</p>
        <div className="rounded border p-2">
          <Code>{test.functionName}</Code>
        </div>
      </div>

      <div className="flex w-1/3 flex-col gap-2">
        <p className="font-semibold">Argumentos</p>
        <div className="rounded border p-2">
          {test.functionArgs?.map((arg) => (
            <div key={arg.id} className="mb-1">
              <Code>{`${arg.value} (${arg.type.toLowerCase()})`}</Code>
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-1/3 flex-col gap-2">
        <p className="font-semibold">Respuesta esperada</p>
        <div className="rounded border p-2">
          <Code>{`${test.functionResponse?.value} (${test.functionResponse?.type.toLowerCase()})`}</Code>
        </div>
        {test.description && (
          <>
            <p className="font-semibold">Descripción</p>
            <p>{test.description}</p>
          </>
        )}
      </div>
    </>
  );

  const showWhiteBoxTest = (test: WhiteBoxTest) => (
    <>
      <div className="flex w-2/3 flex-col gap-2">
        <p className="font-semibold">Código de prueba</p>
        <div className="rounded border p-2">
          <Code>{test.test}</Code>
        </div>
      </div>

      <div className="flex w-1/3 flex-col gap-2">
        {test.description && (
          <>
            <p className="font-semibold">Descripción</p>
            <p>{test.description}</p>
          </>
        )}
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
              {isBlackBoxTest(example) && showBlackBoxTest(example as BlackBoxTest)}
              {isGrayBoxTest(example) && showGrayBoxTest(example as GrayBoxTest)}
              {isWhiteBoxTest(example) && showWhiteBoxTest(example as WhiteBoxTest)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
