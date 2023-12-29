"use client";

import { Button } from "./_cross/components/button";
import { Header2 } from "@/app/_cross/components/typography";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="p-10">
    <Header2 className="mb-2">Ups! Tuvimos un problema...</Header2>
    <Button onClick={reset}>Reintentar</Button>
  </div>
);

export default Error;
