const express = require('express');
const {
  createPosting,
  updatePosting,
  deletePosting,
  closedPosting,
  getOnePost,
  getPostList,
} = require('../controllers/postingController');

const router = express.Router();

router.post('', createPosting);
router.patch('/:posting_id', updatePosting);
router.patch('/closed/:posting_id', closedPosting);
router.delete('/:posting_id', deletePosting);
router.get('/:posting_id', getOnePost);
router.get('', getPostList);

module.exports = router;
