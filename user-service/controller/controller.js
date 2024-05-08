const userCollection = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const SALT = Number(process.env.BCRYPT_SALT) || 10;
      password = bcrypt.hashSync(password, SALT);

      const newUser = await userCollection.create({
        username,
        email,
        password,
      });
      console.log(newUser);
      //   Creating a JWT token and sending it in the body
      const JWT_KEY = String(process.env.JWT_KEY);
      const userJWT = jwt.sign({ userId: newUser._id }, JWT_KEY, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .send({ success: true, message: "user added succesfully", userJWT });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res
          .status(500)
          .send({ success: false, message: "User credentials already exists" });
      }
      res.status(500).send({ success: false, message: error._message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userCollection.findOne({ email });
      if (!user) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid credentials" });
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid credentials" });
      }

      //   Creating a JWT token and sending it in the body
      const JWT_KEY = String(process.env.JWT_KEY);
      const userJWT = jwt.sign({ userId: user._id }, JWT_KEY, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .send({
          success: true,
          message: "User logged in successfully",
          userJWT,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Invalid credentials" });
    }
  },
};
