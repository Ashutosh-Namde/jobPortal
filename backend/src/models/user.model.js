const mongoose = require("mongoose")

const userSchema = new  mongoose.Schema({

    fullname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    
    password:{
        required:true,
        type:String
    },
    phoneNumber:{
        required:true,
        type:Number,
    },
    
    role:{
        required:true,
        type:String,
        enum:["student","recruiter"]
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//url of resume
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId , ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true})

const User = mongoose.model("User", userSchema)
module.exports = User