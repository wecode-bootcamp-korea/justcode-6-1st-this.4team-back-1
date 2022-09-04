const express = require('express');

const router = express.Router();

const userRouter = require('./user');
const postingRouter = require('./posting');
const stackRouter = require('./stack');
const commentRouter = require('./comment');

router.use('/user', userRouter);
router.use('/post', postingRouter);
router.use('/comment', commentRouter);
router.use('/stack', stackRouter);

module.exports = router;
