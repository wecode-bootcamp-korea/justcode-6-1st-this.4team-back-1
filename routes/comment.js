const express = require('express');
const {
  createComment,
  readComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/register', createComment);
router.get('', readComment);
router.patch('/update', updateComment);
router.delete('/delete', deleteComment);

module.exports = router;
