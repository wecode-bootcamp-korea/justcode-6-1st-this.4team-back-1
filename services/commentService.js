const commentDao = require('../models/commentDao');
const commonService = require('./commonService');
const jwt = require('jsonwebtoken');

const createComment = async (token, posting_id, comment) => {
  const params = { token, posting_id, comment };
  const user_id = jwt.verify(token, 'secretKey').user_id;

  const commentData = await commentDao.createComment(
    user_id,
    posting_id,
    comment
  );
  return commentData;
};

const readComment = async posting_id => {
  const comments = await commentDao.readComment(posting_id);
  return comments;
};

const updateComment = async (token, comment_id, comment) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  const commentData = await commentDao.updateComment(
    user_id,
    comment_id,
    comment
  );
  return commentData;
};

const deleteComment = async (token, comment_id) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  return await commentDao.deleteComment(user_id, comment_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
