const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
  courseTitle: { type: String, require: true },
  courseDescription: { type: String, require: true },
  coursePrice: { type: String, require: true },
  thumbnail: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Registrations",require:true },
});

module.exports = mongoose.model("Courses", coursesSchema)