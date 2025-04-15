const express = require("express")
const cors = require("cors")
const connectToDB = require("./config/DB")
const authRoutes = require("./routes/authRoutes")

// creating app 
const app = express()
// for allowing the region to accept the server
app.use(cors())
// for parsing data to json
app.use(express.json())

// Routes
app.use("/auth", authRoutes)

// calling the db
connectToDB()

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})