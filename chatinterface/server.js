import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

const GEMINI_API_KEY = "AIzaSyBtX4Fw5LL3kp0goQnEQgwOQ1AsbcI4kno"; // replace

const GEMINI_API_URL = 
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Gemini Proxy Server is running!");
});

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "❌ Prompt is required" });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Gemini raw response:", response.data);

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No text returned from Gemini.";

    res.json({ text });
  } catch (err) {
    console.error("❌ Gemini API Error:", err.message);
    if (err.response) console.error("🔍 Error details:", err.response.data);
    res.status(500).json({ text: "Sorry, something went wrong with Gemini API." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
