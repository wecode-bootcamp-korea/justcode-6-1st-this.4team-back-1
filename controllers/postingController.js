const postingService = require('../services/postingService.js');
const asyncWrap = require('./async-wrap');

const createPosting = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const {
    classification,
    volume,
    start_date,
    onoffline,
    progress_period,
    stack,
    contact,
    contact_content,
    title,
    contents,
  } = req.body;
  try {
    const params = {
      token,
      classification,
      volume,
      onoffline,
      progress_period,
      stack,
      start_date,
      contact,
      contact_content,
      title,
      contents,
    };
    await postingService.createPosting(params);
    res.status(201).json({ message: 'Posting Created' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const updatePosting = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const { posting_id } = req.params;
  const {
    classification,
    volume,
    onoffline,
    progress_period,
    stack,
    start_date,
    contact,
    contact_content,
    title,
    contents,
  } = req.body;
  try {
    const params = {
      token,
      posting_id,
      classification,
      volume,
      onoffline,
      progress_period,
      stack,
      start_date,
      contact,
      contact_content,
      title,
      contents,
    };

    await postingService.updatePosting(params);
    res.status(200).json({ message: 'Posting Updated' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const deletePosting = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const { posting_id } = req.params;
  try {
    await postingService.deletePosting(token, posting_id);
    res.status(204).json({ message: 'Posting Deleted' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const closedPosting = asyncWrap(async (req, res) => {
  const token = req.headers.token;
  const { posting_id } = req.params;

  try {
    await postingService.closedPosting(token, posting_id);
    res.status(200).json({ message: 'Posting is closed!' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getOnePost = asyncWrap(async (req, res) => {
  const { posting_id } = req.params;
  try {
    const post = await postingService.getOnePost(posting_id);
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getPostList = asyncWrap(async (req, res) => {

  const { token } = req.headers;
  const { stacks, page, limit } = req.query;
  const { userId } = req.param;

  try {
    const posts = await postingService.getPostList(token, stacks, page, limit);
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

module.exports = {
  createPosting,
  updatePosting,
  deletePosting,
  closedPosting,
  getOnePost,
  getPostList,
};
