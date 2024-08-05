"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <main className="chatbox h-[calc(100vh-8rem)] overflow-auto p-6 w-full sm:w-[60%] mx-auto">
      <GradualSpacing
        className="font-display text-center text-xl font-bold tracking-[-0.1em] text-white md:text-5xl md:leading-[5rem] max-sm:hidden mb-8"
        text={"Ask me Anything about IIIT Ranchi"}
      />

      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block p-4 rounded-lg max-w-[80%] ${
                message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"
              }`}
            >
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="relative mt-2 mb-2">
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                          customStyle={{
                            // good backgroud image
                            backgroundColor: '#111111',
                            borderRadius: '0.5rem',
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                        <button
                          onClick={() => navigator.clipboard.writeText(String(children))}
                          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                        >
                          Copy
                        </button>
                      </div>
                    ) : (
                      <code className={`bg-gray-700 px-1 rounded ${className}`} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <div className="text-gray-400 animate-pulse">Searching...</div>
      )}

      <div ref={messagesEndRef} />
    </main>
  );
};

export default Chatbox;