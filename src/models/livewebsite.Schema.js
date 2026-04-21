const mongoose = require("mongoose");

const livewebsiteSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, "  Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, "  Answers  is required"],
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

const livewebsiteModel = mongoose.model("livewebsiteNotes", livewebsiteSchema);

module.exports = livewebsiteModel;
