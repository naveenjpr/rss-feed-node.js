const mongoose = require('mongoose');

const SQLSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, ' SQL Question  is required'],
    },
    Answers: {
        type: String,
        required: [true, ' SQL Answers  is required'],
    },
 
    status: {
        type: Boolean,
        default: true
    },
  
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: ''
    }

});

const SQLModel = mongoose.model('SQLNotes', SQLSchema);

module.exports = SQLModel;