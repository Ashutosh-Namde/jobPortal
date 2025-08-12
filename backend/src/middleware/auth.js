const jwt = require("jsonwebtoken");

const isAuth = async (req,res,next) => {
   try {
     const token = req.cookies.token;
    if(!token){
        res.status(400).json({message:"user not authenticated" , success:false})
    }
    const decode = await jwt.verify(token , process.env.SECRETE_KEY)
    if(!decode){
        res.status(400).json({message:"Invalid token" , success:false})

    }
    req.id = decode.userId;
    next()
   } catch (error) {
    console.log(error);
    
    res.status(400).json({message:"error in middleware" , error})
   }
}

module.exports = isAuth