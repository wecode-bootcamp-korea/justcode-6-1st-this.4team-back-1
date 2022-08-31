const express = require('express');

const userRouter = require('./user');
const postingRouter = require('./posting');
const commentRouter = require('./comment');

const router = express.Router();

router.use('/user', userRouter);
router.use('/posting', postingRouter);
router.use('/comment', commentRouter);

module.exports = router;
