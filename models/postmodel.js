const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    file: {
      type: "string",
      required: true
    },
    user: {  // Add reference to the User model
        type: Schema.Types.ObjectId,
        ref: "User"
      }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
