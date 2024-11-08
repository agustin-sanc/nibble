"use client";

import { Button } from "@/app/_cross/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_cross/components/select";
import { Header3 } from "@/app/_cross/components/typography";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { FC, useCallback, useState } from "react";
import { toast } from "sonner";
import { submitSolution } from "./actions";

interface SolutionProps {
  problemId: string;
  testCases: any[];
}

export const Solution: FC<SolutionProps> = ({ problemId, testCases }) => {
  const { theme } = useTheme();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"c++" | "python">("c++");
  const [error, setError] = useState<
    {
      testNumber: number;
      testStatus: string;
      testType: string;
    }[]
  >([]);

  const handleSubmit = useCallback(async () => {
    const toastId = toast.loading("Enviando solución...");

    try {
      const response = await submitSolution({
        solution: btoa(code),
        language,
        problemId,
        testCases,
      });
      if (response.data.passed) {
        toast.success("¡Solución correcta!", { id: toastId });
      } else {
        toast.error("La solución no es correcta", { id: toastId });
        setError(response.data?.testResults?.map((r) => r) ?? []);
      }
    } catch (error) {
      toast.error("Ocurrió un error al evaluar la solución", { id: toastId });
    }
  }, [code, language, problemId, testCases]);

  return (
    <div className="flex flex-col gap-3">
      <Header3>Solución</Header3>

      <Editor
        height="400px"
        language={language === "c++" ? "cpp" : "python"}
        theme={theme === "light" ? "vs-light" : "vs-dark"}
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />

      <div className="flex flex-row items-center gap-4">
        <Select
          defaultValue={language}
          onValueChange={(value) =>
            value === "c++" || value === "python"
              ? setLanguage(value)
              : console.error("Invalid language")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el lenguaje de programación" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="c++">C++</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit}>Evaluar solución</Button>
      </div>
      {!!error.length && (
        <div className="flex flex-col font-bold">
          Retroalimentación:{" "}
          <div className="flex flex-col gap-1 text-sm font-light">
            {error.map((e, i) => (
              <div key={i} className="mt-2">
                <div>
                  Caso de prueba {e.testNumber} -{" "}
                  {e.testType === "BLACK_BOX"
                    ? "Caja Negra"
                    : e.testType === "WHITE_BOX"
                    ? "Caja Blanca"
                    : "Caja Gris"}
                </div>
                <div className="text-red-500">Estado: {e.testStatus}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
