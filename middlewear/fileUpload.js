const multer = require("multer");
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Generate a unique filename
      },
  });
  
  const upload = multer({ 
    storage: storage,
    // Create destination directory if it doesn't exist
    createDestination: function (req, file, cb) {
      cb(null, 'uploads/');
    }
  });

  module.exports = upload;