const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add your name"] },
    sex: { type: String, required: [true, "Please add your sex"] },
    age: { type: Number, required: [true, "Please add your age"] },
    course: { type: String, required: [true, "Please add your course"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
