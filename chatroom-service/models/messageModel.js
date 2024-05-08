const mongoose = require("mongoose");
//event driven
const messageSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
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
