import {Router} from "express";
import { vectorSearch } from "../../controllers/vector-search-controller.js";
import { getChatHistory, addChatMessage } from "../../controllers/chat.controller.js";

const router = Router();
router.get("/vector-search", vectorSearch);
router.get("/chat-history", getChatHistory);
router.post("/chat-message", addChatMessage);

export default router;