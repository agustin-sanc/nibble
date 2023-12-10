import InnerLayout from "@/app/_general/components/inner-layout";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";

export default function Practices() {
  return (
    <InnerLayout>
      <Header2>Trabajos prácticos</Header2>
      <PracticesGrid />
    </InnerLayout>
  );
}
