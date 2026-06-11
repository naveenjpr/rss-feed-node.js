const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AiResponse = mongoose.model("AiResponse", aiSchema);

module.exports = { AiResponse };
