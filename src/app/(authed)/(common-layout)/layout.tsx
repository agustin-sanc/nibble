import "@/app/_common/globals.css";
import { LayoutWithSidePanel } from "@/app/_common/components/layout-with-side-panel";
import { type ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <LayoutWithSidePanel>{children}</LayoutWithSidePanel>
);

export default DashboardLayout;
