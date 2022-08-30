const postDao = require('../models/postDao');

const getOnePost = async (post_id) => {
  const post = await postDao.getOnePost(post_id);

  return post;
}

module.exports = { getOnePost }