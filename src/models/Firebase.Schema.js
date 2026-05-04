const mongoose = require("mongoose");

const FirebaseSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " Firebase Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " Firebase Answers  is required"],
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

const FirebaseModel = mongoose.model("FirebaseNotes", FirebaseSchema);

module.exports = FirebaseModel;
