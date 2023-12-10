import Layout from "@/app/_general/components/layout";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";
import { Button } from "@/app/_general/components/button";

export default function Practices() {
  return (
    <Layout>
      <div className="flex justify-between">
        <Header2>Trabajos prácticos</Header2>
        <Button>Crear</Button>
      </div>

      <PracticesGrid />
    </Layout>
  );
}
