require("dotenv").config()
const jwt = require("jsonwebtoken")

const authToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // decoding the token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.person = decodeToken;

    next(); // move to next middleware
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authToken;
