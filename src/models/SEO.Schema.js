const mongoose = require("mongoose");

const SEOSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " SEO Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " SEO Answers  is required"],
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

const SEOModel = mongoose.model("SEONotes", SEOSchema);

module.exports = SEOModel;
