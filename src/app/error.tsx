"use client";

import { Button } from "./_cross/components/button";
import { Header2 } from "@/app/_cross/components/typography";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <Header2>Something went wrong!</Header2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default Error;
