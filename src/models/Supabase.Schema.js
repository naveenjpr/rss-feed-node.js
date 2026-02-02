const mongoose = require("mongoose");

const SupabaseSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: [true, " Supabase Question  is required"],
  },
  Answers: {
    type: String,
    required: [true, " Supabase Answers  is required"],
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

const SupabaseModel = mongoose.model("SupabaseNotes", SupabaseSchema);

module.exports = SupabaseModel;
