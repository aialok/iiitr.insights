import React from "react";

function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-800">
      <h1 className="text-xl font-semibold">iiitr.insights.ai</h1>
      <button className="text-gray-400 hover:text-white transition-colors">
        Sign Out
      </button>
    </header>
  );
}

export default Header;
