const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // Ang laman ng req.headers.authorization ay ganto
      // Authorization: Bearer tokenNato
      // Tapos inalis natin yung Bearer string gamit substring
      token = req.headers.authorization.substring("Bearer ".length);
      console.log("TOKEN:".red.underline, token.yellow);

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED TOKEN:".red.underline, decodedToken);

      req.admin = await adminModel.findById(decodedToken.id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No Token" });
  }
};

module.exports = protect;
