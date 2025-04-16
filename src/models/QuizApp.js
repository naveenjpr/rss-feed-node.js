const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    
  },
  correctAnswer: {
    type: String,
    required: true,
    
  },
  status:{
    type:Boolean,
    default:true,
  },
  created_at:{
    type:Date,
    default:Date.now
  },
  updated_at:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('QuizApp', questionSchema);
