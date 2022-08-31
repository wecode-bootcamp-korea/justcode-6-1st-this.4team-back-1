const commentService = require('../services/commentService');

const createComment = async (req, res) => {
  const { token, posting_id, comment } = req.body.data;

  try {
    await commentService.createComment(token, posting_id, comment);
    res.status(201).json({ message: 'Comment Created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'CreateComment Error' });
  }
};

// return 해야하는 정보: users(nickname, profile_image), comments(content, created_at)
const readComment = async (req, res) => {
  const { posting_id } = req.body.data;

  try {
    const comments = await commentService.readComment(posting_id);
    res.status(200).json({ data: comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'ReadComment Error' });
  }
};

const updateComment = async (req, res) => {
  const { comment_id, comment } = req.body.data;

  try {
    await commentService.updateComment(comment_id, comment);
    res.status(200).json({ message: 'Comment Updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'UpdateComment Error' });
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.body.data;

  try {
    await commentService.deleteComment(comment_id);
    res.status(204).json({ message: 'Comment Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'DeleteComment Error' });
  }
};

module.exports = { createComment, readComment, updateComment, deleteComment };
