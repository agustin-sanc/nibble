import "@/app/_cross/globals.css";
import React, { type ReactNode } from "react";
import { SidePanel } from "@/app/_cross/components/side-panel";
import SidePanelItem from "@/app/_cross/components/side-panel-item";
import { Home, Users } from "lucide-react";
import { ModeToggle } from "@/app/_cross/components/mode-toggle";
import { ScrollArea } from "@/app/_cross/components/scroll-area";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex h-screen">
    <SidePanel>
      <div className="flex h-full flex-col justify-between">
        <div>
          <SidePanelItem href="/dashboard" icon={<Home />} label="Inicio" />
          <SidePanelItem href="/courses" icon={<Users />} label="Cursos" />
        </div>

        <ModeToggle />
      </div>
    </SidePanel>

    <ScrollArea className="w-full pl-8 pr-8">
      <div className="first:mt-7 last:mb-7">{children}</div>
    </ScrollArea>
  </div>
);

export default MainLayout;
