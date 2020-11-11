import { useMemo } from "react";
import { Prism } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/material-light";

interface Props {
  className?: string;
}

export const Pre: React.FC<Props> = ({ children, className }) => {
  const lang = useMemo(() => className.replace(/^lang-/, ""), [className]);

  return (
    <Prism style={style} language={lang}>
      {children}
    </Prism>
  );
};
