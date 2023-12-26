import { Header1 } from "@/app/_cross/components/typography";
import { MotivationalQuotes } from "@/app/_cross/components/motivational-quotes";
import { NewestPractices } from "@/app/_cross/components/newest-practices";
import { NewestTheories } from "@/app/_cross/components/newest-theories";

const Dashboard = () => (
  <>
    <Header1> Bienvenido a Nibble!</Header1>
    <MotivationalQuotes className="mt-3" />
    {/*//TODO: Add card that shows quantity of solved exercises.*/}
    {/*//TODO: Add card that shows another user data.*/}
    <NewestPractices className="mt-7" />
    <NewestTheories className="mt-7" />
  </>
);

export default Dashboard;
