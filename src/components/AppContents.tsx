import * as React from "react";

export const AppContents: React.FC = ({ children }) => {
  return (
    <main className="main">
      {children}
      <style jsx>{` .main { flex: 1;`}</style>
    </main>
  );
};
