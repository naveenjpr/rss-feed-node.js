const mongoose = require('mongoose');

const HTML_CSSSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, ' react Question  is required'],
    },
    Answers: {
        type: String,
        required: [true, ' react Answers  is required'],
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

const HTML_CSSModel = mongoose.model('HTML_CSSNotes', HTML_CSSSchema);

module.exports = HTML_CSSModel;