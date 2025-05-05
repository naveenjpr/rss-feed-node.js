const mongoose = require('mongoose');

const Node_jsSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: [true, ' node js Question  is required'],
        unique: true,
    },
    Answers: {
        type: String,
        required: [true, ' node js Answers  is required'],
        unique: true,
    },
    // image: {
    //     type: String,
    //     // required : [true, 'Course Image is required'],
    // },
 
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

const NodeNotesModel = mongoose.model('NodeNotes', Node_jsSchema);

module.exports = NodeNotesModel;