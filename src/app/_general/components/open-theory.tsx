"use client";

import { Button } from "@/app/_general/components/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export const OpenTheory = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex w-full items-center gap-2"
      onClick={() => router.push(`/theories/${id}`)}
    >
      <Eye /> Abrir unidad teórica
    </Button>
  );
};
