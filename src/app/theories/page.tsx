import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { Header2 } from "@/app/_general/components/typography";
import { ContentGrid } from "@/app/_general/components/content-grid";
import { prisma } from "@/prisma";
import { ContentCard } from "@/app/_general/components/content-card";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// const codeString = "int resultado = promedio / 30;";
// <SyntaxHighlighter language="cpp" style={docco}>
//   {codeString}
// </SyntaxHighlighter>

const Theories = async () => {
  const theories = await prisma.theory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const existTheories = theories.length > 0;

  return (
    <LayoutWithSidePanel>
      <Header2>Unidades teóricas</Header2>

      <ContentGrid>
        {!existTheories && <p>No hay unidades teóricas para mostrar.</p>}

        {existTheories &&
          theories.map((theory) => (
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
      </ContentGrid>
    </LayoutWithSidePanel>
  );
};

export default Theories;
