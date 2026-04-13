const mongoose = require("mongoose");

const nginxSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, "nginx Question is required"],
  },
  Answers: {
    type: String,
    required: [true, "nginx Answers is required"],
  },

  status: {
    type: Boolean,
    default: true,
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

const nginxModel = mongoose.model("nginxNotes", nginxSchema);

module.exports = nginxModel;
