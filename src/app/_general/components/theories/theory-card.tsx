import { BookText, Eye } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { type Theory } from "@prisma/client";

export const TheoryCard = ({ theory }: { theory: Theory }) => (
  <div className="rounded border p-4">
    <div className="mb-4 flex items-center">
      <BookText />
      <h2 className="ml-2 text-xl font-bold">{theory.name}</h2>
    </div>

    <p className="pb-5 text-sm">{theory.description}</p>

    <Button variant="outline" className="flex items-center gap-2">
      <Eye /> Leer
    </Button>
  </div>
);
