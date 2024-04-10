require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
function isLoggedIn(req, res, next) {
  let { token } = req.headers;

  console.log(token);
  if (!token) {
    return res.json("You are not loggedin");
  } else {
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "you must be logged in" });
      }
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  }
}

module.exports = isLoggedIn;
