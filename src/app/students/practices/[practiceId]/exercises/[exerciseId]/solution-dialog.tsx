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

export const SolutionDialog = () => {
  const [code, setCode] = useState("");
  const { theme } = useTheme();
  const [language, setLanguage] = useState<"C++" | "Python">("C++");

  const submitSolution = () => {
    console.log("Send solution to evaluator server");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2">Subir solución</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingresa el código de tu solución aquí</DialogTitle>
        </DialogHeader>

        <Editor
          height="400px"
          language="cpp"
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
