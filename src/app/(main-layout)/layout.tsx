import "@/app/_cross/globals.css";
import { MainLayout } from "@/app/_cross/components/main-layout";
import { type ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <MainLayout>{children}</MainLayout>
);

export default DashboardLayout;
