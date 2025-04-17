const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const coursesRoutes = require("./routes/coursesRoutes");

// creating app
const app = express();
// for allowing the region to accept the server
app.use(
  cors({
    origin: [
      "https://mern-lms-backend-orcin.vercel.app/",
      "http://localhost:3000",
    ],
  })
);
// for parsing data to json
app.use(express.json());

// Routes

app.get("/", (req,res)=> res.send("Server is running"));
app.use("/auth", authRoutes);
app.use("/admin", rolesRoutes);
app.use("/instructor", coursesRoutes);

// calling the db
connectToDB();

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app