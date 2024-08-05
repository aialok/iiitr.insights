import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  selectedDocumentType: string;
}

function Header({ selectedDocumentType }: HeaderProps) {
  return (
    <header className="p-2 flex justify-between items-center border-b border-gray-800">
      <h1 className="text-lg font-semibold">iiitr.insights.ai</h1>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
      >
        {selectedDocumentType}
      </motion.div>
    </header>
  );
}

export default Header;
