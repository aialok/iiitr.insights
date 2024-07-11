// import { GOOGLE_AI_API_KEY } from "../config/config";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
// import { connectToMongoDB } from "../lib/mongodb";

// export const vectorSearch = async (query: string) => {
//   const embeddingModel = new GoogleGenerativeAIEmbeddings({
//     apiKey: GOOGLE_AI_API_KEY,
//     modelName: "text-embedding-004", // Make sure this is the correct model name
//   });

//   const client = await connectToMongoDB();
//   const dbName = "docs";
//   const collectionName = "embeddings";
//   const collection = client.db(dbName).collection(collectionName);

//   const vectorStore = new MongoDBAtlasVectorSearch(embeddingModel, {
//     collection,
//     indexName: "default",
//     textKey: "text",
//     embeddingKey: "embedding",
//   });

//   try {
//     const retriever = vectorStore.asRetriever({
//       searchType: "mmr",
//       searchKwargs: {
//         fetchK: 20,
//         lambda: 0.1,
//       },
//     });

//     const retrieverOutput = await retriever.invoke(query);

//     const data = retrieverOutput.map((doc) => {
//       return {
//         text: doc.pageContent,
//         metadata: doc.metadata,
//       };
//     });

//     return data;
//   } catch (error) {
//     console.error("Error in vector search:", error);
//     throw error;
//   } finally {
//     await client.close();
//   }
// };

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


const GOOGLE_AI_API_KEY = "AIzaSyB_cTAGe72uyrAlJR9FgeNjVqTOixjHqvw";

export async function retrieveInfo(query: string) {
  await client.connect();
  const embeddingModel = new GoogleGenerativeAIEmbeddings({
    apiKey: GOOGLE_AI_API_KEY,
    modelName: "text-embedding-004",
  });

  const vectorStore = new RedisVectorStore(embeddingModel, {
    redisClient: client,
    indexName: "docs",
  });

  /* Simple standalone search in the vector DB */
  // const simpleRes = await vectorStore.similaritySearch(query, 5);
  // console.log(simpleRes);
  /*
  [
    Document {
      pageContent: "redis is fast",
      metadata: { foo: "bar" }
    }
  ]
  */
  /* Search in the vector DB using filters */
  const filterRes = await vectorStore.similaritySearch(query, 5);
  console.log(filterRes);

  // combine the filerRes by \n and return

  let context = "";

  for (let i = 0; i < filterRes.length; i++) {
    context += filterRes[i].pageContent + "\n";
  }

  const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: GOOGLE_AI_API_KEY,
});

// send the response to model and get Result

console.log(context)

const response = await model.invoke([
  [
    "system",
    `You are an AI assistant specializing in information about IIIT Ranchi. Use the following context carefull and completely to answer the user's question and add little response from your side. If the context doesn't contain relevant information, say you don't have enough information to answer accurately.\n\nContext:\n${context} \n \n 
    Question :\n ${query}`,
  ],
])




  return response;
}
/* Usage as part of a chain */
// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-pro",
//   maxOutputTokens: 2048,
//   apiKey: GOOGLE_AI_API_KEY,
// });
// const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     "You are an AI assistant specializing in information about IIIT Ranchi. Use the following context to answer the user's question. If the context doesn't contain relevant information, say you don't have enough information to answer accurately.\n\nContext:\n{context}",
//   ],
//   ["human", "{input}"],
// ]);

// const combineDocsChain = await createStuffDocumentsChain({
//   llm: model,
//   prompt: questionAnsweringPrompt,
// });

// const chain = await createRetrievalChain({
//   retriever: vectorStore.asRetriever(),
//   combineDocsChain,
// });

// const chainRes = await chain.invoke({
//   input: "Who is Kumari Samridhi?",
// });
