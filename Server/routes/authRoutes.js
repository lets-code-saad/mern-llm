const express = require("express")
const { signupRoute } = require("../controllers/authController")

const router = express.Router()

// ROUTES
router.post("/signupRoute", signupRoute)


module.exports = router