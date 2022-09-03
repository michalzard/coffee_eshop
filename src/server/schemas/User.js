const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Email is invalid",
      },
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Username needs to be atleast 3 characters"],
      maxLength: [30, "Username cannot exceed 30 characters"],
    },
    //no need for validators since password is encrypted into long hash before its inputted to this doc
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
