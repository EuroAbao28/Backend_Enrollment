const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  getAllAdmin,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminsController");
const router = express.Router();

router.get("/", protect, getAllAdmin);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
