const { myDataSource } = require('./typeorm-client');

const deletePostingComment = async posting_id => {
  await myDataSource.query(
    `
      DELETE FROM comments WHERE posting_id = ?
    `,
    [posting_id]
  );
};

module.exports = { deletePostingComment };
