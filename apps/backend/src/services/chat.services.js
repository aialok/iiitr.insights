import { ChatMessageHistory } from "langchain/memory";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GOOGLE_AI_API_KEY } from "../config/env.config.js";
import VectorSearchService from "./vector-search.services.js";

/**
 * This is just basic implementation of RAG will improve it later.
 */

class ChatService {
  constructor() {
    this.chatHistory = new ChatMessageHistory();
    this.vectorSearchService = new VectorSearchService();
    this.model = new ChatGoogleGenerativeAI({
      apiKey: GOOGLE_AI_API_KEY,
      model: "gemini-pro",
      maxOutputTokens: 1000,
    });
  }

  async getChatHistory() {
    let messages = await this.chatHistory.getMessages();
    messages = JSON.parse(JSON.stringify(messages));
    return messages.map((message) => {
      return {
        type: message.kwargs.additional_kwargs,
        text: message.kwargs.content,
      };
    });
  }

  async addChatMessage(message) {
    const context = await this.vectorSearchService.vectorSearch(
      message.text,
      "student-info"
    );


    const response = await this.model.invoke([
      new SystemMessage({
        content: [
          {
            type: "text",
            text: `You are an AI assistant tasked with answering questions based on the provided context. Your goal is to give accurate, relevant, and concise answers using only the information given. If the context doesn't contain enough information to fully answer the question, say so and explain what additional information would be needed.

            Context:
            ${context}
            
            Question: ${message.text}
            
            Instructions:
            1. Carefully read and understand the context provided above.
            2. Analyze the question in relation to the given context.
            3. Formulate a clear and concise answer based solely on the information in the context.
            4. If the context doesn't provide enough information to fully answer the question, state this clearly and suggest what additional information would be helpful.
            5. Do not use any external knowledge or make assumptions beyond what is explicitly stated in the context.
            6. If the question is not related to the context at all, politely state that the provided information doesn't address the question.
            
            Your response:`,
          },
        ],
      }),
    ]);
    console.log(response);
    await this.chatHistory.addMessage(
      new HumanMessage({
        content: [
          {
            type: "text",
            text: message.text,
          },
        ],
      })
    );
    await this.chatHistory.addMessage(response);
    return response;
  }
}

export default ChatService;
