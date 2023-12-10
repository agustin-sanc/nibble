"use client";

import React, { type ReactNode } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

type SidePanelProps = {
  showSidePanel: boolean;
  children: ReactNode | ReactNode[];
};

export const SidePanel = ({ showSidePanel, children }: SidePanelProps) => {
  const { user } = useUser();

  return (
    <div
      className={`bg-highlights flex h-full flex-col border-r-2 bg-gray-50 transition-all duration-100 ease-in-out dark:bg-background ${
        showSidePanel ? "w-60 translate-x-0" : "w-0 -translate-x-60"
      }`}
    >
      <div className="mb-5 ml-3 mt-8 flex gap-3">
        <div className="mt-1">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              baseTheme: dark,
            }}
          />
        </div>

        <div>
          <p className="font-bold">{user?.fullName}</p>
          <p className="text-xs">{user?.emailAddresses[0]?.emailAddress}</p>
          <p className="text-xs">
            {user?.publicMetadata.isProfessor ? "Profesor" : "Alumno"}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};
