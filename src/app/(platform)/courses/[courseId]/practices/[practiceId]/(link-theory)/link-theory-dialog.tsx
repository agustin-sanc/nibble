"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { Button } from "@/app/_cross/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_cross/components/select";
import { linkTheoryToPractice } from "./link-theory-action";
import { useRouter } from "next/navigation";
import type { Theory } from "@prisma/client";

type LinkTheoryDialogProps = {
  practiceId: string;
  availableTheories: Theory[];
};

export function LinkTheoryDialog({
  practiceId,
  availableTheories,
}: LinkTheoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTheory, setSelectedTheory] = useState<string | undefined>();
  const router = useRouter();

  const handleLinkTheory = async () => {
    if (selectedTheory) {
      await linkTheoryToPractice(practiceId, selectedTheory);
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Vincular teoría</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular teoría a la práctica</DialogTitle>
        </DialogHeader>
        <Select onValueChange={setSelectedTheory} value={selectedTheory}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una teoría" />
          </SelectTrigger>
          <SelectContent>
            {availableTheories.map((theory) => (
              <SelectItem key={theory.id} value={theory.id}>
                {theory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleLinkTheory} disabled={!selectedTheory}>
          Vincular
        </Button>
      </DialogContent>
    </Dialog>
  );
}
