const postDao = require('../models/postDao');

const getOnePost = async (post_id) => {

  return await postDao.getOnePost(post_id);
}

const getPostList = async (user_id, is_closed, stacks, classification) => {
  
  return await postDao.getPostList(user_id, is_closed, stacks, classification);
}

module.exports = { getOnePost, getPostList }