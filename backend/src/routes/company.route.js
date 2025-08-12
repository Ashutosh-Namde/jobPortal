const express = require("express")
const isAuth = require("../middleware/auth")
const { registerCompany, getAllCompany, getCompanyById, updateCompany } = require("../controllers/company.controller")

const companyRouter = express.Router()

companyRouter.post("/register" , isAuth ,  registerCompany)
companyRouter.get("/allCompany" , isAuth , getAllCompany)
companyRouter.get("/company/:id" , isAuth , getCompanyById)
companyRouter.post("/update/:id"  , updateCompany)

module.exports = companyRouter