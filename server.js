const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

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

// Generate smart chat title based on first message
app.post("/api/generate-title", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "❌ Message is required" });
  }

  const titlePrompt = `Create a short, professional title (maximum 4 words) for this conversation: "${message}". 
  
Rules:
- Return ONLY the title, no quotes, no extra text
- Use title case (capitalize first letter of each word)
- Be specific and descriptive
- Focus on the main topic

Examples:
"How do I learn Python?" → "Python Learning Guide"
"Best universities for CS?" → "Computer Science Universities"
"Career advice for data science" → "Data Science Career Path"

Title:`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: titlePrompt }],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    let title = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "New Conversation";
    
    // Clean up the title - remove quotes, extra punctuation
    title = title.replace(/["'`]/g, '').replace(/[.!?]$/g, '').trim();
    
    // Limit to 50 characters
    if (title.length > 50) {
      title = title.substring(0, 47) + '...';
    }

    console.log(`✅ Generated title: "${title}" for message: "${message.substring(0, 50)}..."`);
    
    res.json({ title });
  } catch (err) {
    console.error("❌ Title Generation Error:", err.message);
    res.json({ title: "New Conversation" });
  }
});

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "❌ Prompt is required" });
  }

  // System prompt to restrict to education and career topics
  const systemPrompt = `You are Career Copilot, an AI assistant specialized ONLY in education, career guidance, job search, skills development, academic advice, and professional growth.

STRICT RULES:
1. ONLY answer questions related to: education, careers, jobs, skills, courses, degrees, certifications, resume help, interview prep, career planning, study tips, academic subjects, professional development, workplace advice, and career transitions.
2. If the user asks about movies, entertainment, sports, politics, personal life, cooking, travel, or ANY non-education/career topic, politely decline and redirect them.
3. Always be helpful, professional, and encouraging for education/career questions.

User Question: ${prompt}

Response:`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: systemPrompt }],
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

app.listen(PORT, "localhost", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
