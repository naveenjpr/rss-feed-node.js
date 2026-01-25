const mongoose = require("mongoose");

const DockerSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " Docker Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " Docker Answers  is required"],
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

const DockerModel = mongoose.model("DockerNotes", DockerSchema);

module.exports = DockerModel;
