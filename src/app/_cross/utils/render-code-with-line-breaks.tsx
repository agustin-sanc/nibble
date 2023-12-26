import { Fragment } from "react";
import { Code } from "@/app/_cross/components/typography";

export const renderCodeWithLineBreaks = (text: string) =>
  text.split("\n").map((line, index) => (
    <Fragment key={index}>
      <Code>{line}</Code>
      <br />
    </Fragment>
  ));
