const Router = require("koa-router");

//Controllers
const UserController = require("../api/user/user.controller");
const { PostsController } = require("../api/posts/posts.controller");

//Middleware`s
const AuthMiddleware = require("../api/auth/auth.middleware");
const { PostsMiddleware } = require("../api/posts/posts.middleware");

//Post initialization
let postsMiddleware = new PostsMiddleware();
let postsController = new PostsController();

let router = new Router();

router.use(AuthMiddleware.jwt);

router
  //User
  .get("/users/me", UserController.me)
  .get("/users/:id", UserController.getById)
  .post("/users/me", UserController.updateUser)
  .post("/users/me/password", UserController.updatePassword)

  //Posts
  .get("/posts", postsController.getUserPosts)
  .post("/post", postsController.addPost)
  .get("/post/:id", postsMiddleware.owner, postsController.getPost)
  .post("/post/:id", postsMiddleware.owner, postsController.updatePost)
  .del("/post/:id", postsMiddleware.owner, postsController.removePost)
;

module.exports = router;