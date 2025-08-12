const { config } = require("dotenv");
const app =  require("./src/app");
const connectDB = require("./src/db");

config();
connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server is runing on port ${process.env.PORT}`);
    
})
