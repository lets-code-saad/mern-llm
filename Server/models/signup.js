const mongoose = require("mongoose")

const signupUser = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:{type:String, required:true, unique:true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "instructor", "admin"],
        default:"user"
    }
},{timestamps:true})

module.exports = mongoose.model("Registration", signupUser)