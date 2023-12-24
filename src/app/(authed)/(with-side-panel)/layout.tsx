import "@/app/_general/globals.css";
import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { type ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <LayoutWithSidePanel>{children}</LayoutWithSidePanel>
);

export default DashboardLayout;
