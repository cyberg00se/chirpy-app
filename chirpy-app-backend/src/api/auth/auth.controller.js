const converter = require("nodejs-base64-converter");
const passport = require("./passport");
const AuthService = require("./auth.service");
const UserService = require("../user/user.service");
const {ApiController} = require("../api.controller");
const {privateUserResponse} = require("../user/responses");
const User = require("../user/models/User");


class AuthController extends ApiController {
  authService = new AuthService();
  userService = new UserService();

  async signIn(ctx, next) {
    await passport.authenticate("local", (err, user) => {
      console.info(err);
      if (!user) {
        ctx.setAppError(401, 0);
      } 
      else {
        const accessToken = this.authService.generateJWTToken(user.id);
        ctx.body = {user: privateUserResponse(user), accessToken};
      }
    })(ctx, next);
  }

  async signUp(ctx, next) {
    if(!(await this.userService.existByUserName(ctx.request.body.userName))) {
      if(!(await this.userService.existByEmail(ctx.request.body.email))) {
        ctx.body = await this.authService.signUp(ctx);
        ctx.status = 201;
      }
      else {
        ctx.setAppError(401, 3);
      }
    }
    else {
      ctx.setAppError(401, 4);
    }
  }

  async existsUsername(ctx) {
    let username = ctx.params.username;
    let result = await this.userService.existByUserName(username);
    ctx.body = {result};
  }

  async existsEmail(ctx) {
    let email = ctx.params.email;
    let result = await this.userService.existByEmail(email);
    ctx.body = {result};
  }
}

function encodeData(data) {
  return converter.encode(JSON.stringify(data), "base64");
}

function decodeData(data) {
  return JSON.parse(converter.decode(data, "base64"));
}

module.exports = new AuthController();