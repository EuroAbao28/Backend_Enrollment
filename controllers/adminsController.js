const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");

const getAllAdmin = async (req, res) => {
  const response = await adminModel.find({});
  res.status(200).json(response);
};

const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check if the email is already in use
  const isAdminExist = await adminModel.findOne({ email });

  if (isAdminExist)
    return res.status(400).json({ message: "Email already in use " });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the admin
  const response = await adminModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (response) {
    res.status(201).json({ token: generateToken(response) });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const response = await adminModel.findOne({ email });

  if (response && (await bcrypt.compare(password, response.password))) {
    res.status(200).json({ response, token: generateToken(response) });
  } else {
    res.status(400).json({ message: "Incorrect email or password" });
  }
};

// Generate JWT
const generateToken = (data) => {
  // nagdagdag ako ng payload kesa sa id lang
  const payload = {
    id: data._id,
    username: data.username,
    email: data.email,
  };
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = { getAllAdmin, registerAdmin, loginAdmin };
