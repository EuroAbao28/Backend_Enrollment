const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add your username"] },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add your password"] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
