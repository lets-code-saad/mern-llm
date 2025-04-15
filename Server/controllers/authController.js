const signup = require("../models/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signupRoute = async (req, res) => {
  const { username, email, password, role } = req.body;
  // check if all the fields are entered
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  // Check if email is already registered
  const existingUser = await signup.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already in use" });
  }
  // Check if username is already taken
  const usernameExists = await signup.findOne({ username });
  if (usernameExists) {
    return res.status(409).json({ message: "Username is already taken" });
  }
  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 6);

  // creating newUser
  const newUser = new signup({
    email,
    username,
    password: hashedPassword,
    role,
  });

  // saving the user in DB
  await newUser.save();

  // leaving a response message:
  res.json({ message: "Signed Up Successfully!", newUser });
};

const signinRoute = async (req, res) => {
try {
      const { username, password } = req.body;
      // check if all the fields are entered
      if (!username || !password) {
        return res.status(400).json({ message: "All Fields Are Required" });
      }
      // Check if user exists
      const existingUser = await signup.findOne({ email });
      if (!existingUser) {
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
    }
    // checking if the password is correct
    const passwordMatches = bcrypt.compare(password, existingUser.password)
    if (!passwordMatches) {
        return res.status(401).json({message:"Username or password is incorrect"})
    }
    
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 6);
    
    // generating the token
const token = jwt.sign({userId:existingUser._id, role:existingUser.role},process.env.JWT_SECRET_KEY)

    


} catch (error) {
    return res.status(500).json("Internal Server Error")
}
}

module.exports = {signupRoute,signinRoute};
