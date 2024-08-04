"use client";
import React from "react";
import NavbarComponent from "./Navbar";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <NavbarComponent />
      <Hero />
    </div>
  );
}
