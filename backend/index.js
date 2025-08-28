const { config } = require("dotenv");
const app =  require("./src/app");
const connectDB = require("./src/utils/db");

config();
connectDB()


app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`server is runing on port ${process.env.PORT}`);
    
})
