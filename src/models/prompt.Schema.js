const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " prompt Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " prompt Answers  is required"],
  },

  status: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  image_public_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: "",
  },
});

const promptModel = mongoose.model(
  "promptNotes",
  promptSchema,
);

module.exports = promptModel;
