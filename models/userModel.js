const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    gender: {
      type: String,
      required: [true, "Gender is required"]
    },
    agreement: {
      type: Boolean,
      required: [true, "Gender is required"]
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
