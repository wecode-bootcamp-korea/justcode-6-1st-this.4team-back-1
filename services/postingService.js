const postingDao = require('../models/postingDao');
const postingStackDao = require('../models/postingStackDao');
const stackService = require('./stackService');
const commonService = require('./commonService');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {object} params
 */
const createPosting = async params => {
  commonService.checkAllParams(params);

  const stacks = params.stack.split(',');
  await stackService.checkStackLength(stacks);

  // token 복호화
  const user_id = jwt.verify(params.token, 'secretKey').user_id;

  const { token, stack, ...newParams } = params;
  newParams.user_id = user_id;
  const posting_id = await postingDao.createPosting(newParams);
  await postingStackDao.insertPostingStack(posting_id, stacks);
};

const updatePosting = async params => {
  commonService.checkAllParams(params);
  const stacks = params.stack.split(',');
  await stackService.checkStackLength(stacks);
  // token 복호화
  const user_id = jwt.verify(params.token, 'secretKey').user_id;
  const { token, stack, ...newParams } = params;
  newParams.user_id = user_id;
  await postingDao.updatePosting(newParams);
  await postingStackDao.deletePostingStack(params.posting_id);
  await postingStackDao.insertPostingStack(params.posting_id, stacks);
};

const deletePosting = async (token, posting_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await postingDao.deletePosting(user_id, posting_id);
};

const closedPosting = async (token, posting_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await postingDao.closedPosting(user_id, posting_id);
};

const getOnePost = async post_id => {
  return await postingDao.getOnePost(post_id);
};

const getPostList = async (token, stacks, page, limit) => {
  let user_id = '';
  if (token) {
    user_id = jwt.verify(token, 'secretKey').user_id;
  }

  let limit_start = 0;
  if (page != 1) {
    limit_start = page * limit - (limit - 1) - 1;
  }
  return await postingDao.getPostList(user_id, stacks, limit_start, limit);
};

module.exports = {
  createPosting,
  updatePosting,
  deletePosting,
  closedPosting,
  getOnePost,
  getPostList,
};
