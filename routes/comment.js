const express = require('express');
const {
  createComment,
  readComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/:posting_id', createComment);
router.get('/:posting_id', readComment);
router.patch('/:comment_id', updateComment);
router.delete('/:comment_id', deleteComment);

module.exports = router;
