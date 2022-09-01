const postDao = require('../models/postDao');

const getOnePost = async (post_id) => {

  return await postDao.getOnePost(post_id);
}

const getPostList = async (user_id, stacks) => {
  
  return await postDao.getPostList(user_id, stacks);
}

module.exports = { getOnePost, getPostList }