const { myDataSource } = require('./typeorm-client');

const getStackList = async(classification) => {
  let query = `SELECT * FROM stacks WHERE classification LIKE CONCAT('%',` + `?` + `,'%')`;

  if(classification === 'popular') {
    query = `SELECT stack.*, COUNT(ps.id) AS COUNT FROM stacks stack 
    JOIN posting_stack ps ON stack.id = ps.stack_id
    GROUP BY ps.stack_id
    ORDER BY COUNT DESC
    LIMIT 0,10`
  }
  return await myDataSource.query(
    query, [classification]
  )
}

module.exports = { getStackList }