import * as React from "react";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="flex">
      {children}
      <style jsx>{`
        .flex {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};
