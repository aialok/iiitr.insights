import React from "react";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";

function TypewriterComponent() {
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
      <TypewriterEffect words={words} />
    </>
  );
}

export default TypewriterComponent;
