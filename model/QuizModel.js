const mongoose = require('mongoose');
const Question = require('./QuestionModel');
const Team = require('./TeamModel');

const quizSchema = new mongoose.Schema({
      team:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Team'
      },
      answer:{
        type:String,
        required:true
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      score:{
        type:Number,
        default:0
      }
})

module.exports = mongoose.model('Answer',quizSchema);