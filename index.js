require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongodb = require("./config/dbConnection");
const path = require("path");
const fs = require("fs");

const router = require("./routes");

const app = express();

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.options("*", cors());
app.use(cors());
// Other middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(router);

// MongoDB setup
mongodb();

// Routes

// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Serve static files from the 'uploads' directory

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
