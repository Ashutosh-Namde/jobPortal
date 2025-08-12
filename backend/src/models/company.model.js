const { application } = require("express")
const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    description:{
        type:String
    },
   
    location:{
     
        type:String
    },
    website:{
       
        type:Number
    },
    logo:{
       
        type:String //url of logo
    },
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
   

},{timestamps:true})

const Company = mongoose.model("Company" , companySchema)

module.exports = Company