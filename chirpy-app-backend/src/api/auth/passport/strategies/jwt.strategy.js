const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../user.model.link");
const passportOptions = require("../../options");

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: passportOptions.jwt.secret,
};

let handler = (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

module.exports = new JwtStrategy(options, handler);
