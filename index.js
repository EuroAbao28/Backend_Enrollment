const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// Call the db connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/student", require("./routes/studentsRoutes"));
app.use("/api/admin", require("./routes/adminsRoutes"));

app.listen(port, () => console.log("Server started on port", port));
