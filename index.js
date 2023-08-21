require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary');
const signup = require("./src/routes/signup");
const login = require("./src/routes/login");
const upload = require("./src/routes/upload");
const videoList = require("./src/routes/videoList");
const videoDetails = require("./src/routes/videoDetails");
const comment = require("./src/routes/comment");
const likes = require("./src/routes/like");
const dislikes = require("./src/routes/dislike");
const views = require("./src/routes/views");
const reply = require("./src/routes/reply");
const port = 3000


mongoose.connect('mongodb://localhost:27017/');


const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());



const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkauth = require("./src/middlewares/checkauth");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); //only for single objects
app.use(bodyParser.json());

//Routes
app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/upload", checkauth, upload);
app.use("/api/videoList", videoList);
app.use("/api/videoDetails", videoDetails);
app.use("/api/addComment", checkauth, comment);
app.use("/api/like", checkauth, likes);
app.use("/api/dislike", checkauth, dislikes);
app.use("/api/views", views);
app.use("/api/reply", checkauth, reply);
app.use("/api/getComment", checkauth, comment); 

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
  console.log("http://localhost:3000")
});

