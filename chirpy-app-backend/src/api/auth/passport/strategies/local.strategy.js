const LocalStrategy = require("passport-local").Strategy;
const User = require("../user.model.link");

let options = {
  usernameField: "username",
  passwordField: "password",
  session: false,
};

let handler = (userName, password, done) => {
  User.findOne({userName}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: "Incorrect username."});
    }
    if (!user.verifyPassword(password)) {
      return done(null, false, {message: "Incorrect password."});
    }
    return done(null, user);
  });
};

module.exports = new LocalStrategy(options, handler);