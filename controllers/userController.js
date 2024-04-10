require('dotenv').config()
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(req.file);
  const data = await userModel.findOne({ name:name,email:email });
  if (!name || !email || !password) {
    return res.status(422).json("All the fields are required");
  } else if (data) {
    return res.status(422).json("user already exist");
  } else {
    bcrypt
      .hash(password, 10)
      .then((hashed) => {
        userModel
          .create({
            name,
            email,
            password: hashed,
          })
          .then((data) => {
            // console.log(data)
            return res.status(200).json("data saved success");
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const data = await userModel.findOne({ name });
    if (!name || !password) {
      return res.status(422).json("All the fields are required");
    } else if (!data) {
      return res.status(422).json("user not found");
    } else {
      bcrypt.compare(password, data.password, (err, check) => {
        if (check) {
          let token = jwt.sign(
            { _id: data._id, name: data.name },
            JWT_SECRET_KEY,
          
          );
          res.cookie('token',token,{httpOnly:true,sameSite:"none"});
          
          req.user = token;
          res
            .status(200)
            .json({
              msg: "ok",
              token: token,
              userid: data._id,
              username: data.name,
              useremail: data.email,
            });
        } else {
          return res.status(422).json('err');
        }
      });
    }
  } catch {
    // console.log('err')
  }
};


module.exports = { registerUser, loginUser };
