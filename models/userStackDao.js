const { myDataSource } = require('./typeorm-client');

const insertUserStack = async (user_id, stack_id) => {
  await myDataSource.query(
    `INSERT INTO user_stack (user_id, stack_id) VALUES (?,?)`, [user_id, stack_id]
  );
}

const deleteUserStack = async (user_id) => {
  await myDataSource.query(
    `DELETE FROM user_stack WHERE user_id = ?`, [user_id]
  );
}

const seleteUserStack = async (user_id) => {
  return await myDataSource.query(
    `SELECT * FROM user_stack WHERE user_id = ?`, [user_id]
  );
}

module.exports = { insertUserStack, deleteUserStack, seleteUserStack }