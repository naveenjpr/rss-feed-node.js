const mongoose = require("mongoose");

const GitHubActionsSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " GitHubActions Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " GitHubActions Answers  is required"],
  },
  images: [
    {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
  ],

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

const GitHubActionsModel = mongoose.model(
  "GitHubActionsNotes",
  GitHubActionsSchema,
);

module.exports = GitHubActionsModel;
