const express = require('express');
const {
  createPosting,
  updatePosting,
  deletePosting,
} = require('../controllers/postingController');

const router = express.Router();

router.post('/register', createPosting);
router.patch('/update', updatePosting);
router.delete('/delete', deletePosting);

module.exports = router;
