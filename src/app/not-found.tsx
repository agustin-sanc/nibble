"use client";

import { Button } from "./_cross/components/button";
import { Header2 } from "@/app/_cross/components/typography";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="p-10">
      <Header2 className="mb-2">El recurso que buscas no existe.</Header2>
      <Button onClick={() => router.push("/dashboard")}>Ir al dashboard</Button>
    </div>
  );
};

export default NotFoundPage;
