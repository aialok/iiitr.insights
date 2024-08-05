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
    });
  }

  async getChatHistory() {
    let messages = await this.chatHistory.getMessages();
    messages = JSON.parse(JSON.stringify(messages));
    return messages.map((message) => {
      if (message.kwargs.content[0].type === "human") {
        return {
          type: "human",
          text: message.kwargs.content[0].text,
        };
      } else {
        return {
          type: "ai",
          text: message.kwargs.content,
        };
      }
    });

    return;
  }

  async addChatMessage(message) {
    const context = await this.vectorSearchService.vectorSearch(
      message.text,
      "student-info"
    );

    console.log(context);

    const response = await this.model.invoke([
      new SystemMessage({
        content: [
          {
            type: "text",
            // text: `You are an AI assistant for the Indian Institute of Information Technology (IIIT) Ranchi. Your role is to answer questions about the institute based on the provided context. Your goal is to give accurate, relevant, and concise answers using only the information given. If the context doesn't contain enough information to fully answer the question, say so and explain what additional information would be needed.

            // Context:
            // ${context}
            
            // Question: ${message.text}
            
            // Instructions:
            // 1. Carefully read and understand the context provided above about IIIT Ranchi.
            // 2. Analyze the question in relation to the given context.
            // 3. Formulate a clear and concise answer based solely on the information in the context. This may include details about:
            //    - Student information
            //    - General college information
            //    - Administration
            //    - College clubs and extracurricular activities
            //    - Academic programs and courses
            //    - Placement statistics and opportunities
            //    - Any other relevant information about IIIT Ranchi
            // 4. If the context doesn't provide enough information to fully answer the question, state this clearly and suggest what additional information would be helpful.
            // 5. Do not use any external knowledge or make assumptions beyond what is explicitly stated in the context about IIIT Ranchi.
            // 6. If the question is not related to IIIT Ranchi or the provided information, politely state that the available information doesn't address the question.
            // 7. Maintain a friendly and helpful tone, as expected of a college assistant.
            
            // Your response:`,
            text : `${message.text}`
          },
        ],
      }),
    ]);
    await this.chatHistory.addMessage(
      new HumanMessage({
        content: [
          {
            type: "human",
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
