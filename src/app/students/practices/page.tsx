import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";

export default function Practices() {
  return (
    <LayoutWithSidePanel>
      <Header2>Trabajos prácticos</Header2>
      <PracticesGrid />
    </LayoutWithSidePanel>
  );
}
