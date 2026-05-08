const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " vocabulary Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " vocabulary Answers  is required"],
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
    default: null,
  },
});

const vocabularyModel = mongoose.model("vocabularyNotes", vocabularySchema);

module.exports = vocabularyModel;
