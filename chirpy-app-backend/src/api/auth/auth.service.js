const jwt = require("jsonwebtoken");
const User = require("../user/models/User");
const UserService = require("../user/user.service");
const {ApiService} = require("../api.service");
const {privateUserResponse} = require("../user/responses");

class AuthService extends ApiService {

  generateJWTToken(id) {
    return jwt.sign({id, timestamp: new Date().getTime()}, process.env.JWTSECRET);
  }

  async signUp(ctx) {
    const userService = new UserService();
    const {
      name,
      surname,
      userName,
      email,
      phoneNumber,
      password
    } = ctx.request.body;

    let user = new User({
      name: name,
      surname: surname,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber
    });

    await userService.setUserPassword(user, password);
    await user.save();
    const token = this.generateJWTToken(user._id);
    user = await userService.findByUserName(userName);

    return {user: privateUserResponse(user), token};
  }
}

module.exports = AuthService;
