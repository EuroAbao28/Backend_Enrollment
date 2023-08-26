const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentsController");
const protect = require("../middlewares/authMiddleware");

// router.get("/", getStudents);

// if same route, ganto pwede mas maikli
router.route("/").get(protect, getStudents).post(createStudent);
router.route("/:id").put(protect, updateStudent).delete(protect, deleteStudent);
module.exports = router;
