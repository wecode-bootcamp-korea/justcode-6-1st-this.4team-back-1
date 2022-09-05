const commentDao = require('../models/commentDao');
const jwt = require('jsonwebtoken');

const createComment = async (token, posting_id, comment) => {
  if (!token) {
    const err = new Error('User without login');
    err.status = 401;
    throw err;
  }
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await commentDao.createComment(user_id, posting_id, comment);
};

const readComment = async posting_id => {
  const comments = await commentDao.readComment(posting_id);
  return comments;
};

const updateComment = async (token, comment_id, comment) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await commentDao.updateComment(user_id, comment_id, comment);
};

const deleteComment = async (token, comment_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await commentDao.deleteComment(user_id, comment_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
