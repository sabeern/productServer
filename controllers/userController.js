const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const addUser = async (req, res) => {
  const { userName, password } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
  try {
    const user = new userModel({
      userName,
      password: hashPassword,
    });
    await user.save();
    res.status(200).send({ msg: "Signup successfull" });
  } catch (err) {
    res.status(500).send({ errMsg: "Data adding failed" });
  }
};

const signin = async (req, res) => {
  const { userName, password } = req.body;
  let user = "";
  try {
    user = await userModel.findOne({ userName });
  } catch (err) {
    res.status(500).send({ errMsg: "Internal server error" });
    return;
  }
  if (user) {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      const payload = {
        loginedUser: {
          id: user._id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
      });
      user.password = "";
      res.status(200).send({ token, user });
    } else {
      res.status(401).send({ errMsg: "Username or password invalid" });
    }
  } else {
    res.status(401).send({ errMsg: "User not exist" });
  }
};

module.exports = { addUser, signin };
