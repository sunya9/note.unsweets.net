import Markdown from "markdown-to-jsx";

export const Md2htmlView = ({ markdown }: { markdown: string }) => (
  <Markdown>{markdown}</Markdown>
);
