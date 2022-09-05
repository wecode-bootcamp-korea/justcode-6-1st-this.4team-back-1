const { myDataSource } = require('./typeorm-client');
const commonDao = require('./commonDao');

const createComment = async (user_id, posting_id, comment) => {
  const isLoginUser = await myDataSource.query(
    `
      SELECT EXISTS (SELECT * FROM users WHERE id = ?) AS SUCCESS;
    `,
    [user_id]
  );
  if (isLoginUser[0].SUCCESS === '0') {
    const err = new Error('Not Login User!');
    err.status = 401;
    throw err;
  }
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
  await myDataSource.query(
    `
  INSERT INTO comments (user_id, posting_id, comment) VALUES (?, ?, ?)
  `,
    [user_id, posting_id, comment]
  );
};

const readComment = async posting_id => {
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
  const isCorrectCommentId = await myDataSource.query(
    `
      SELECT EXISTS (SELECT * FROM comments WHERE id = ?) AS SUCCESS;
    `,
    [comment_id]
  );
  if (isCorrectCommentId[0].SUCCESS === '0') {
    const err = new Error('Not Correct Comment Id');
    err.status = 404;
    throw err;
  }
  const isCorrectId = await myDataSource.query(
    `
  SELECT EXISTS (SELECT * FROM comments WHERE user_id = ? AND id = ? limit 1) AS SUCCESS
  `,
    [user_id, comment_id]
  );
  if (isCorrectId[0].SUCCESS === '0') {
    const err = new Error('NOT CORRECT USER');
    err.status = 403;
    throw err;
  }
  await myDataSource.query(
    `
    UPDATE comments SET comment = ? WHERE id = ?`,
    [comment, comment_id]
  );
};

const deleteComment = async (user_id, comment_id) => {
  let table = 'comments';
  await commonDao.isCorrectUserId(table, user_id, comment_id);
  await commonDao.commonDelete(table, comment_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
