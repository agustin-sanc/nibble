"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_general/components/dialog";
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

export const SolutionDialog = () => {
  const [code, setCode] = useState("");
  const { theme } = useTheme();
  const [language, setLanguage] = useState<"cpp" | "python">("cpp");

  const submitSolution = () => {
    // TODO: Encode code in base 64

    console.log("Send solution to evaluator server");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Subir solución</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingresa el código de tu solución aquí</DialogTitle>
        </DialogHeader>

        <Select
          onValueChange={(value) =>
            value === "cpp" || value === "python"
              ? setLanguage(value)
              : console.error("Invalid language")
          }
          defaultValue={language}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el lenguaje de programación" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectContent>
        </Select>

        <Editor
          height="400px"
          language={language}
          theme={theme === "light" ? "vs-light" : "vs-dark"}
          value={code}
          onChange={(value) => setCode(value ?? "")}
        />

        <DialogFooter>
          <Button className="mt-2" onClick={submitSolution}>
            Evaluar solución
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
