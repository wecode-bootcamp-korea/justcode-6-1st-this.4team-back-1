const { myDataSource } = require('./typeorm-client');

// 사용자 회원가입
const createUser = async (params, password) => {
  await myDataSource.query(
    `INSERT INTO users(email, nickname, password) VALUES (?,?,?)`,
    [params.get("email"), params.get("nickname"), password]
  );
};

// 이메일 중복체크
const emailCheck = async (email) => {
  return await myDataSource.query(`SELECT email FROM users WHERE email = ?`, 
  [email]);
};

// 이메일로 사용자 정보 가지고 오기
const getUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return user;
};

// 사용자 아이디로 정보 가지고 오기
const getUserById = async (id) => {
  return await myDataSource.query(
    `SELECT 
    USER.id AS user_id, 
    USER.nickname, 
    USER.profile_image,  
    JSON_ARRAYAGG(
       JSON_OBJECT(
          'stack_id', stacks.id,
          'stack_name', stacks.name,
          'stack_image', stacks.image
      )
    ) AS stack
    FROM users USER
    JOIN user_stack us ON us.user_id = USER.id
    JOIN stacks ON stacks.id = us.stack_id
    WHERE USER.id = ?`,
    [id]
  );
};

const updateUser = async (params, user_id) => {
  let query = `UPDATE users SET `;
  let condition = ``;
  let where = `WHERE id = ?`;

  let param = [];
  
  let nickname = params.get("nickname");
  let profile_image = params.get("profile_image");

  if( nickname&& !profile_image) {
    condition = `nickname = ?`;
    param.push(nickname);
  }

  if(profile_image && !nickname) {
    condition = `profile_image = ?`;
    param.push(profile_image);
  }

  if(nickname && profile_image) {
    condition = `nickname = ?, profile_image = ?`;
    param.push(nickname);
    param.push(profile_image);
  }

  query = query + condition + where;
  param.push(user_id);
  await myDataSource.query(
    query, param
  );
};

module.exports = {
  createUser,
  emailCheck,
  getUserByEmail,
  getUserById,
  updateUser,
};
