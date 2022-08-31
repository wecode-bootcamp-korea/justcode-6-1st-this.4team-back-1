const { myDataSource } = require('./typeorm-client');

const createComment = async (user_id, posting_id, comment) => {
  await myDataSource.query(
    `
  INSERT INTO comments (user_id, posting_id, comment) VALUES (?, ?, ?)
  `,
    [user_id, posting_id, comment]
  );
};

const readComment = async posting_id => {
  const comments = await myDataSource.query(
    `
    SELECT 
      users.nickname, 
      users.profile_image, 
      comments.comment, 
      comments.create_at 
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

const updateComment = async (comment_id, comment) => {
  await myDataSource.query(
    `
    UPDATE comments SET comment = ? WHERE id = ?`,
    [comment, comment_id]
  );
};

const deleteComment = async comment_id => {
  await myDataSource.query(
    `
    DELETE FROM comments WHERE id = ?`,
    [comment_id]
  );
};

module.exports = { createComment, readComment, updateComment, deleteComment };
