const express = require("express")
const isAuth = require("../middleware/auth")
const { applyJob, getAppliedJob, getApplicants, updateStatus } = require("../controllers/application.controller")

const applicationRouter = express.Router()

applicationRouter.get("/applyJob/:id" , isAuth ,  applyJob)
applicationRouter.get("/get" , isAuth ,  getAppliedJob)
applicationRouter.get("/:id/applicants" , isAuth ,  getApplicants)
applicationRouter.post("/updateStatus/:id" , isAuth ,  updateStatus)


module.exports = applicationRouter