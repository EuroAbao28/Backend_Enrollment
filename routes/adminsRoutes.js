const express = require("express");
const {
  getAllAdmin,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminsController");
const router = express.Router();

router.get("/", getAllAdmin);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
