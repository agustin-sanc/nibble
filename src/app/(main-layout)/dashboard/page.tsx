import { Header1 } from "@/app/_cross/components/typography";
import { MotivationalQuotes } from "@/app/_cross/components/motivational-quotes";
import { LatestPractices } from "@/app/_cross/components/latest-practices";
import { NewestTheories } from "@/app/_cross/components/newest-theories";

const Dashboard = () => (
  <>
    <Header1>Bienvenido a Nibble!</Header1>
    <MotivationalQuotes />
    <LatestPractices />
    <NewestTheories />
  </>
);

export default Dashboard;
