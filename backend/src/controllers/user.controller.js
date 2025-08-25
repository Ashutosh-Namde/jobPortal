const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloundnary");
const getDataUri = require("../utils/dataUri");

const registrationController = async(req,res)=>{

    try {
        
    const {fullname , email , password , phoneNumber , role } = req.body;
    console.log(fullname , email , password , phoneNumber , role);

  const file = req.file;
    console.log(file);
    
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    
    if(!fullname || !email || !password || !phoneNumber || !role ){
        return res.status(400).json({message:"fill all the requirements" , success:false})
    }
  
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"user is already register with this email" , success:false})
    }
    const hashPassword = await bcrypt.hash(password,10)

    
    
    

     user = await User.create({
        fullname,
        email,
        password:hashPassword,
        phoneNumber,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url
        }
    })

       const tokenData = {
        userId:user._id
    }

    const token = await jwt.sign(tokenData,process.env.SECRETE_KEY,{expiresIn:"7d"})
    console.log(token,"register");


        return res.status(200).cookie("token" , token , {maxAge:7*24*60*60*1000,httpOnly:true , sameSite:"strict"}).json({message:`Account Created Successfully  ${user.fullname} `, success:true , user})

    } catch (error) {
        return res.status(400).json({message:"error in registration", error})
                
    }

}

const loginController = async (req,res) => {
   try {
     const { email , password , role } = req.body;
    if( !email || !password  || !role ){
        return res.status(400).json({message:"fill all the requirements" , success:false})
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Incorrect email and password" , success:false})
    }

    const isPasswordMatch = await bcrypt.compare(password , user.password)

     if(!isPasswordMatch){
        return res.status(400).json({message:"Incorrect email and password" , success:false})
    }

    if(role != user.role){
        return res.status(400).json({message:"Account doesn't exist with this current role" , success:false})

    }

    const tokenData = {
        userId:user._id
    }

    const token = await jwt.sign(tokenData,process.env.SECRETE_KEY,{expiresIn:"7d"})
 
    user = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }

        return res.status(200).cookie("token" , token , {maxAge:7*24*60*60*1000,httpOnly:true , sameSite:"strict"}).json({message:`welcome back ${user.fullname}`, success:true , user})


   } catch (error) {
        return res.status(400).json({message:"error in login", error})
    
   }
}

const logoutController = async (req,res) => {
    try {
        return res.status(200).cookie("token", "",{maxAge:0}).json({
            message:"logout succesfuuly",
            success:true
        })
    } catch (error) {
        return res.status(400).json({message:"error in logout", error})
        
    }
}

const updateProfileController = async (req,res) => {
    try {
        const userId = req.id
        let {fullname , email , phoneNumber , bio ,skills} = req.body
        const file = req.file
        // console.log(fullname , email , phoneNumber , bio ,skills,file);
 
        // cloudnary yega yaha
        let cloudResponse;
    
  const fileUri = getDataUri(file);
   cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        let skillsArray;
       if(skills){
          skillsArray = skills.split(",")
       }
        let user =  await User.findByIdAndUpdate(userId,{fullname,email,phoneNumber, "profile.bio": bio,
    "profile.skills": skillsArray},{new:true})
        if(!user){
        return res.status(400).json({message:"user not found" , success:false})
        }

        //resume come latter
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url //save the cloudnary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
console.log(cloudResponse.secure_url ,"secul");

        await user.save()
        


        user = {
              _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        // bio:user.profile.bio,
        // skills:user.profile.skills,
        role:user.role,
        profile:user.profile
        }


        return res.status(200).json({message:`Account updated succesfuly`,user ,  success:true})

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"error in updating data" ,error})
        
    }
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    updateProfileController
}