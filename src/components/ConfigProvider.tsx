import * as React from "react";
import { config } from "../../blog.config";

const { Provider } = React.createContext(config);

export const ConfigProvider: React.FC = ({ children }) => {
  return <Provider value={config}>{children}</Provider>;
};
