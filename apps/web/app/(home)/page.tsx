"use client";
import React from "react";
import NavbarComponent from "./Navbar";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <>
      <div className="dark-mode min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <NavbarComponent />
        <Hero />
      </div>
    </>
  );
}
