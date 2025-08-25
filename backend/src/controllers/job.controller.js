const Job = require("../models/job.model");


//admin
const postJobController = async (req,res) => {
  try {
    const {
    title,
    description,
    salary,
    location,
    requirements,
    jobType,
    position,
    companyId,
    experience,
  } = req.body;
  const userId = req.id
  console.log(  title,
    description,
    salary,
    location,
    requirements,
    jobType,
    position,
    companyId,
    experience,);
  
console.log(userId,"user id");

  if (
    !title ||
    !description ||
    !salary ||
    !location ||
    !requirements ||
    !jobType ||
    !position ||
    !companyId ||
    

    !experience
  ) {
    return res
      .status(400)
      .json({ message: "something missing", success: false });
  }
  const job = await Job.create({
    title,
    description,
    salary:Number(salary),
    location,
    requirements:requirements.split(","),
    jobType,
    position,
    company:companyId,
    created_by:userId,
    experience,
  });

  return res.status(200).json({message:"job created succesfully" , success:true , job})
  } catch (error) {
    console.log(error);
        
        return res.status(400).json({message:"error in post job" , success:false})
  }
};

//student
const getAllJob = async (req,res) => {
 try {
   const keyword = req.query.keyword || ""
  const query = {
    $or:[
      {title:{$regex:keyword,$options:"i"}},
      {description:{$regex:keyword,$options:"i"}}
    ]
  }
  const job = await Job.find(query).populate({path:"company"})
  if(!job){
    return res
      .status(400)
      .json({ message: "job not found", success: false });
  }
  return res.status(200).json({message:"fetch job succesfully" , success:true , job})
 } catch (error) {
  console.log(error);
        
        return res.status(400).json({message:"error in get all job" , success:false})
 }
  
}

//student
const getJobById = async (req,res) => {
 try {
   const jobId = req.params.id
  const job = await Job.findById({_id:jobId}).populate({path:"applications"
})
   if(!job){
    return res
      .status(400)
      .json({ message: "job not found", success: false });
  }
  return res.status(200).json({message:" job fetch  by id is succesfully" , success:true , job})
 } catch (error) {
  console.log(error);
        
        return res.status(400).json({message:"error in getAll job by id" , success:false})
 }

}

//admin ne kitne job create kiya
const getAdminJobs = async (req,res) => {
   try {
   const adminId = req.id
   console.log(adminId,"admin");
   
  const job = await Job.find({created_by:adminId}).populate({path:"company"})
   if(!job){
    return res
      .status(400)
      .json({ message: "job not found", success: false });
  }

  return res.status(200).json({message:" admin jobs fetch succesfully" , success:true , job})
 } catch (error) {
  console.log(error);
   return res.status(400).json({message:"error in getAll job by id" , success:false})
 }
}
module.exports = {
    postJobController,
    getAllJob,
    getJobById,
    getAdminJobs
}