const { myDataSource } = require('./typeorm-client');

const isCorrectUserId = async (table, user_id, id) => {
  let params = [];
  let query = `SELECT EXISTS (SELECT * FROM `;
  query += table + ` WHERE user_id = ? AND id =?) AS SUCCESS;`;

  params.push(user_id);
  params.push(id);

  const isCorrectId = await myDataSource.query(query, params);
  if (isCorrectId[0].SUCCESS === '0') {
    const err = new Error('Not Correct User');
    err.status = 404;
    throw err;
  }
};

const commonDelete = async (table, id) => {
  let query = `DELETE FROM `;
  query += table;
  if (table === 'posting_stack') {
    query += ` WHERE posting_id = ?`;
  } else {
    query += ` WHERE id = ?`;
  }
  await myDataSource.query(query, id);
};

module.exports = { isCorrectUserId, commonDelete };
