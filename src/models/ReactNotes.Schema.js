const mongoose = require("mongoose");

const ReactNotesSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " react Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " react Answers  is required"],
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

const ReactNotesModel = mongoose.model("ReactNotes", ReactNotesSchema);

module.exports = ReactNotesModel;
