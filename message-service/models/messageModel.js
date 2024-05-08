const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    chatroomId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "chatrooms",
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const messageCollection = mongoose.model("messages", messageSchema);

module.exports = messageCollection;
