const mongoose = require("mongoose");

const GoogleAnalyticsSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " GoogleAnalytics Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " GoogleAnalytics Answers  is required"],
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

const GoogleAnalyticsModel = mongoose.model(
  "GoogleAnalyticsNotes",
  GoogleAnalyticsSchema,
);

module.exports = GoogleAnalyticsModel;
