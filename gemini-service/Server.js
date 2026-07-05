const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("AI Chat Service Running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Message cannot be empty.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let result;

    // Retry up to 3 times if Gemini is busy
    for (let i = 0; i < 3; i++) {
      try {
        result = await model.generateContent(message);
        break;
      } catch (err) {
        if (err.status === 503 && i < 2) {
          console.log(`Gemini busy... Retry ${i + 1}`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }
        throw err;
      }
    }

    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text,
    });

  } catch (error) {

    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    if (error.status === 503) {
      return res.status(503).json({
        reply:
          "⚠️ Gemini is currently experiencing high demand. Please try again after a few seconds.",
      });
    }

    res.status(500).json({
      reply: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Gemini Server running on port ${PORT}`);
});