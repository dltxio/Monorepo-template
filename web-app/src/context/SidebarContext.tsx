import React, { useMemo, useState } from "react";

// Create context
export const SidebarContext = React.createContext({});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar
    }),
    [isSidebarOpen, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
