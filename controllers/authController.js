const User = require("../models/userModel");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const forgotPasswordController = async (req, res) => {
  const { email, oldpassword, newPassword } = req.body;
  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided old password matches the user's current password
    const passwordMatch = await bcrypt.compare(oldpassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    // Update the user's password with the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "mds74632", {
      expiresIn: "1d"
    });

    res.status(200).json({ message: "Successfully login", data: token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signupController = async (req, res) => {
  try {
    const { email, password, gender, agreement } = req.body;
    console.log("req.body", req.body);

    if (!email) {
      return res
        .status(403)
        .json({ message: "Please Provide your valid email" });
    }
    if (!password) {
      return res
        .status(403)
        .json({ message: "Please Provide your valid password" });
    }
    if (!gender) {
      return res
        .status(403)
        .json({ message: "Please Provide your valid gender" });
    }
    if (!agreement) {
      return res
        .status(403)
        .json({ message: "Please Provide your valid agreement" });
    }

    const user = await User.find({ email: email });
    console.log("user", user);
    if (user.length > 0) {
      return res.status(403).json({ message: "Email already exists" });
    }
    bcrypt.hash(password, 10, async function (err, password) {
      const newUser = await User({
        email,
        password: password,
        gender,
        agreement
      });

      newUser.save();
      console.log(newUser);
      if (newUser) {
        return res
          .status(200)
          .json({ message: `New user ${newUser.email} created successfully` });
      } else {
        return res.status(400).json({ message: "Invalid user data received" });
      }
    });
  } catch (error) {
    console.error("Error signup details:", error);
  }
};

module.exports = {
  loginController,
  signupController,
  forgotPasswordController
};
