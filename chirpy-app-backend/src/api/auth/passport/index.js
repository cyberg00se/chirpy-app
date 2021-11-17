const passport = require("koa-passport");
const User = require("./user.model.link");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, done);
});

const strategies = [
  require("./strategies/local.strategy"),
  require("./strategies/jwt.strategy"),
];

for (const strategy of strategies) {
  passport.use(strategy);
}

module.exports = passport;
