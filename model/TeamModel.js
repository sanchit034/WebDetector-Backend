const mongoose = require('mongoose');
const User = require('../model/UserModel');

const teamSchema = new mongoose.Schema({
     
       teamName:{
        type:String,
        required:true
       },
       members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        }],
       teamCode:{
        type:String,
        required:true
       },
       teamHead:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
       },
       score:{
        type:Number
       },
       maxProgress: {
        type: Number,
        default: 0 
       }


},{timestamps:true})

module.exports = new mongoose.model("Team",teamSchema);
