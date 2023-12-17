"use client";

import React, { type ReactNode } from "react";
import { SidePanel } from "@/app/_general/components/side-panel";
import { ScrollArea } from "@/app/_general/components/scroll-area";
import { useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/app/_general/components/mode-toggle";
import SidePanelItem from "@/app/_general/components/side-panel-item";
import { Home, Layers2, Library, LineChart } from "lucide-react";

const LayoutWithSidePanel = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  return (
    <div className="flex h-screen">
      <SidePanel>
        <div className="flex h-full flex-col justify-between">
          <div>
            <SidePanelItem
              href={
                user?.publicMetadata.isProfessor ? "/professors" : "/students"
              }
              icon={<Home />}
              label="Inicio"
            />

            <SidePanelItem
              href={
                user?.publicMetadata.isProfessor
                  ? "/professors/practices"
                  : "/students/practices"
              }
              icon={<Layers2 />}
              label="Trabajos prácticos"
            />

            <SidePanelItem
              href={
                user?.publicMetadata.isProfessor
                  ? "/professors/theories"
                  : "/students/theories"
              }
              icon={<Library />}
              label="Unidades teóricas"
            />

            {user?.publicMetadata.isProfessor === true && (
              <SidePanelItem
                href="/professors/reports"
                icon={<LineChart />}
                label="Reportes"
              />
            )}
          </div>

          <ModeToggle />
        </div>
      </SidePanel>

      <ScrollArea className="w-full pl-8 pr-8">
        <div className="first:mt-7 last:mb-7">{children}</div>
      </ScrollArea>
    </div>
  );
};

export default LayoutWithSidePanel;
