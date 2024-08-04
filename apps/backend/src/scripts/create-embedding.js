import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { connectToMongoDB } from "../lib/mongodb.js";
import { GOOGLE_AI_API_KEY } from "../config/env.config.js";
import customStudentInfoSplitter from "../utilities/custom-student-splitter.js";

const testSplitterConfig = {
  general_info: {
    chunkSize: 1000,
    chunkOverlap: 100,
    separators: ["\n\n", "\n### ", "\n#### ", "\n- ", "\n", " ", ""],
  },
};

async function createEmbeddings() {
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

      let output;
      if (fileName == "student-info.md") {
        output = customStudentInfoSplitter(document).map((text) => ({
          pageContent: text,
        }));
      } else {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage(
          "markdown",
          testSplitterConfig[collectionName]
        );
        output = await splitter.createDocuments([document]);
      }

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

export default createEmbeddings;
