const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type : String,        
    },
    email : {
        type : String,
        required : true,
        max : 50,
        unique : true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type:String,
        required:true
    },
    rollNo : {
        type : Number,
    },
    mobileNo : {
        type : Number,
    }
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
    }
    next();
})

module.exports = mongoose.model("Users",userSchema);