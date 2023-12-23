"use client";

import { BookText, Eye } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { type Theory } from "@prisma/client";
import { useRouter } from "next/navigation";

export const TheoryCard = ({ theory }: { theory: Theory }) => {
  const router = useRouter();

  return (
    <div className="rounded border p-4">
      <div className="mb-4 flex items-center">
        <BookText />
        <h2 className="ml-2 text-xl font-bold">{theory.name}</h2>
      </div>

      <p className="pb-5 text-sm">{theory.description}</p>

      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => router.push(`/students/theories/${theory.id}`)}
      >
        <Eye /> Leer
      </Button>
    </div>
  );
};
