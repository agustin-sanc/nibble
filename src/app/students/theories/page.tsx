import { TheoriesGrid } from "@/app/_general/components/theories/theories-grid";
import InnerLayout from "@/app/_general/components/inner-layout";
import { Header2 } from "@/app/_general/components/typography";

export default function Theories() {
  return (
    <InnerLayout>
      <Header2>Unidades teóricas</Header2>
      <TheoriesGrid />
    </InnerLayout>
  );
}
