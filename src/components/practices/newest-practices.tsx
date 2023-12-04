"use client";

import { ArrowRight, Layers2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PracticeCard } from "@/components/practices/practice-card";
import { api } from "@/trpc/react";

export const NewestPractices = ({ className }: { className: string }) => {
  const {
    data: practices,
    isFetching: fetchingPractices,
    isError,
  } = api.practices.getNewest.useQuery();

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between">
        <div className="flex items-center">
          <Layers2 size={30} />

          <h2 className="ml-3 text-3xl font-semibold">
            Últimos trabajos prácticos
          </h2>
        </div>

        <Button className="flex items-center gap-2" variant="outline">
          Ir a todos los trabajos <ArrowRight />
        </Button>
      </div>

      {fetchingPractices ? (
        <p>Obteniendo los últimos trabajos prácticos...</p>
      ) : isError ? (
        <p>No pudimos obtener los últimos trabajos prácticos...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {practices?.map((practice) => (
            <PracticeCard key={practice.id} practice={practice} />
          ))}
        </div>
      )}
    </div>
  );
};
