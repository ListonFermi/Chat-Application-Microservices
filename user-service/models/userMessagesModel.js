const mongoose = require("mongoose");

const userMessagesSchema = new mongoose.Schema({
  userId : { type: mongoose.Types.ObjectId, required: true, ref:'users'},
  message : { type: String, required: true },
}, { timestamps: true });

const userMessagesCollection = mongoose.model("userMessages", userMessagesSchema);

module.exports = userMessagesCollection;