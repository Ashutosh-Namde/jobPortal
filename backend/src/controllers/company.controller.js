
const Company = require("../models/company.model");


const registerCompany = async (req,res) => {
   try {
     const {name} = req.body;
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
      const companyId = req.params.id
 const {name,description , } = req.body
    const company = await Company.findByIdAndUpdate(companyId,{name} , {new:true})

    if(!company){
        return res.status(400).json({message:"company not found" , success:false})

    }
        return res.status(200).json({message:"fetch  company succesfully" , success:true , company})

}


module.exports = {
    registerCompany,
    getAllCompany,
    getCompanyById,
    updateCompany
}