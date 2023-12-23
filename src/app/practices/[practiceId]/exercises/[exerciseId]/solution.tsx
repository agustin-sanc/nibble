"use client";

import { Button } from "@/app/_general/components/button";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_general/components/select";
import { Header3 } from "@/app/_general/components/typography";

export const Solution = () => {
  const [code, setCode] = useState("");
  const { theme } = useTheme();
  const [language, setLanguage] = useState<"cpp" | "python">("cpp");

  const submitSolution = () => {
    const encodedCode = btoa(code);

    console.log("Send solution to evaluator server");
  };

  return (
    <div className="flex w-[50%] flex-col gap-3">
      <Header3>Solución</Header3>

      <Editor
        height="400px"
        language={language}
        theme={theme === "light" ? "vs-light" : "vs-dark"}
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />

      <div className="flex flex-row items-center gap-4">
        <Select
          defaultValue={language}
          onValueChange={(value) =>
            value === "cpp" || value === "python"
              ? setLanguage(value)
              : console.error("Invalid language")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el lenguaje de programación" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={submitSolution}>Evaluar solución</Button>
      </div>
    </div>
  );
};
