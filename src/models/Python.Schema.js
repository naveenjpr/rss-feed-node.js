const mongoose = require("mongoose");

const PythonSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " node js Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " node js Answers  is required"],
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
    default: "",
  },
});

const PythonNotesModel = mongoose.model("PythonNotes", PythonSchema);

module.exports = PythonNotesModel;
