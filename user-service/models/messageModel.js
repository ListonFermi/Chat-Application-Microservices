const mongoose = require("mongoose");

//event driven
const messagesSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users'},
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const messageCollection = mongoose.model(
  "messages",
  messagesSchema
);

module.exports = messageCollection;
