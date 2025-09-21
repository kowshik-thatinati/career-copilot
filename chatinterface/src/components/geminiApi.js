import axios from 'axios';

// ✅ Just put your key here
const GEMINI_API_KEY = 'AIzaSyCrfzvhqp17U0epj2GU8PxHQvS9qBQAMNw'; 
const GEMINI_API_URL = 'https://api.generativeai.google/v1beta2/models/text-bison-001:generateText';

export async function getGeminiResponse(prompt) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        prompt: { text: prompt }, // Gemini expects an object with "text"
        temperature: 0.7,
        maxOutputTokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data?.candidates?.[0]?.content || "Sorry, I couldn't generate a response.";
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "Sorry, something went wrong with Gemini API.";
  }
}
