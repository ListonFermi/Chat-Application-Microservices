const mongoose = require("mongoose");
//event driven
const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const userCollection = mongoose.model("users", userSchema);

module.exports = userCollection;
