import { createClient } from "redis";
import { RedisVectorStore } from "@langchain/redis";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { createRetrievalChain } from "langchain/chains/retrieval";

const client = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});
await client.connect();

const GOOGLE_AI_API_KEY = "AIzaSyB_cTAGe72uyrAlJR9FgeNjVqTOixjHqvw";

const embeddingModel = new GoogleGenerativeAIEmbeddings({
  apiKey: GOOGLE_AI_API_KEY,
  modelName: "text-embedding-004",
});

const vectorStore = new RedisVectorStore(embeddingModel, {
  redisClient: client,
  indexName: "docs",
});

/* Simple standalone search in the vector DB */
const simpleRes = await vectorStore.similaritySearch("redis", 1);
console.log(simpleRes);
/*
[
  Document {
    pageContent: "redis is fast",
    metadata: { foo: "bar" }
  }
]
*/

/* Search in the vector DB using filters */
const filterRes = await vectorStore.similaritySearch("redis", 3, ["qux"]);
console.log(filterRes);
/*
[
  Document {
    pageContent: "consectetur adipiscing elit",
    metadata: { baz: "qux" },
  },
  Document {
    pageContent: "lorem ipsum dolor sit amet",
    metadata: { baz: "qux" },
  }
]
*/

/* Usage as part of a chain */
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: GOOGLE_AI_API_KEY,
});
const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an AI assistant specializing in information about IIIT Ranchi. Use the following context to answer the user's question. If the context doesn't contain relevant information, say you don't have enough information to answer accurately.\n\nContext:\n{context}",
  ],
  ["human", "{input}"],
]);

const combineDocsChain = await createStuffDocumentsChain({
  llm: model,
  prompt: questionAnsweringPrompt,
});

const chain = await createRetrievalChain({
  retriever: vectorStore.asRetriever(),
  combineDocsChain,
});

const chainRes = await chain.invoke({
  input: "Who is Kumari Samridhi?",
});
console.log(chainRes);
/*
  {
    input: 'What did the fox do?',
    chat_history: [],
    context: [
      Document {
        pageContent: 'the quick brown fox jumped over the lazy dog',
        metadata: [Object]
      },
      Document {
        pageContent: 'lorem ipsum dolor sit amet',
        metadata: [Object]
      },
      Document {
        pageContent: 'consectetur adipiscing elit',
        metadata: [Object]
      },
      Document { pageContent: 'redis is fast', metadata: [Object] }
    ],
    answer: 'The fox jumped over the lazy dog.'
  }
*/

await client.disconnect();
