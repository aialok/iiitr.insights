import React from "react";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";

function TypewriterComponent() {
  const words = [
    { text: "Your" },
    { text: "360°", className: "text-blue-400 dark:text-blue-400" },
    { text: "AI" },
    { text: "Companion" },
    { text: "for" },
    { text: "IIIT", className: "text-blue-400 dark:text-blue-400" },
    { text: "Ranchi", className: "text-blue-400 dark:text-blue-400" },
  ];

  return (
    <>
      <TypewriterEffect words={words} />
    </>
  );
}

export default TypewriterComponent;
