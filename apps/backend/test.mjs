import { createClient } from "redis";
import { RedisVectorStore } from "@langchain/redis";
import { promises as fsp } from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

// It's better to use an environment variable, even for local testing
const GOOGLE_AI_API_KEY =
  process.env.GOOGLE_AI_API_KEY || "AIzaSyB_cTAGe72uyrAlJR9FgeNjVqTOixjHqvw";

const embeddingModel = new GoogleGenerativeAIEmbeddings({
  apiKey: GOOGLE_AI_API_KEY,
  modelName: "text-embedding-004", // Updated model name
});

const client = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

async function processFile(filePath) {
  try {
    const document = await fsp.readFile(filePath, "utf8");
    console.log(`Vectorizing ${path.basename(filePath)}`);

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 512,
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([document]);

    const vectorStore = await RedisVectorStore.fromDocuments(
      output,
      embeddingModel,
      {
        redisClient: client,
        indexName: "docs",
      }
    );
    console.log(vectorStore);

    console.log(`Finished processing ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

async function processDirectory(dirPath) {
  try {
    const entries = await fsp.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

async function main() {
  try {
    await client.connect();

    const docs_dir = path.resolve("../_assets");
    await processDirectory(docs_dir);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.disconnect();
  }
}

main();
