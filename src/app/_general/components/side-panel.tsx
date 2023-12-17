"use client";

import React, { type ReactNode } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

type SidePanelProps = {
  children: ReactNode | ReactNode[];
};

export const SidePanel = ({ children }: SidePanelProps) => {
  const { user } = useUser();

  return (
    <div className="bg-highlights flex h-full min-w-[270px] flex-col border-r-2 bg-gray-50 dark:bg-background">
      <div className="mb-5 ml-3 mt-8 flex gap-3">
        <div className="ml-1 mt-1">
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
