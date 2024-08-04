import { GOOGLE_AI_API_KEY } from "../config/env.config.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { connectToMongoDB } from "../lib/mongodb.js";

class VectorSearchService {
  constructor() {
    this.mongoClient = connectToMongoDB();
  }

  async vectorSearch(queryString, queryType) {
    try {
      console.log("Searching vectors");
      const client = await this.mongoClient;
      console.log(queryString);
      const embeddingModel = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: GOOGLE_AI_API_KEY,
      });

      const dbName = "iiitr-insights";
      const collectionName = queryType;
      const collection = await client.db(dbName).collection(collectionName);

      const vectorStore = new MongoDBAtlasVectorSearch(embeddingModel, {
        collection,
        indexName: "default",
        textKey: "text",
        embeddingKey: "embedding",
      });

      const retriever = vectorStore.asRetriever({
        searchType: "mmr",
        searchKwargs: {
          fetchK: 2,
          lambda: 0.6,
        },
      });

      const retrieverOutput = await retriever.invoke(queryString);

      const data = retrieverOutput.map((result) => {
        return {
          text: result.pageContent,
          metaData: result.metadata,
        };
      });

      // merge the data with the context
      let context = "";
      data.forEach((element) => {
        context += "\n" + element.text + "\n";
      });

      return context;
    } catch (error) {
      console.error("Failed to search vectors", error);
      throw new Error("Failed to search vectors");
    }
  }
}

export default VectorSearchService;
