const { myDataSource } = require('./typeorm-client');

/**
 * table에 해당 값이 있는지 확인: table, id 입력
 *
 * 요청한 사람과 작성자가 같은지 확인: table, id, user_id 입력
 *
 * @param {string} table 테이블 이름
 * @param {string} id 테이블 PK값
 * @param {int} user_id 작성자 PK값
 *
 */
const isCorrectId = async (table, id, user_id) => {
  let params = [];
  let query = `SELECT EXISTS (SELECT * FROM ` + table;

  // 해당 table id에 해당하는 값이 있는지
  if (!user_id) {
    query += ` WHERE id = ?) AS SUCCESS`;
    params.push(id);

    const isCorrectId = await myDataSource.query(query, params);

    if (isCorrectId[0].SUCCESS === '0') {
      const err = new Error(`Not Correct ${table}_id`);
      err.status = 404;
      throw err;
    }
  }
  // 해당 table id의 작성자가 user_id가 맞는지
  else {
    query += ` WHERE user_id = ? AND id =?) AS SUCCESS;`;
    params.push(user_id, id);

    const isCorrectId = await myDataSource.query(query, params);

    if (isCorrectId[0].SUCCESS === '0') {
      const err = new Error('Not Correct User');
      err.status = 404;
      throw err;
    }
  }
};

/**
 * table의 PK에 해당하는 값 삭제
 * @param {string} table 테이블 이름
 * @param {int} id 테이블 PK값
 */
const commonDelete = async (table, id) => {
  let query = `DELETE FROM ` + table;

  if (table === 'posting_stack') {
    query += ` WHERE posting_id = ?`;
  } else {
    query += ` WHERE id = ?`;
  }
  await myDataSource.query(query, id);
};

module.exports = { isCorrectId, commonDelete };
