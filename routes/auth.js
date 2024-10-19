const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ msg: "user with same email already exists" });
    }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({ email, password: hashedPassword, userName });
      user = await user.save();
      res.json({ user });
    
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    
    if (!findUser) {
      return res.status(400).json({ msg: "No user found with this email" });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
      
      const token = jwt.sign({ id: findUser._id }, "passwordKey");
      // Destructure the password after checking the match
      const { password: userPassword, ...user } = findUser._doc; 
      res.json({ token, user });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = authRouter;
