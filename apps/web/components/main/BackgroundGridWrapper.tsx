"use client";
import React from "react";
import Meteors from "../../components/magicui/metoers";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      <div
        className="w-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 5%, transparent 0%),
            radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 5%, transparent 0%)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0, 50px 50px",
        }}
      >
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  md:shadow-xl">
          <Meteors number={50} />

          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundWrapper;
