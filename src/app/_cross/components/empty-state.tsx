import { type ReactNode } from "react";
import { Header4 } from "@/app/_cross/components/typography";

export const EmptyState = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => (
  <div
    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    x-chunk="dashboard-02-chunk-1"
  >
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <Header4>{title}</Header4>
      {children}
    </div>
  </div>
);
