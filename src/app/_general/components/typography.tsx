import { type ReactNode } from "react";

export const Header1 = ({ children }: { children: ReactNode }) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {children}
  </h1>
);

export const Header2 = ({ children }: { children: ReactNode }) => (
  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    {children}
  </h2>
);
