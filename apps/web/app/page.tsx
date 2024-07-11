"use client";
import Image from "next/image";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import React, { useState } from "react";
import { FloatingNav } from "../components/ui/navbar-menu";

export default function Home() {
  const words = [
    { text: "Your" },
    { text: "360°", className: "text-pink-600 dark:text-pink-600" },
    { text: "AI" },
    { text: "Companion" },
    { text: "for" },
    { text: "IIIT", className: "text-pink-600 dark:text-pink-600" },
    { text: "Ranchi", className: "text-pink-600 dark:text-pink-600" },
  ];

  return (
    <>
      <div className="dark-mode min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <FloatingNavDemo />

        <div className="homepage flex flex-col items-center relative w-[80%] h-auto">
          <div className="text-4xl sm:text-9xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            iiitr.insights
          </div>
          <div className="h-16 sm:h-24">
            <div className="text-2xl relative left-0 right-0 text-center mt-4">
              <TypewriterEffect words={words} />
            </div>

            <div className="m-10 flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>Explore here</span>
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: "/about"
     
    },
    {
      name: "Use Cases",
      link: "/contact"
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems}  />
    </div>
  );
}

