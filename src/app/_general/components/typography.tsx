import { type ReactNode } from "react";

export const Header1 = ({ children }: { children: ReactNode }) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {children}
  </h1>
);

export const Header2 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h2
    className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
  >
    {children}
  </h2>
);

export const Header3 = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
    {children}
  </h3>
);

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
);
