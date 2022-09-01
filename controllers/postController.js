const postService = require('../services/postService');

const getOnePost = async (req, res) => {
  const { post_id } = req.body;

  const post = await postService.getOnePost(post_id);

  return res.status(200).json({ post });
}

const getPostList = async (req, res) => {
  const { user_id, is_closed, stacks, classification } = req.body;

  const posts = await postService.getPostList(user_id, is_closed, stacks, classification);

  return res.status(200).json({ posts });
}

module.exports = { getOnePost, getPostList }