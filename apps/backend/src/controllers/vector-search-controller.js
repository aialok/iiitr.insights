import VectorSearchService from "../services/vector-search.services.js";

const vectorSearchService = new VectorSearchService();

export const vectorSearch = async (req, res) => {
    try {
        const queryString = req.query.text;
        const queryType = req.query.type;
        const data = await vectorSearchService.vectorSearch(queryString, queryType);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        status: "error",
        message: "Failed to search vectors",
        });
    }
};