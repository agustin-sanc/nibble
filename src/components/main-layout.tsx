"use client";

import React, { useState, type ReactNode } from "react";
import { SidePanel } from "@/components/side-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlignLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [showSidePanel, setShowSidePanel] = useState(true);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  return (
    <div className="flex h-screen">
      <SidePanel showSidePanel={showSidePanel} />

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between bg-gray-50 p-4 pl-8 pr-8">
          <AlignLeft
            onClick={toggleSidePanel}
            className="cursor-pointer"
            color="#374151"
          />

          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <ScrollArea>
          <div className="mt-7 flex-1 pl-8 pr-8">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MainLayout;
