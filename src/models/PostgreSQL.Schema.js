const mongoose = require("mongoose");

const PostgreSQLSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " PostgreSQL Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " PostgreSQL Answers  is required"],
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
    default: null,
  },
});

const PostgreSQLModel = mongoose.model("PostgreSQLNotes", PostgreSQLSchema);

module.exports = PostgreSQLModel;
