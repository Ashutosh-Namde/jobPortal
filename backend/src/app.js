const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/user.route");
const companyRouter = require("./routes/company.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/applicants.route");
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const allowedOrigins = ["http://localhost:5173","https://green-cart-ivory.vercel.app",];
const corsOption = { origin: "https://job-portal-ashen-seven.vercel.app" ,credentials: true };
app.use(cors(corsOption));
// Routes
app.use("/user", router);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);
app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

module.exports = app;
