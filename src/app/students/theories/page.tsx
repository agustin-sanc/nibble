import { TheoriesGrid } from "@/app/_general/components/theories/theories-grid";
import Layout from "@/app/_general/components/layout";
import { Header2 } from "@/app/_general/components/typography";

export default function Theories() {
  return (
    <Layout>
      <Header2>Unidades teóricas</Header2>
      <TheoriesGrid />
    </Layout>
  );
}
