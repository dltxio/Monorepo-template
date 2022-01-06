import React from "react";

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto">
      <main>
        <div className=" grid px-6 mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Main;
