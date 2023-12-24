"use client";

import { Button } from "@/app/_general/components/button";
import { Layers2, Library, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

export const OpenContent = ({
  id,
  type,
}: {
  id: number;
  type: "practice" | "theory" | "course";
}) => {
  const router = useRouter();

  let icon: ReactNode, label: string, href: string;

  switch (type) {
    case "practice":
      icon = <Layers2 />;
      label = "Abrir trabajo práctico";
      href = `/practices/${id}`;
      break;

    case "theory":
      icon = <Library />;
      label = "Abrir unidad teórica";
      href = `/theories/${id}`;
      break;

    case "course":
      icon = <Users />;
      label = "Entrar al curso";
      href = `/courses/${id}`;
      break;
  }

  return (
    <Button
      variant="outline"
      className="flex w-full items-center gap-2"
      onClick={() => router.push(href)}
    >
      {icon} {label}
    </Button>
  );
};
