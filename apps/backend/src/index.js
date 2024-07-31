import express from "express";
import createEmbendings from "./scripts/create-embedding.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

app.get("/create-embeddings", async (req, res) => {
  try {
    await createEmbendings();
    return res.status(200).json({
      status: "ok",
      message: "Embeddings created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create embeddings",
    });
  }
});

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
