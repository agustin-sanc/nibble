"use client";

import { Button } from "@/app/_general/components/button";
import { Laptop } from "lucide-react";
import { useRouter } from "next/navigation";

export const OpenPractice = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex w-full items-center gap-2"
      onClick={() => router.push(`/practices/${id}`)}
    >
      <Laptop /> Abrir trabajo práctico
    </Button>
  );
};
