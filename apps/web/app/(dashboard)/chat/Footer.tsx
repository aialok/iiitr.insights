"use client";
import React, { useState } from "react";
import { Send, TrashIcon, Filter } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface FooterProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDocumentType: React.Dispatch<React.SetStateAction<string>>;
}

const documentTypes = [
  { value: "general-info", label: "General Info" },
  { value: "student-info", label: "Student Info" },
  { value: "faculty-info", label: "Faculty Info" },
  { value: "alumni-info", label: "Alumni Info" },
  { value: "placement-info", label: "Placement Info" },
  { value: "cultural-society-info", label: "Cultural Society Info" },
  { value: "technical-club-info", label: "Technical Club Info" },
  { value: "student-affair-info", label: "Student Affairs Info" },
];

function Footer({
  messages,
  setMessages,
  setIsTyping,
  setSelectedDocumentType,
}: FooterProps) {
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <footer className="fixed bottom-0 left-0 right-0 p-2 bg-gray-900 border-t border-gray-800 w-full sm:w-[60%] rounded-md mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <Filter size={20} />
          </motion.button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about IIIT Ranchi..."
            className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
          >
            <Send size={20} />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setMessages([])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <TrashIcon size={20} />
          </motion.button>
        </form>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-4 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">
                Select Document Type
              </h2>
              {documentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedDocumentType(type.label);
                    setIsModalOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors rounded"
                >
                  {type.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Footer;
