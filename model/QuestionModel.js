const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    set : {
        type : Number,
        required : true
    },
    queUrl : {
        type : String,
        required : true
    },
    queNo : {
        type : Number,
        required : true
    },
    queAns : { 
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Questions",questionSchema);