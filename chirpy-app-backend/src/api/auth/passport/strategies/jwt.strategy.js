const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserService = require("../user.service.link");
const passportOptions = require("../../options");

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: passportOptions.jwt.secret,
};

let handler = async function(payload, done) {
  const userService = new UserService();
  let user;
  try {
    user = await userService.findById(payload.id);
  }
  catch(err) {
    return done(err);
  }

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

module.exports = new JwtStrategy(options, handler);
