import { Github } from "@/components/icons/icons";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";
import TypewriterComponent from "./Typewriter";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function Hero() {
  return (
    <>
      <div className="homepage flex flex-col items-center relative w-[80%] h-[50vh]">
        <div className="m-10 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-gray-900  bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Github />
            <Link
              href="https://github.com/aialok/iiitr.insights"
              className="flex items-center "
            >
              Give a star on GitHub
            </Link>
          </HoverBorderGradient>
        </div>
        <div className="text-6xl sm:text-9xl font-bold z-20 text-transparent bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 bg-clip-text py-8 ">
          iiitr.insights
        </div>
        <div className="h-16 sm:h-24">
          <div className="text-2xl relative left-0 right-0 text-center mt-4">
            <TypewriterComponent />
          </div>

          <div className="m-10 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-gray-900 bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <Link href="/chat/fwef" className="flex items-center gap-1 ">
                Chat Now
                <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
                  <ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
                </div>
              </Link>
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
