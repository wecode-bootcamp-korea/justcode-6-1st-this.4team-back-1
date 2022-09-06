const { myDataSource } = require('./typeorm-client');
const commonDao = require('./commonDao');

const createComment = async (user_id, posting_id, comment) => {
  const table = 'postings';
  await commonDao.isCorrectId(table, posting_id);
  await myDataSource.query(
    `
  INSERT INTO comments (user_id, posting_id, comment) VALUES (?, ?, ?)
  `,
    [user_id, posting_id, comment]
  );
};

const readComment = async posting_id => {
  const table = 'postings';
  await commonDao.isCorrectId(table, posting_id);

  const comments = await myDataSource.query(
    `
    SELECT 
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
};

const deleteComment = async (user_id, comment_id) => {
  let table = 'comments';
  await commonDao.isCorrectId(table, comment_id, user_id);
  await commonDao.commonDelete(table, comment_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
