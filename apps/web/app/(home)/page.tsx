import React from "react";
import NavbarComponent from "./Navbar";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <NavbarComponent />
      <Hero />
    </div>
  );
}
