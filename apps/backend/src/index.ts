import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectToMongoDB } from "./lib/mongodb";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import { poweredBy } from "hono/powered-by";
import { retrieveInfo } from "./services/vector-search";

const app = new Hono();

//-------------Middleware------------

app.use("*", poweredBy());
app.use("*", timing());
app.use("*", logger());

//-----------------------------------

app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "iiitr.insight backend is running successfully",
    success: true,
  });
});

app.get("/vectorSearch", async (c) => {
  const text = c.req.parseBody;
  const response = await retrieveInfo("Who is kumari Samridhi?");

  return c.json({
    status: "ok",
    message: "Query response",
    data: response,
    success: true,
  });
});



serve(app, async (info) => {
  await connectToMongoDB();
  console.log(`Server is running on http://localhost:${info.port}`);
});
