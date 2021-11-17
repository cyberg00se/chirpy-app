const { ApiController } = require("../api.controller");
const { PostsService } = require("./posts.service");

class PostsController extends ApiController {

  constructor() {
    super();
    this.postsService = new PostsService();
  }

  async addPost(ctx) {
    let { body, title } = ctx.request.body;
    ctx.body = await this.postsService.createPost(ctx.state.user._id, body, title);
    ctx.status = 201;
  }

  async updatePost(ctx) {
    let { id: _id } = ctx.params;
    let { body, title } = ctx.request.body;

    let post = await this.postsService.ServiceModel.findOneAndUpdate({ _id }, {
      ...title ? { title } : {},
      ...body ? { body } : {},
    }, { new: true });
    ctx.body = post;
  }

  async removePost(ctx) {
    let { id: _id } = ctx.params;
    let post = await this.postsService.ServiceModel.findOneAndDelete({ _id });
    ctx.body = post;
  }

  async getPost(ctx) {
    ctx.body = await this.postsService.findById(ctx.params.id);
  }

  async getUserPosts(ctx) {
    ctx.body = await this.postsService.getUserPosts(ctx.req.user._id);
  }
}

module.exports = { PostsController };
