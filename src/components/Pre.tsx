import { Light } from "react-syntax-highlighter";
import vs2015 from "react-syntax-highlighter/dist/cjs/styles/hljs/vs2015";

interface Props {
  className?: string;
}

export const Pre: React.FC<Props> = ({ children, className }) => {
  return (
    <Light style={vs2015} language={className}>
      {children}
    </Light>
  );
};
