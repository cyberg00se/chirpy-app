const {OwnerMiddleware} = require("../../lib/owner.middleware");
const {PostsService} = require("./posts.service");

class PostsMiddleware extends OwnerMiddleware {
  constructor() {
    super(PostsService);
  }
}

module.exports = {PostsMiddleware};