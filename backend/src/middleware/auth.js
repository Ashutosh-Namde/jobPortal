const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuth = async (req,res,next) => {
   try {
     const token = req.cookies.token;
    //  console.log(token);
     
    if(!token){
       return res.status(400).json({message:"user not authenticated" , success:false})
    }
    const decode = await jwt.verify(token , process.env.SECRETE_KEY)
    if(!decode){
       return res.status(400).json({message:"Invalid token" , success:false})

    }
        // ✅ DB check for deleted user
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found (maybe deleted)", success: false });
    }

    req.id = decode.userId;
    next()
   } catch (error) {
    console.log(error);
    
  return  res.status(400).json({message:"error in middleware" , error})
   }
}

module.exports = isAuth