import React, { type ReactNode } from "react";

type SidePanelProps = {
  showSidePanel: boolean;
  children: ReactNode[];
};

export const SidePanel = ({ showSidePanel, children }: SidePanelProps) => (
  <div
    className={`bg-highlights flex h-full flex-col border-r-2 bg-gray-50 transition-all duration-100 ease-in-out dark:bg-background ${
      showSidePanel ? "w-60 translate-x-0" : "w-0 -translate-x-60"
    }`}
  >
    <h1 className="mb-2 ml-4 mt-4 scroll-m-20 text-xl font-extrabold tracking-tight">
      Nibble
    </h1>

    {children}
  </div>
);
