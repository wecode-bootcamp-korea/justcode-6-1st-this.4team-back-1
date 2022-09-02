const postingService = require('../services/postingService.js');
const asyncWrap = require('./async-wrap');

const createPosting = asyncWrap(async (req, res) => {
  const {
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
  } = req.body;
  try {
    await postingService.createPosting(
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
      contents
    );
    res.status(201).json({ message: 'Posting Created' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const updatePosting = asyncWrap(async (req, res) => {
  try {
    const {
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
    } = req.body;
    await postingService.updatePosting(
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
      contents
    );
    res.status(200).json({ message: 'Posting Updated' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const deletePosting = asyncWrap(async (req, res) => {
  const { token, posting_id } = req.body;
  try {
    await postingService.deletePosting(token, posting_id);
    res.status(204).json({ message: 'Posting Deleted' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getOnePost = async (req, res) => {
  const { post_id } = req.body;

  try {
    const post = await postingService.getOnePost(post_id);
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }

}

const getPostList = async (req, res) => {
  const { token }  = req.headers;
  const { stacks } = req.query;

  try{
    const posts = await postingService.getPostList(token, stacks);
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
  
}

module.exports = { createPosting, updatePosting, deletePosting, getOnePost, getPostList };

