import React from "react";
import SidePanelItem from "@/components/side-panel-item";
import { Home, Layers2, Library, LineChart } from "lucide-react";

type SidePanelProps = {
  showSidePanel: boolean;
};

export const SidePanel = ({ showSidePanel }: SidePanelProps) => (
  <div
    className={`bg-highlights flex h-full flex-col border-r-2 bg-gray-50 transition-all duration-100 ease-in-out dark:bg-background ${
      showSidePanel ? "w-60 translate-x-0" : "w-0 -translate-x-60"
    }`}
  >
    <h1 className="mb-2 ml-4 mt-4 scroll-m-20 text-xl font-extrabold tracking-tight">
      Nibble
    </h1>

    <SidePanelItem href="/" icon={<Home />} label="Inicio" />

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

    <SidePanelItem href="/reports" icon={<LineChart />} label="Reportes" />
  </div>
);
