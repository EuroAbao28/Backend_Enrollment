const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentsController");

// router.get("/", getStudents);

// if same route, ganto pwede mas maikli
router.route("/").get(getStudents).post(createStudent);
router.route("/:id").put(updateStudent).delete(deleteStudent);
module.exports = router;
