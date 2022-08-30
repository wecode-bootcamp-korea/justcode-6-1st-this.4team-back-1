const postService = require('../services/postService');

const getOnePost = async (req, res) => {
  const { post_id } = req.body;

  const post = await postService.getOnePost(post_id);

  return res.status(200).json(post);
}

module.exports = { getOnePost }