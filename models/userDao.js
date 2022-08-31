const { myDataSource } = require('./typeorm-client');

const login = async (email, password) => {
  // PART 2 : database 조작
  // username을 이용하는 사용자가 DB에 있는지 확인
  const [user] = await myDataSource.query(
    `
    SELECT 
      id, 
      email, 
      password 
    FROM users 
    WHERE email = ?
  `,
    [email]
  );
  return user;
};

module.exports = { login };
