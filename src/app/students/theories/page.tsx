import { TheoriesGrid } from "@/app/_general/components/theories/theories-grid";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { Header2 } from "@/app/_general/components/typography";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// const codeString = "int resultado = promedio / 30;";
// <SyntaxHighlighter language="cpp" style={docco}>
//   {codeString}
// </SyntaxHighlighter>

const Theories = () => (
  <LayoutWithSidePanel>
    <Header2>Unidades teóricas</Header2>
    <TheoriesGrid />
  </LayoutWithSidePanel>
);

export default Theories;
