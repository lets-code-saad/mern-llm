const coursesModel = require("../models/coursesModel");
const signup = require("../models/signup");

const addCourse = async (req, res) => {
  try {
    const { courseTitle, courseDescription, coursePrice } = req.body;
    if (!courseTitle || !courseDescription || !coursePrice) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const isUserExist = await signup.findById(req.person.personId);
    if (!isUserExist) {
      return res.status(403).json({ message: "User Not Found" });
    }

    const thumbnail = req.file.buffer.toString("base64");

    const newCourse = new coursesModel({
      courseTitle,
      courseDescription,
      coursePrice,
      thumbnail,
    });

    // saving the course to teh DB
    await newCourse.save();

    // pushing the newCourse id to the existingUser array
    isUserExist.courses.push(newCourse._id);
    await isUserExist.save();

    // Displayig success messsage
    res.json({ message: "Course Added Successfully!", newCourse });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const deleteCourse = async (req, res) => {
  const { courseTitle, courseDescription, coursePrice, thumbnail } = req.body;
  if (!courseTitle || !courseDescription || !coursePrice || !thumbnail) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  const isUserExist = await signup.findById(req.person.personId);
  if (!isUserExist) {
    return res.status(403).json({ message: "User Not Found" });
  }

  // const thumbnailBase64 =
};

module.exports = { addCourse, deleteCourse };
