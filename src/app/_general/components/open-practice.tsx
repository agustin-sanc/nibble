"use client";

import { Button } from "@/app/_general/components/button";
import { Laptop } from "lucide-react";
import { useRouter } from "next/navigation";

export const OpenPractice = ({ practiceId }: { practiceId: number }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => router.push(`/practices/${practiceId}`)}
    >
      <Laptop /> Abrir trabajo práctico
    </Button>
  );
};
