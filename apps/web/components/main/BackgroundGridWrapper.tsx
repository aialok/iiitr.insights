import React from "react";

function BackgroundGridWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark-mode min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative text-white">
      {children}
    </div>
  );
}

export default BackgroundGridWrapper;
