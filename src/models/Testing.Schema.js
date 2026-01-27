const mongoose = require("mongoose");

const TestingSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " Testing Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " Testing Answers  is required"],
  },

  status: {
    type: Boolean,
    default: true,
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
    default: null,
  },
});

const TestingModel = mongoose.model("TestingNotes", TestingSchema);

module.exports = TestingModel;
