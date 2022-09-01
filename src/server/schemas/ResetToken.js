const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "UserId needs to be specified as ObjectId"],
  },
  token: {
    type: String,
    required: [true, "Token needs to be specified as string"],
  },
  expires: { type: Date, expires: "30m", default: Date.now },
});

module.exports = mongoose.model("resetToken", resetTokenSchema);