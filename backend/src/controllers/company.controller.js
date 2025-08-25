
const Company = require("../models/company.model");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloundnary");


const registerCompany = async (req,res) => {
   try {
     const {name} = req.body;
    //  console.log(name);
     
    if(!name){
        return res.status(400).json({message:"something missing" , success:false})
    }
    let company = await Company.findOne({name})
    if(company){
        return res.status(400).json({message:"you are not register with same company" , success:false})      
    }
    company = await Company.create({
             name,
             userId:req.id
    })
        return res.status(200).json({message:"company created succesfully" , success:true , company})

   } catch (error) {
    console.log(error);
    
        return res.status(400).json({message:"error in register company" , success:false})
    
   }
}

const getAllCompany = async (req,res) => {
    try {
        const userId = req.id

        let companies = await Company.find({userId})

        if(!companies){
        return res.status(400).json({message:"companies not found" , success:false})

        }

        return res.status(200).json({message:"fetch all company succesfully" , success:true , companies})

        
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"error in getAll company" , success:false})
        
    }
}

const getCompanyById= async (req,res) => {
    try {
        const companyId = req.params.id
        // console.log(companyId);
        

    const company = await Company.findById(companyId)

    if(!company){
        return res.status(400).json({message:"company not found" , success:false})

    }
        return res.status(200).json({message:"fetch  company succesfully" , success:true , company})

    } catch (error) {
         console.log(error);
        
        return res.status(400).json({message:"error in get  company by id" , success:false})
        
    }
}

const updateCompany = async (req,res) => {
try {
          const companyId = req.params.id
 const {name,description , website,location} = req.body
//  console.log(name,description , website,location);

 //clodnary
 const file = req.file
 const fileUri = getDataUri(file)
 const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
 const logo = cloudResponse.secure_url

 const updateData = {name,description , website,location,logo}
 
    const company = await Company.findByIdAndUpdate(companyId,updateData , {new:true})

    if(!company){
        return res.status(400).json({message:"company not found" , success:false})

    }
        return res.status(200).json({message:"company information updated " , success:true , company})
} catch (error) {
     console.log(error);
        
        return res.status(400).json({message:"error in update company data", error, success:false})
}

}


module.exports = {
    registerCompany,
    getAllCompany,
    getCompanyById,
    updateCompany
}