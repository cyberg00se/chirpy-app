const Router = require("koa-router");

//Controllers
const MainController = require("../api/main/main.controller");
const AuthController = require("../api/auth/auth.controller");

//Middleware`s
const AuthMiddleware = require("../api/auth/auth.middleware");

let router = new Router();
router
    //Auth and register (sign in and sign up)
    .post("/signin", AuthController.signIn)
    .post("/signup", AuthMiddleware.validateRegister, AuthController.signUp)
    .post("/signup/email/:email", AuthController.existsEmail)
    .post("/signup/username/:username", AuthController.existsUsername)
;

module.exports = router;
