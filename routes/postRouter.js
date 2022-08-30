const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/one', postController.getOnePost);

module.exports = router;
