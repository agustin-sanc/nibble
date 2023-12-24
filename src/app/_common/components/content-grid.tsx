import { type ReactNode } from "react";

export const ContentGrid = ({ children }: { children: ReactNode }) => (
  <div className="my-6 flex flex-wrap justify-between gap-5">{children}</div>
);
