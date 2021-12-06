const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthSchema = require("../../auth/models/Auth");

const schema = new Schema(
  {
    auth: [AuthSchema],
    userName: {
      type: String,
      index: {unique: true},
      require: true,
    },
    email: {
      type: String,
      require: false,
      index: true,
      default: null,
    },
    name: {type: String, default: "", index: true},
    surname: {type: String, default: "", index: true},
    bio: {type: String, default: null},

    passwordHash: {type: String, default: null},
    salt: {type: String, default: null},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", schema);