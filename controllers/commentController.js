const commentService = require('../services/commentService');
const asyncWrap = require('./async-wrap');

const createComment = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const { posting_id } = req.params;
  const { comment } = req.body;

  try {
    const commentData = await commentService.createComment(
      token,
      posting_id,
      comment
    );
    res.status(201).json({ commentData });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'createComment Error' });
  }
});

const readComment = asyncWrap(async (req, res) => {
  const { posting_id } = req.params;

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
  const token = req.headers.token;
  const { comment_id } = req.params;
  const { comment } = req.body;

  try {
    const commentData = await commentService.updateComment(
      token,
      comment_id,
      comment
    );
    res.status(200).json({ commentData, message: 'comment Updated' });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'UpdateComment Error' });
  }
});

const deleteComment = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const { comment_id } = req.params;
  console.log(comment_id);

  try {
    await commentService.deleteComment(token, comment_id);
    res.status(204).json({ message: 'Comment Deleted' });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json(err.message || { message: 'DeleteComment Error' });
  }
});
module.exports = { createComment, readComment, updateComment, deleteComment };
