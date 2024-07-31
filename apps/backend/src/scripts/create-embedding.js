import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { connectToMongoDB } from "../lib/mongodb.js";
import { GOOGLE_AI_API_KEY, MONGODB_ATLAS_URI } from "../config/env.config.js";

const testSplitterConfig = {
  student_info: {
    chunkSize: 500,
    chunkOverlap: 50,
    separators: ["\n\n", "\n", " ", ""],
  },
  general_info: {
    chunkSize: 1000,
    chunkOverlap: 100,
    separators: ["\n\n", "\n### ", "\n#### ", "\n- ", "\n", " ", ""],
  },
};

// This function will read all the documents from the _assets/docs directory and create embeddings for each document.
async function createEmbendings() {
  const client = await connectToMongoDB();

  const dbName = "iiitr-insights";

  const docs_dir = "_assets/docs";
  const fileNames = await fsp.readdir(docs_dir);
  console.log(fileNames);
  for (const fileName of fileNames) {
    const collectionName = fileName.split(".")[0];
    const collection = client.db(dbName).collection(collectionName);
    let document;
    if (fileName == "general-info.md" || fileName == "student-info.md") {
      document = await fsp.readFile(`${docs_dir}/${fileName}`, "utf8");
      console.log(`Vectorizing ${fileName}`);

      const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", testSplitterConfig[collectionName]);
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
  }

  console.log("Done: Closing Connection");
  await client.close();
}

export default createEmbendings;
