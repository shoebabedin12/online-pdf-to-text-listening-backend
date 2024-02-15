const Post = require("../models/postmodel");
const User = require("../models/userModel");
var jwt = require('jsonwebtoken');

const uploadController = async (req, res, next) => {
  try {
    const userId = req.body.userId; // Access user ID from request body
    // Access uploaded files via req.files
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Process each uploaded file and save to the database
    const filesData = req.files.map((file) => ({
      file: file.path, // Assuming the path to the file is stored in req.files[i].path
      user: userId, // Use the user ID obtained from the request
    }));

    // Save each file to the database
    const savedFiles = await Post.create(filesData);

    // Update user's post field
    await User.findByIdAndUpdate(userId, {
      $push: { post: { $each: savedFiles.map((file) => file._id) } },
    });

    // Send success response
    res
      .status(200)
      .json({ message: "Files uploaded successfully", data: savedFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleUserController = async (req, res) => {
  try {
    // Extract the authentication token from the request headers
    const token = req.headers.authorization.split(" ")[1]; // Assuming the token is included in the "Authorization" header

    // Verify and decode the token to obtain the user's ID
    const decoded = jwt.verify(token, "mds74632"); // Replace "your_secret_key" with your actual secret key

    // Use the user's ID to query the database and retrieve their data
    const user = await User.findById(decoded.userId).populate("post");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's data as a response
    res.json({
      message: "Fetch user data successfully",
      data: {
        key: user._id,
        email: user.email,
        gender: user.gender,
        post: user.post,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







module.exports = {uploadController,getSingleUserController}