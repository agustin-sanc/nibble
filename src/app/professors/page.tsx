import { MotivationalQuotes } from "@/app/_general/components/motivational-quotes";
import { NewestPractices } from "@/app/_general/components/practices/newest-practices";
import Layout from "@/app/_general/components/layout";
import { NewestTheories } from "@/app/_general/components/theories/newest-theories";
import { Header1 } from "../_general/components/typography";

export default function ProfessorsDashboard() {
  return (
    <Layout>
      <Header1>Bienvenido a Nibble!</Header1>
      <MotivationalQuotes className="mt-3" />
      <NewestPractices className="mt-7" />
      <NewestTheories className="mt-7" />
    </Layout>
  );
}
