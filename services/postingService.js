const postingDao = require('../models/postingDao');
const postingStackDao = require('../models/postingStackDao');
const stackService = require('./stackService');
const jwt = require('jsonwebtoken');

const createPosting = async (
  token,
  classification,
  volume,
  onoffline,
  progress_period,
  stack,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const params = {
    token,
    classification,
    volume,
    onoffline,
    progress_period,
    stack,
    start_date,
    contact,
    contact_content,
    title,
    contents,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value == false || value == undefined) {
      const error = new Error(`${key} value not entered!`);
      error.status = 400;
      throw error;
    }
  }
  const stacks = stack.split(',');
  await stackService.checkStackLength(stacks);

  // token 복호화
  const user_id = jwt.verify(token, 'secretKey').user_id;

  console.log(user_id);
  const posting_id = await postingDao.createPosting(
    classification,
    volume,
    onoffline,
    progress_period,
    start_date,
    contact,
    contact_content,
    user_id,
    title,
    contents
  );
  await postingStackDao.insertPostingStack(posting_id, stacks);
};

const updatePosting = async (
  token,
  posting_id,
  classification,
  volume,
  onoffline,
  progress_period,
  stack,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const params = [
    token,
    posting_id,
    classification,
    volume,
    onoffline,
    progress_period,
    stack,
    start_date,
    contact,
    contact_content,
    title,
    contents,
  ];
  for (const [key, value] of Object.entries(params)) {
    if (value == false || value == undefined) {
      const error = new Error(`${key} value not entered!`);
      error.status = 400;
      throw error;
    }
  }
  const stacks = stack.split(',');
  await stackService.checkStackLength(stacks);
  // token 복호화
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await postingDao.updatePosting(
    user_id,
    posting_id,
    classification,
    volume,
    onoffline,
    progress_period,
    start_date,
    contact,
    contact_content,
    title,
    contents
  );
  await postingStackDao.deletePostingStack(posting_id);
  await postingStackDao.insertPostingStack(posting_id, stacks);
};

const deletePosting = async (token, posting_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await postingDao.deletePosting(user_id, posting_id);
};

const closedPosting = async (token, posting_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await postingDao.closedPosting(user_id, posting_id);
};

const getOnePost = async (post_id) => {

  return await postingDao.getOnePost(post_id);
}

const getPostList = async (token, stacks, page, limit) => {

  let user_id = "";
  if(token) {
    user_id = jwt.verify(token, 'secretKey').user_id;
  }

  let limit_start = 0;
  if(page != 1) {
    limit_start = (page*limit)-(limit-1);
  }

  return await postingDao.getPostList(user_id, stacks, limit_start, limit);
}

module.exports = {
  createPosting,
  updatePosting,
  deletePosting,
  closedPosting,
  getOnePost,
  getPostList,
};
