const { myDataSource } = require('./typeorm-client');
const commonDao = require('./commonDao');

const createComment = async (user_id, posting_id, comment) => {
  const table = 'postings';
  await commonDao.isCorrectId(table, posting_id);
  const comment_id = await myDataSource.query(
    `
  INSERT INTO comments (user_id, posting_id, comment) VALUES (?, ?, ?)
  `,
    [user_id, posting_id, comment]
  );
  const commentData = await myDataSource.query(
    `
    SELECT 
      comments.id,
      users.nickname, 
      users.profile_image, 
      comments.comment, 
      date_format(comments.create_at, '%Y-%m-%d %T') AS create_at
      FROM 
        comments 
      LEFT JOIN 
        users ON comments.user_id = users.id 
      WHERE comments.id = ?;
  `,
    [comment_id.insertId]
  );
  return commentData;
};

const readComment = async posting_id => {
  const table = 'postings';
  await commonDao.isCorrectId(table, posting_id);

  const comments = await myDataSource.query(
    `
    SELECT 
      comments.id,
      users.nickname, 
      users.profile_image, 
      comments.comment, 
      date_format(comments.create_at, '%Y-%m-%d %T') AS create_at
      FROM 
        comments 
      LEFT JOIN 
        users ON comments.user_id = users.id 
      WHERE comments.posting_id = ?;
  `,
    [posting_id]
  );
  return comments;
};

const updateComment = async (user_id, comment_id, comment) => {
  const table = 'comments';
  await commonDao.isCorrectId(table, comment_id);
  await commonDao.isCorrectId(table, comment_id, user_id);

  await myDataSource.query(
    `
    UPDATE comments SET comment = ? WHERE id = ?`,
    [comment, comment_id]
  );
  const commentData = await myDataSource.query(
    `
    SELECT 
      comments.id,
      users.nickname, 
      users.profile_image, 
      comments.comment, 
      date_format(comments.create_at, '%Y-%m-%d %T') AS create_at
      FROM 
        comments 
      LEFT JOIN 
        users ON comments.user_id = users.id 
      WHERE comments.id = ?;
  `,
    [comment_id]
  );
  return commentData;
};

const deleteComment = async (user_id, comment_id) => {
  let table = 'comments';
  // comments 테이블에 해당 comment_id 값이 있는지 확인
  await commonDao.isCorrectId(table, comment_id);
  // 해당 comment_id 작성자와 로그인 한 유저가 같은지 확인
  await commonDao.isCorrectId(table, comment_id, user_id);
  // comments 테이블에 comment_id 값 삭제
  const posting_id = await myDataSource.query(
    `
    SELECT posting_id FROM comments WHERE id = ?;
    `,
    [comment_id]
  );
  await commonDao.commonDelete(table, comment_id);
  return await readComment(posting_id[0].posting_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
