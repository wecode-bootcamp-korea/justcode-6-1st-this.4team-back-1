const dataSource = require("./typeorm-client");

// 사용자 회원가입
const createUser = async (email, nickname, password) => {
  await dataSource.myDataSource.query(
    `INSERT INTO users(email, nickname, password) VALUES (?,?,?)`, [email, nickname, password]
  );
}

// 이메일 중복체크
const emailCheck = async (email) => {
  const result = await dataSource.myDataSource.query(
    `SELECT email FROM users WHERE email = ?`, [email]
  );

  return result;
}

// 이메일로 사용자 정보 가지고 오기
const getUserByEmail = async(email) => {
  const [user] = await dataSource.myDataSource.query(
    `SELECT * FROM users WHERE email = ?`, [email]
  );

  console.log('getUserByEmail : ', user);

  return user;
}

// 사용자 정보 수정
const updateUser = async (nickname, stacks, profile_image) => {
  await dataSource.myDataSource.query(
    `UPDATE users SET nickname = ?, stack = ?, profile_image = ?`, [nickname, stacks, profile_image]
  );
}

module.exports = {createUser, emailCheck, getUserByEmail, updateUser}
