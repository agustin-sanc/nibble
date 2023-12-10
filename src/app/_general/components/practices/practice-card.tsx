import { Binary, Laptop } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { Badge } from "@/app/_general/components/badge";
import type { Practice, Exercise } from "@prisma/client";

type CompletePractice = Practice & { exercises: Exercise[] };

export const PracticeCard = ({ practice }: { practice: CompletePractice }) => (
  <div className="rounded border p-4">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <Binary />
        <h2 className="ml-2 text-xl font-bold">{practice.name}</h2>
      </div>

      <Badge variant="outline">{practice.exercises.length} ejercicios</Badge>
    </div>

    <p className="pb-5 text-sm">{practice.description}</p>

    <Button className="flex items-center gap-2" variant="outline">
      <Laptop /> Resolver
    </Button>
  </div>
);
