const express = require("express")
const isAuth = require("../middleware/auth")
const { registerCompany, getAllCompany, getCompanyById, updateCompany } = require("../controllers/company.controller")
const singleUpload = require("../middleware/multer")

const companyRouter = express.Router()

companyRouter.post("/register" , isAuth ,  registerCompany)
companyRouter.get("/allCompany" , isAuth , getAllCompany)
companyRouter.get("/single/:id" , isAuth , getCompanyById)
companyRouter.post("/update/:id"  ,singleUpload, updateCompany)

module.exports = companyRouter