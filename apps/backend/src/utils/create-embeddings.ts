import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoClient } from "mongodb";
import { GOOGLE_AI_API_KEY, MONGODB_ATLAS_URI } from "../config/config";

const client = new MongoClient(MONGODB_ATLAS_URI || "");
const dbName = "docs";
const collectionName = "embeddings";
const collection = client.db(dbName).collection(collectionName);

const docs_dir = "_assets/fcc_docs";
const fileNames = await fsp.readdir(docs_dir);
console.log(fileNames);
for (const fileName of fileNames) {
  const document = await fsp.readFile(`${docs_dir}/${fileName}`, "utf8");
  console.log(`Vectorizing ${fileName}`);

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 512,
    chunkOverlap: 50,
  });
  const output = await splitter.createDocuments([document]);

  await MongoDBAtlasVectorSearch.fromDocuments(
    output,
    new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      apiKey: GOOGLE_AI_API_KEY,
    }),
    {
      collection,
      indexName: "default",
      textKey: "text",
      embeddingKey: "embedding",
    }
  );
}

console.log("Done: Closing Connection");
await client.close();
