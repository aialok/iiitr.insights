import {Router} from "express";
import { vectorSearch } from "../../controllers/vector-search-controller.js";

const router = Router();
router.get("/vector-search", vectorSearch);

export default router;