require("dotenv").config();
const { AiResponse } = require("../../models/Ai.Schema.js");
const OpenAI = require("openai");


// Initialize OpenAI client with Groq API details
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const generateAiResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, error: "Prompt is required" });
        }

        // Call Groq API
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Aap apni zaroorat ke hisaab se model change kar sakte hain
            messages: [{ role: "user", content: prompt }],
        });

        const aiText = completion.choices[0].message.content;

        // Save prompt and response to Database
        const savedResponse = await AiResponse.create({
            prompt: prompt,
            response: aiText,
        });

        // Send the generated text back to the frontend
        res.status(200).json({
            success: true,
            data: savedResponse,
        });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = { generateAiResponse };
