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

module.exports = { createPosting, updatePosting, deletePosting };
