const express = require("express")
const upload = require("../middlewares/thumbnailUpload")
const authToken = require("../middlewares/authToken")
const { addCourse } = require("../controllers/coursesController")
const router = express.Router()

router.post("/addCourse", authToken, upload.single("image"), addCourse)



module.exports = router