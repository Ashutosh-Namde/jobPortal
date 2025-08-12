const { application } = require("express")
const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    requirements:[{
        type:String
    }],
    location:{
        required:true,
        type:String
    },
    salary:{
        required:true,
        type:Number
    },
    jobType:{
        required:true,
        type:String
    },
    position:{
        required:true,
        type:String
    },
    company:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"

    },
    created_by:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    experience:{
        required:true,
        type:String
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application"

    }],

},{timestamps:true})

const Job = mongoose.model("Job" , jobSchema)

module.exports = Job