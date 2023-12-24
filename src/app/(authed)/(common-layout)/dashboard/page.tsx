import { Header1 } from "@/app/_common/components/typography";
import { MotivationalQuotes } from "@/app/_common/components/motivational-quotes";
import { NewestPractices } from "@/app/_common/components/newest-practices";
import { NewestTheories } from "@/app/_common/components/newest-theories";

const Dashboard = () => (
  <>
    <Header1> Bienvenido a Nibble!</Header1>
    <MotivationalQuotes className="mt-3" />
    <NewestPractices className="mt-7" />
    <NewestTheories className="mt-7" />
  </>
);

export default Dashboard;
