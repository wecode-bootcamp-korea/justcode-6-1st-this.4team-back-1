const { myDataSource } = require('./typeorm-client');
const postingStackDao = require('./postingStackDao');
const postingCommentDao = require('./postingCommentDao');
const commonDao = require('./commonDao');

/**
 *
 * @param {object} params classification, ... , contents
 * @returns postings의 새로 삽입 된 PK값
 */
const createPosting = async params => {
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
      params.classification,
      params.volume,
      params.onoffline,
      params.progress_period,
      params.start_date,
      params.contact,
      params.contact_content,
      params.user_id,
      params.title,
      params.contents,
    ]
  );
  return posting_id.insertId;
};

/**
 *
 * @param {object} params classification, ... , contents, posting_id
 */
const updatePosting = async params => {
  let table = 'postings';
  //테이블에 해당 PK값이 있는지 확인
  await commonDao.isCorrectId(table, params.posting_id);
  //작성자 일치여부 확인
  await commonDao.isCorrectId(table, params.posting_id, params.user_id);

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
      params.classification,
      params.volume,
      params.onoffline,
      params.progress_period,
      params.start_date,
      params.contact,
      params.contact_content,
      params.title,
      params.contents,
      params.posting_id,
    ]
  );
};

/**
 *
 * @param {int} user_id 작성자 PK값
 * @param {int} posting_id 게시글 PK값
 */
const deletePosting = async (user_id, posting_id) => {
  let table = 'postings';
  await commonDao.isCorrectId(table, posting_id);
  await commonDao.isCorrectId(table, posting_id, user_id);

  await postingStackDao.deletePostingStack(posting_id);
  await postingCommentDao.deletePostingComment(posting_id);

  await commonDao.commonDelete(table, posting_id);
};

/**
 *
 * @param {*} user_id 작성자 PK값
 * @param {*} posting_id 게시글 PK값
 */
const closedPosting = async (user_id, posting_id) => {
  let table = 'postings';
  //테이블에 해당 PK값이 있는지 확인
  await commonDao.isCorrectId(table, posting_id);
  //작성자 일치여부 확인
  await commonDao.isCorrectId(table, user_id, posting_id);

  const is_closed = await myDataSource.query(
    `
      SELECT is_closed FROM postings WHERE id = ?;
    `,
    [posting_id]
  );
  if (!is_closed) {
    await myDataSource.query(
      `
      UPDATE postings SET is_closed = true WHERE id = ?;
      `,
      [posting_id]
    );
  } else if (is_closed) {
    await myDataSource.query(
      `
      UPDATE postings SET is_closed = false WHERE id = ?;
      `,
      [posting_id]
    );
  }
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
    post.contents,
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
const getPostList = async (user_id, stacks, page, limit) => {
  let where = '';
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
  post.is_closed,
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
    where = `WHERE user_id = ?`;
    param.push(user_id);
  }

  if (stacks) {
    let arr = stacks.split(',');

    where = `WHERE stack.id IN (?)`;
    param.push(arr);
  }

  query = query + where + ` GROUP BY post.id ORDER By post.id limit ?, ?`;
  param.push(page);
  param.push(Number(limit));
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
