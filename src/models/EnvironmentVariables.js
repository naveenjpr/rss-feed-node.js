const mongoose = require("mongoose");

const EnvironmentVariablesSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, " EnvironmentVariables Question  is required"],
    },
    Answers: {
        type: String,
        required: [true, " EnvironmentVariables Answers  is required"],
    },

    status: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
    image_public_id: {
        type: String,
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

const EnvironmentVariablesModel = mongoose.model(
    "EnvironmentVariablesNotes",
    EnvironmentVariablesSchema,
);

module.exports = EnvironmentVariablesModel;
