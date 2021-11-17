const { ApiService } = require("../api.service");
const { Post } = require("./models/Post");

class PostsService extends ApiService {

  ServiceModel = Post;

  constructor() {
    super(Post);
  }

  async findById(_id) {
    return Post.findById(_id);
  }

  async createPost(owner, body, title) {
    let post = new Post();

    post.body = body;

    post.owner = owner;
    post.title = title;

    await post.save();
    return post;
  }

  async getUserPosts(user) {
    return Post.find({ owner: user });
  }
}

module.exports = { PostsService };