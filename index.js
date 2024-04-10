const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postModel = require("./models/postModel");
const isLoggedIn = require("./middlewares/isLoggedIn");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use("/profileImage", express.static("profileImage"));
dbConnect();
app.use(require("./routes/userRoutes"));
app.use(require("./routes/posRoutes"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./frontend/dist")));
console.log(__dirname, ".dist");
const upload = multer({ dest: "uploads/" });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});
app.post("/createpost", isLoggedIn, upload.single("image"), (req, res) => {
  const { title, body } = req.body;

  if (!title || !body || !req.file) {
    return res.json("all fields are required");
  }

  postModel
    .create({
      title,
      body,
      image: req.file.path,
      postedBy: req.user._id,
    })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.listen(port, () => console.log(`listening to the port ${port}`));
