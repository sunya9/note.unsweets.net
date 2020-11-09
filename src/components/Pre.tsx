import { Light } from "react-syntax-highlighter";
import vs2015 from "react-syntax-highlighter/dist/cjs/styles/hljs/vs2015";

export const Pre: React.FC = ({ children }) => {
  return <Light style={vs2015}>{children}</Light>;
};
