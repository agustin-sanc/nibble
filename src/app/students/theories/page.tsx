import { TheoriesGrid } from "@/app/_general/components/theories/theories-grid";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { Header2 } from "@/app/_general/components/typography";

export default function Theories() {
  return (
    <LayoutWithSidePanel>
      <Header2>Unidades teóricas</Header2>
      <TheoriesGrid />
    </LayoutWithSidePanel>
  );
}
