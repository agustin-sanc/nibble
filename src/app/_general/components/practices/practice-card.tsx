"use client";

import { Binary, Laptop } from "lucide-react";
import { Button } from "@/app/_general/components/button";
import { Badge } from "@/app/_general/components/badge";
import type { Practice, Exercise } from "@prisma/client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type PracticeCardProps = {
  practice: Practice & { exercises: Exercise[] };
};

export const PracticeCard = ({ practice }: PracticeCardProps) => {
  const { user } = useUser();

  return (
    <div className="rounded border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Binary />
          <h2 className="ml-2 text-xl font-bold">{practice.name}</h2>
        </div>

        <Badge variant="outline">{practice.exercises.length} ejercicios</Badge>
      </div>

      <p className="pb-5 text-sm">{practice.description}</p>

      <Link
        href={`/${
          !user?.publicMetadata.isProfessor ? "students" : "professors"
        }/practices/${practice.id}`}
      >
        <Button className="flex items-center gap-2" variant="outline">
          <Laptop /> Ver trabajo práctico
        </Button>
      </Link>
    </div>
  );
};
