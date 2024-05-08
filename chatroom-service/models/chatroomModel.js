const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    chatroomName: { type: String, required: true, unique: true},
  },
  { timestamps: true }
);

const chatroomCollection = mongoose.model("chatrooms", chatroomSchema);

module.exports = chatroomCollection;
