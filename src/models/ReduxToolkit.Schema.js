const mongoose = require("mongoose");

const ReduxToolkitSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " ReduxToolkit Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " ReduxToolkit Answers  is required"],
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

const ReduxToolkitModel = mongoose.model(
  "ReduxToolkitNotes",
  ReduxToolkitSchema,
);

module.exports = ReduxToolkitModel;
