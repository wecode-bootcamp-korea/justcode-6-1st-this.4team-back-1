const { myDataSource } = require('./typeorm-client');
const postingStackDao = require('./postingStackDao');
const postingCommentDao = require('./postingCommentDao');
const commonDao = require('./commonDao');

const createPosting = async (
  classification,
  volume,
  onoffline,
  progress_period,
  start_date,
  contact,
  contact_content,
  user_id,
  title,
  contents
) => {
  const posting_id = await myDataSource.query(
    `
      INSERT INTO 
        postings(classification,
          volume,
          onoffline,
          progress_period,
          start_date,
          contact,
          contact_content,
          user_id,
          title,
          contents)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      classification,
      volume,
      onoffline,
      progress_period,
      start_date,
      contact,
      contact_content,
      user_id,
      title,
      contents,
    ]
  );
  return posting_id.insertId;
};

const updatePosting = async (
  user_id,
  posting_id,
  classification,
  volume,
  onoffline,
  progress_period,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const isCorrectPostingId = await myDataSource.query(
    `
      SELECT EXISTS (SELECT * FROM postings WHERE id = ?) AS SUCCESS;
    `,
    [posting_id]
  );
  if (isCorrectPostingId[0].SUCCESS === '0') {
    const err = new Error(`NOT CORRECT POSTING!`);
    err.status = 404;
    throw err;
  }
  let table = 'postings';
  await commonDao.isCorrectUserId(table, user_id, posting_id);

  await myDataSource.query(
    `
  UPDATE
    postings
    
    SET
      classification = ?,
      volume = ?,
      onoffline = ?,
      progress_period = ?,
      start_date = ?,
      contact = ?,
      contact_content = ?,
      title = ?,
      contents = ?
    WHERE id = ?
  `,
    [
      classification,
      volume,
      onoffline,
      progress_period,
      start_date,
      contact,
      contact_content,
      title,
      contents,
      posting_id,
    ]
  );
};

const deletePosting = async (user_id, posting_id) => {
  const isCorrectPostingId = await myDataSource.query(
    `
      SELECT EXISTS (SELECT * FROM postings WHERE id = ?) AS SUCCESS;
    `,
    [posting_id]
  );
  if (isCorrectPostingId[0].SUCCESS === '0') {
    const err = new Error(`NOT CORRECT POSTING!`);
    err.status = 404;
    throw err;
  }
  let table = 'postings';
  await commonDao.isCorrectUserId(table, user_id, posting_id);

  await postingStackDao.deletePostingStack(posting_id);
  await postingCommentDao.deletePostingComment(posting_id);

  await commonDao.commonDelete(table, posting_id);
};

const closedPosting = async (user_id, posting_id) => {
  const isCorrectPostingId = await myDataSource.query(
    `
      SELECT EXISTS (SELECT * FROM postings WHERE id = ?) AS SUCCESS;
    `,
    [posting_id]
  );
  if (isCorrectPostingId[0].SUCCESS === '0') {
    const err = new Error('Not Correct Posting Id!');
    err.status = 404;
    throw err;
  }
  let table = 'postings';
  await commonDao.isCorrectUserId(table, user_id, posting_id);

  await myDataSource.query(
    `
      UPDATE postings SET is_closed = 'Y' WHERE id = ?;
    `,
    [posting_id]
  );
};

// 게시글 상세페이지
const getOnePost = async post_id => {
  return await myDataSource.query(
    `SELECT 
    post.title, 
    USER.nickname, 
    USER.profile_image, 
    DATE_FORMAT(post.create_at, '%Y.%m.%d') AS create_at,
    post.classification, 
    post.volume, 
    post.onoffline,
    DATE_FORMAT(post.start_date, '%Y.%m.%d') AS start_date,
    post.contact_content, 
    post.progress_period,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'stack_name', stack.name,
        'stack_image', stack.image
      )
    ) AS stack
    FROM postings post
    JOIN users USER ON post.user_id = USER.id
    JOIN posting_stack ps ON post.id = ps.posting_id
    JOIN stacks stack ON ps.stack_id = stack.id
    WHERE post.id = ?
    `,
    [post_id]
  );
};

// 게시글 목록
const getPostList = async (user_id, stacks) => {
  let param = [];

  let query = `SELECT 
  post.id AS post_id,
  post.title, 
  USER.nickname, 
  USER.profile_image, 
  DATE_FORMAT(post.create_at, '%Y.%m.%d') AS create_at,
  post.classification, 
  post.volume, 
  post.onoffline,
  DATE_FORMAT(post.start_date, '%Y.%m.%d') AS start_date,
  post.contact_content, 
  post.progress_period,
  (SELECT COUNT(*) FROM comments WHERE posting_id = post_id) AS comment_cnt,
  (
    SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'stack_id', stack.id,
          'stack_name', stack.name,
          'stack_image', stack.image
        )
      ) AS stack
    FROM postings post
    JOIN posting_stack ps ON post.id = ps.posting_id
    JOIN stacks stack ON ps.stack_id = stack.id
    WHERE post.id = post_id
  ) AS stack
  FROM postings post
  JOIN users USER ON post.user_id = USER.id
  JOIN posting_stack ps ON post.id = ps.posting_id
  JOIN stacks stack ON ps.stack_id = stack.id `;

  if (user_id) {
    query = query + `WHERE user_id = ? GROUP BY post.id`;
    param.push(user_id);
  }

  if (stacks) {
    let arr = stacks.split(',');

    query = query + `WHERE stack.id IN (?) GROUP BY post.id`;
    param.push(arr);
  }

  return await myDataSource.query(query, param);
};

module.exports = {
  createPosting,
  updatePosting,
  deletePosting,
  closedPosting,
  getOnePost,
  getPostList,
};
