import * as React from "react";
import { config } from "../../blog.config";

const ConfigContext = React.createContext(config);

export const ConfigProvider: React.FC = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  return React.useContext(ConfigContext);
};
