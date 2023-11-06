import React from "react";
import SidePanelItem from "@/components/side-panel-item";
import { Home, Braces } from "lucide-react";

type SidePanelProps = {
  showSidePanel: boolean;
};

export const SidePanel = ({ showSidePanel }: SidePanelProps) => (
  <div
    className={`bg-highlights flex h-full flex-col border-r-2 bg-gray-50 text-gray-400 transition-all duration-100 ease-in-out ${
      showSidePanel ? "w-60 translate-x-0" : "w-0 -translate-x-60"
    }`}
  >
    <h1 className="ml-4 mt-4 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl">
      Nibble
    </h1>

    <SidePanelItem href="/" icon={<Home />} label="Home" />
    <SidePanelItem href="/exercises" icon={<Braces />} label="Exercises" />
  </div>
);
