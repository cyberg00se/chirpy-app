const jwt = require("jsonwebtoken");
const User = require("../user/models/User");
const {ApiService} = require("../api.service");
const {privateUserResponse} = require("../user/responses");
const passportOptions = require("./options");

class AuthService extends ApiService {

  generateJWTToken(id) {
    return jwt.sign({id, timestamp: new Date().getTime()}, passportOptions.jwt.secret);
  }

  async signUp(ctx) {
    const {
      name,
      surname,
      userName,
      email,
      password
    } = ctx.request.body;

    let user = new User({
      name: name,
      surname: surname,
      userName: userName,
      email: email,
      password: password
    });

    await user.save();
    const token = this.generateJWTToken(user._id);

    return {user: privateUserResponse(user), token};
  }
}

module.exports = AuthService;
