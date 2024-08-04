import GradualSpacing from "@/components/magicui/gradual-spacing";
import React from "react";

function Header({ text }: { text: string }) {
  return (
    <div className="text-white pt-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-4xl font-bold text-white">iiitr.insights</div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="ml-2 text-xl">Sign Out</div>
          </div>
        </div>
      </div>
      <div className="chat-slogal mt-20">
      </div>
    </div>
  );
}

export default Header;
