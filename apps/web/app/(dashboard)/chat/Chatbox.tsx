// ignore file eslint for this file
/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, TrashIcon } from "lucide-react";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import Header from "../(header)/Header";
import axios from "axios";

const IIITRChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [documentType, setDocumentType] = useState("general-info");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (input.trim()) {
        setMessages([...messages, { type: "user", content: input }]);
        setInput("");
        setIsTyping(true);
        const response = await axios.post(
          "http://localhost:3000/api/v1/chat-message",
          {
            text: input,
            type: "human",
            documentType: documentType
          }
        );
        console.log(response);
        if (response.data) {
          setMessages((msgs) => [
            ...msgs,
            { type: "bot", content: response.data.data.kwargs.content },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-screen text-white font-sans">
      <Header />

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

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800 w-full sm:w-[55%] mx-auto rounded-md">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-grow flex items-center bg-gray-800 border border-gray-700 rounded-full overflow-hidden">
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="bg-gray-800 text-white px-2 py-2 focus:outline-none"
            >
              <option value="general-info">General Info</option>
              <option value="student-info">Student Info</option>
              <option value="faculty-info">Faculty Info</option>
              <option value="alumni-info">Alumni Info</option>
              <option value="placement-info">Placement Info</option>
              <option value="cultural-society-info">Cultural Society Info</option>
              <option value="technical-club-info">Technical Club Info</option>
              <option value="student-affair-info">Student Affairs Info</option>
            </select>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about IIIT Ranchi..."
              className="flex-grow bg-transparent px-4 py-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
          >
            <Send size={20} />
          </button>
          <button
            type="button"
            onClick={() => setMessages([])}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <TrashIcon size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default IIITRChatbot;