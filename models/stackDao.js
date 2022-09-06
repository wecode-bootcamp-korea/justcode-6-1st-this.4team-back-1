const e = require('express');
const { myDataSource } = require('./typeorm-client');

const getStackList = async classification => {
  let query = `SELECT * FROM stacks`;

  if (classification === 'popular') {
    query = `SELECT stack.*, COUNT(ps.id) AS COUNT FROM stacks stack 
    JOIN posting_stack ps ON stack.id = ps.stack_id
    GROUP BY ps.stack_id
    ORDER BY COUNT DESC
    LIMIT 0,10`;
  }

  if (classification !== 'popular' && classification) {
    query = query + ` WHERE classification LIKE CONCAT('%',` + `?` + `,'%')`;
  }

  return await myDataSource.query(query, [classification]);
};

module.exports = { getStackList };
