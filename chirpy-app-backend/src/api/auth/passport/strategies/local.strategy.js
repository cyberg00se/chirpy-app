const LocalStrategy = require("passport-local").Strategy;
const UserService = require("../user.service.link");

let options = {
  usernameField: "username",
  passwordField: "password",
  session: false,
};

let handler = async function(userName, password, done) {
  const userService = new UserService();
  let user;
  try {
    user = await userService.findOne({userName});
    if (!user) {
      return done(null, false, {message: "Incorrect username."});
    }
  }
  catch(err) {
    return done(err);
  }

  let confirmed = await userService.verifyPassword(user, password);
  if(!confirmed) {
    return done(null, false, {message: "Incorrect password."});
  }

  return done(null, user);
};

module.exports = new LocalStrategy(options, handler);