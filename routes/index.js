const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const stackRouter = require('./stackRouter');

router.use('/user', userRouter);
router.use('/posting', postRouter);
router.use('/stack', stackRouter);

module.exports = router;
