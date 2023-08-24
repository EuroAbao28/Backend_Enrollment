const adminModel = require("../models/adminModel");
const studentModel = require("../models/studentModel");

const getStudents = async (req, res) => {
  const response = await studentModel.find({});
  res.status(200).json(response);
};

const createStudent = async (req, res) => {
  const { name, sex, age, course } = req.body;

  if (!name || !sex || !age || !course)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const response = await studentModel.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (req, res) => {
  const student = await studentModel.findById(req.params.id);

  if (!student) return res.status(404).json({ message: "No student id found" });

  await studentModel.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ message: "Updated Successfully" });
};

const deleteStudent = async (req, res) => {
  const student = await studentModel.findById(req.params.id);

  if (!student) return res.status(404).json({ message: "No student id found" });

  await student.deleteOne();
  res.status(200).json({ message: "Student succesfully deleted" });
};

module.exports = { getStudents, createStudent, updateStudent, deleteStudent };
