const { myDataSource } = require('./typeorm-client');


// 사용자 회원가입
const createUser = async (email, nickname, password) => {
  await myDataSource.query(
    `INSERT INTO users(email, nickname, password) VALUES (?,?,?)`, [email, nickname, password, ]
  );
}

// 이메일 중복체크
const emailCheck = async (email) => {
  return await myDataSource.query(
    `SELECT email FROM users WHERE email = ?`, [email]
  );;
}

// 이메일로 사용자 정보 가지고 오기
const getUserByEmail = async(email) => {
  const [user] = await myDataSource.query(
    `SELECT * FROM users WHERE email = ?`, [email]
  );

  return user;
}

// 사용자 아이디로 정보 가지고 오기
const getUserById = async(id) => {

  return await myDataSource.query(
    `SELECT USER.id, USER.nickname, USER.profile_image, stack.name FROM users USER
    JOIN user_stack us ON us.user_id = USER.id
    JOIN stacks stack ON stack.id = us.stack_id
    WHERE user.id = ?`, [id]
  );
}

// 사용자 정보 수정
const updateUser = async (nickname, stacks, profile_image, user_id) => {
  await myDataSource.query(
    `UPDATE users SET nickname = ?, profile_image = ? WHERE id = ?`, [nickname, profile_image, user_id]
  );
}

module.exports = {createUser, emailCheck, getUserByEmail, getUserById, updateUser}
