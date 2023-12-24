import React, { type ReactNode } from "react";
import { SidePanel } from "@/app/_general/components/side-panel";
import { ScrollArea } from "@/app/_general/components/scroll-area";
import { currentUser } from "@clerk/nextjs";
import { ModeToggle } from "@/app/_general/components/mode-toggle";
import SidePanelItem from "@/app/_general/components/side-panel-item";
import { Home, Layers2, Library, LineChart, Users } from "lucide-react";

const LayoutWithSidePanel = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="flex h-screen">
      <SidePanel>
        <div className="flex h-full flex-col justify-between">
          <div>
            <SidePanelItem href="/" icon={<Home />} label="Inicio" />
            <SidePanelItem href="/courses" icon={<Users />} label="Cursos" />

            <SidePanelItem
              href="/practices"
              icon={<Layers2 />}
              label="Trabajos prácticos"
            />

            <SidePanelItem
              href="/theories"
              icon={<Library />}
              label="Unidades teóricas"
            />

            {user?.publicMetadata.isProfessor === true && (
              <SidePanelItem
                href="/reports"
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
