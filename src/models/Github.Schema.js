const mongoose = require('mongoose');

const GithubSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, ' Github Question  is required'],
    },
    Answers: {
        type: String,
        required: [true, ' Github Answers  is required'],
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

const GithubModel = mongoose.model('GithubNotes', GithubSchema);

module.exports = GithubModel;