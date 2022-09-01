const commentService = require('../services/commentService');
const asyncWrap = require('./async-wrap');

const createComment = asyncWrap(async (req, res) => {
  const { token, posting_id, comment } = req.body;
  if (!token) {
    const err = new Error('User without login');
    err.status = 401;
    throw err;
  }
  try {
    await commentService.createComment(token, posting_id, comment);
    res.status(201).json({ message: 'Comment Created' });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'createComment Error' });
  }
});

// return 해야하는 정보: users(nickname, profile_image), comments(comment, created_at)
const readComment = asyncWrap(async (req, res) => {
  const { posting_id } = req.body;

  try {
    const comments = await commentService.readComment(posting_id);
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'ReadComment Error' });
  }
});

const updateComment = asyncWrap(async (req, res) => {
  const { comment_id, comment } = req.body;

  try {
    await commentService.updateComment(comment_id, comment);
    res.status(200).json({ message: 'Comment Updated' });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'UpdateComment Error' });
  }
});

const deleteComment = asyncWrap(async (req, res) => {
  const { comment_id } = req.body;

  try {
    await commentService.deleteComment(comment_id);
    res.status(204).json({ message: 'Comment Deleted' });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'DeleteComment Error' });
  }
});
module.exports = { createComment, readComment, updateComment, deleteComment };
