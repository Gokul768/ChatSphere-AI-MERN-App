import { GoogleGenerativeAI } from "@google/generative-ai";
import { TryCatch } from "../middlewares/error.js";

// Load Gemini API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI CHAT FUNCTION
export const chatWithAI = TryCatch(async (req, res) => {
  const { message } = req.body;

  // validation
  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  try {
    // select model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // send response
    return res.status(200).json({
      success: true,
      reply: text,
    });

  } catch (error) {
    console.log("AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI service failed",
    });
  }
});