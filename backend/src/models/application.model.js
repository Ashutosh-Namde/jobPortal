const { application } = require("express")
const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
   

    job:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"

    },
    applicant:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        required:true,
          type: String, 
        enum:["pending" , "accepted" , "rejected"],
        default:"pending"
    }
   

},{timestamps:true})

const Application = mongoose.model("Application" , applicationSchema)

module.exports = Application