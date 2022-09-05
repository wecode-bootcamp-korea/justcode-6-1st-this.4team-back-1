const { myDataSource } = require('./typeorm-client');

const insertPostingStack = async (posting_id, stacks) => {
  for (let i = 0; i < stacks.length; i++) {
    await myDataSource.query(
      `
        INSERT INTO
        posting_stack(posting_id, stack_id)
        VALUES (?, ?)
        `,
      [posting_id, stacks[i]]
    );
  }
};

const deletePostingStack = async posting_id => {
  await myDataSource.query(
    `
      DELETE FROM posting_stack WHERE posting_id = ?
    `,
    [posting_id]
  );
};

module.exports = { insertPostingStack, deletePostingStack };
