const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = {
  provider: {
    type: Schema.Types.String,
    required: true,
    index: true
  },
  userId: {
    type: Schema.Types.String,
    required: true,
    index: true
  },
  info: {
    type: Schema.Types.Mixed,
    default: null
  },
  accessToken: Schema.Types.String,
  refreshToken: Schema.Types.String,
  passportResponse: Schema.Types.Mixed,
};

const Auth = new Schema(AuthSchema);

module.exports = Auth;
