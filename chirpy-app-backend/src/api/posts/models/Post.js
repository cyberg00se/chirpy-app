const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },

    body: {
      type: String,
      default: "",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  }, 
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", schema);
module.exports = {Post};