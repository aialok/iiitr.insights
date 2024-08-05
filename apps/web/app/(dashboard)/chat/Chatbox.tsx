"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradualSpacing from "@/components/magicui/gradual-spacing";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface ChatboxProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const Chatbox: React.FC<ChatboxProps> = ({
  messages,
  isTyping,
  messagesEndRef,
}) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main
      className="chatbox h-[calc(100vh-8rem)] overflow-auto p-6 w-full sm:w-[50%] mx-auto"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "1024px 1024px",
      }}
    >
      <GradualSpacing
        className="font-display text-center text-xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-5xl md:leading-[5rem] max-sm:hidden"
        text={"Ask me Anything about IIIT Ranchi"}
      />

      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.type === "user" ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              {message.content}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <div className="text-gray-400 animate-pulse">searching...</div>
      )}

      <div ref={messagesEndRef} />
    </main>
  );
};

export default Chatbox;
