const mongoose = require('mongoose');

const JavascriptSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, ' javascript Question  is required'],
        unique: true,

    },
    Answers: {
        type: String,
        required: [true, ' javascript Answers  is required'],
        unique: true,

    },
    image: {
        type: String,
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

const javascriptModel = mongoose.model('javascript', JavascriptSchema);

module.exports = javascriptModel;