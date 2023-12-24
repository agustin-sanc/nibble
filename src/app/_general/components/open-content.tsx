import { Button } from "@/app/_general/components/button";
import Link from "next/link";

export const OpenContent = ({
  id,
  type,
}: {
  id: number;
  type: "practice" | "theory" | "course";
}) => {
  let label: string, href: string;

  switch (type) {
    case "practice":
      label = "Abrir trabajo práctico";
      href = `/practices/${id}`;
      break;

    case "theory":
      label = "Abrir unidad teórica";
      href = `/theories/${id}`;
      break;

    case "course":
      label = "Entrar al curso";
      href = `/courses/${id}`;
      break;
  }

  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
