const express = require("express")
const isAuth = require("../middleware/auth")
const { postJobController, getAllJob, getJobById, getAdminJobs } = require("../controllers/job.controller")

const jobRouter = express.Router()

jobRouter.post("/post" , isAuth,postJobController)
jobRouter.get("/allJobs" , isAuth,getAllJob)
jobRouter.get("/job/:id" , isAuth,getJobById)
jobRouter.get("/adminJobs/:id" , isAuth,getAdminJobs)

module.exports = jobRouter