const express = require("express");
const router = express.Router();
const upload = require("../../middlewear/fileUpload");
const { uploadController, getSingleUserController } = require("../../controllers/userController");
const passport = require("passport");

// Define a route to handle file uploads
router.post("/upload", upload.array('files'), uploadController);
router.get("/single-user", getSingleUserController);

module.exports = router;
