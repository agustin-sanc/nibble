"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";

export const MarkdownViewer = ({ source }: { source: string }) => {
  const { theme } = useTheme();

  return (
    <MarkdownPreview
      source={source}
      wrapperElement={{
        "data-color-mode": theme === "light" ? "light" : "dark",
      }}
    />
  );
};
