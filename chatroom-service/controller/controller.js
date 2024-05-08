const chatroomCollection = require("../models/chatroomModel");
const messageCollection = require("../models/messageModel");
const userCollection = require("../models/userModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports = {
  createChatroom: async (req, res) => {
    try {
      const { chatroomName } = req.body;
      const chatroom = await chatroomCollection.create({ chatroomName });
      res
        .status(200)
        .send({ success: true, message: "Chatroom created successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Failed to create chatroom" });
    }
  },
};
