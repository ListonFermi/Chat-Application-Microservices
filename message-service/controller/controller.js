const messageCollection = require("../models/messageModel");
const userCollection = require("../models/userModel");
var jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports = {
  sendMessage: async (req, res) => {
    try {
      let { userId, message } = req.body;
      let { chatroomId } = req.params;

      const verifyJWT = jwt.verify(
        userId,
        String(process.env.JWT_KEY)
      )

      userId =new ObjectId(verifyJWT.userId);
      chatroomId =new ObjectId(chatroomId);

      await messageCollection.create({ userId, chatroomId, message });

      res
        .status(200)
        .send({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Failed to send message" });
    }
  },
};
