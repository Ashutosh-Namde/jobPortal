const Application = require("../models/application.model")
const Job = require("../models/job.model")
const { options } = require("../routes/job.route")

const applyJob = async (req,res) => {
try {
        const userId = req.id
    const jobId = req.params.id
    if(!jobId){
        return res.status(400).json({message:"job id is required" , succes:false})
    }
    //check if user already apply for job
    const existingApplications = await Application.findOne({job:jobId , applicant:userId})

    if(existingApplications){
        return res.status(400).json({message:"user is already apply for job" , succes:false})

    }

    //check is job exist

    const job = await Job.findById(jobId)
    if(!job){
        return res.status(400).json({message:"job not found" , succes:false})

    }

    //create new applicants

    const newApplication = await Application.create({
        job:jobId,
        applicant:userId
    })

    job.applications.push(newApplication._id)

    await job.save()

    return res.status(200).json({message:"job created succesfully" , succes:true ,})
} catch (error) {
    console.log(error);
        
        return res.status(400).json({message:"error in apply job" , success:false})
 
    
}

}
const getAppliedJob = async (req,res) => {
    try {
        const userId = req.id
        const application  = await Application.find({applicant:userId}).sort({createdAt:-1})
        .populate({path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        }) 

        if(!application){
        return res.status(400).json({message:"no applications" , succes:false})

        }
    return res.status(200).json({message:"applications fatch succesfully" , application, succes:true ,})

        
    } catch (error) {
         console.log(error);
        
        return res.status(400).json({message:"error in getall applied job" , success:false})
 
    }
}
//admin dekhga ki kitne user ne job me apply kiya h
const getApplicants = async (req,res) => {
   try {
     const jobId = req.params.id
    const job = await Job.findById(jobId)
    .populate({path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant"
        }
    
    })

    if(!job){
        return res.status(400).json({message:"job not found" , succes:false})

    }
    return res.status(200).json({message:"total applicants fetch successfully" ,job, succes:true ,})

   } catch (error) {
      console.log(error);
        
        return res.status(400).json({message:"error in getall applicants to applied job" , success:false})
 
   }


}
const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id

        if(!status){
        return res.status(400).json({message:"status not found" , succes:false})

        }

        //find application by application id

        const application = await Application.findOne({_id:applicationId})

        if(!application){
        return res.status(400).json({message:"application not found" , succes:false})

        }

        // update the status

        application.status = status.toLowerCase()
        await application.save()

    return res.status(200).json({message:"status" , succes:true ,})

    } catch (error) {
       console.log(error);
        
        return res.status(400).json({message:"error in update status" , success:false})
    
    }
}


module.exports = {
    applyJob,
    getAppliedJob,
    getApplicants,
    updateStatus
}