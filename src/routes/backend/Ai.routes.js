const express = require("express");
const router = express.Router();
const { generateAiResponse } = require("../../controllers/backend/Ai.controller.js");

// Route: POST /api/backend/ai/generate
router.post("/generate", generateAiResponse);

// Export a function that attaches the router to the app
module.exports = app => {
    app.use('/api/backend/ai', router);
};
//http://localhost:5000/api/backend/ai/generate