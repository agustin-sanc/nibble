"use client";

import React, { useState, type ReactNode } from "react";
import { SidePanel } from "@/app/_general/components/side-panel";
import { ScrollArea } from "@/app/_general/components/scroll-area";
import { AlignLeft } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/app/_general/components/mode-toggle";
import { dark } from "@clerk/themes";
import SidePanelItem from "@/app/_general/components/side-panel-item";
import { Home, Layers2, Library, LineChart } from "lucide-react";

const InnerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [showSidePanel, setShowSidePanel] = useState(true);

  const LeftSection = () => (
    <SidePanel showSidePanel={showSidePanel}>
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
  );

  const TopSection = () => (
    <div className="flex justify-between p-4 pl-8 pr-8 dark:bg-background">
      <AlignLeft
        onClick={() => setShowSidePanel(!showSidePanel)}
        className="cursor-pointer"
        color="#374151"
      />

      <div className="flex items-center gap-4">
        <ModeToggle />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </div>
  );

  const MainSection = () => (
    <ScrollArea>
      <div className="mt-7 flex-1 pl-8 pr-8">{children}</div>
    </ScrollArea>
  );

  const RightSection = () => (
    <div className="flex flex-1 flex-col">
      {/*<TopSection />*/}
      <MainSection />
    </div>
  );

  return (
    <div className="flex h-screen">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default InnerLayout;
