import Layout from "@/app/_general/components/layout";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";
import { CreatePracticeDialog } from "@/app/professors/practices/create-practice-dialog";

export default function Practices() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Header2>Trabajos prácticos</Header2>
        <CreatePracticeDialog />
      </div>

      <PracticesGrid />
    </Layout>
  );
}
