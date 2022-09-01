const express = require('express');
const {
  createPosting,
  updatePosting,
  deletePosting,
  getOnePost,
  getPostList
} = require('../controllers/postingController');

const router = express.Router();

router.post('/register', createPosting);
router.patch('/update', updatePosting);
router.delete('/delete', deletePosting);
router.get('/one', getOnePost);
router.get('/list', getPostList);

module.exports = router;
