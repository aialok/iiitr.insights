'use client'
import React, { useState, useRef, useEffect } from "react";
import Header from "../(header)/Header";
import Footer from "./Footer";
import Chatbox from "./Chatbox";

export interface Message {
  type: "user" | "bot";
  content: string;
}

const Layout: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("General Info");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-screen text-white font-sans">
      <Header selectedDocumentType={selectedDocumentType} />

      <Chatbox
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <Footer
        messages={messages}
        setMessages={setMessages}
        setIsTyping={setIsTyping}
        setSelectedDocumentType={setSelectedDocumentType}
      />
    </div>
  );
};

export default Layout;