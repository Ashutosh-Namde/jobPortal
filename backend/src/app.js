const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const router = require("./routes/user.route")
const companyRouter = require("./routes/company.route")
const jobRouter = require("./routes/job.route")
const applicationRouter = require("./routes/applicants.route")


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption = {
    origin: "http://localhost:5173", 
    credentials: true                
};

app.use(cors(corsOption))

app.use("/user",router)
app.use("/company",companyRouter)
app.use("/job",jobRouter)
app.use("/application",applicationRouter)



module.exports=app