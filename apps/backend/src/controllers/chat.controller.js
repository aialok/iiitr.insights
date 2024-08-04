import ChatService from "../services/chat.services.js";

const chatService = new ChatService();

export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await chatService.getChatHistory();
    return res.status(200).json(chatHistory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get chat history",
    });
  }
};

export const addChatMessage = async (req, res) => {
    try {
      const { type, text } = req.body;
      if (!type || !text || (type !== 'human' && type !== 'ai')) {
        return res.status(400).json({
          status: "error",
          message: "Invalid message format. Expected {type: 'human'|'ai', text: string}",
        });
      }
      await chatService.addChatMessage({ type, text });
      return res.status(200).json({
        status: "ok",
        message: "Message added successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Failed to add message",
      });
    }
  };
