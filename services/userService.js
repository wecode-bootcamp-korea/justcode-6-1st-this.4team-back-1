const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 사용자 회원가입
const createUser = async (email, nickname, password) => {
  const hashedPw = await bcrypt.hash(password, 10);
  await userDao.createUser(email, nickname, hashedPw);
}

// 이메일 중복체크
const emailCheck = async (email) => {
  const result = await userDao.emailCheck(email);

  let check = "";

  if(!result) {
    check = "success";
  } else {
    check = "fail";
  }

  return check;
}

// 사용자 정보 가져오기
const getUser = async (email) => {
  const user = await userDao.getUserByEmail(email);

  return user;
}

// 사용자 로그인
const userLogin = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  const result = { state: "fail", token: "" };

  if(user) {
    const ok = await bcrypt.compare(password, user.password);

    if(ok) {
      const token = jwt.sign({ userId: user.id }, 'secretKey');

      result.state = "success";
      result.token = token;
    }
  }

  return result;
  
}
 
// 사용자 정보 수정
const updateUser = async (nickname, stacks, profile_image) => {
  await userDao.updateUser(nickname, stacks, profile_image);
}

module.exports = { createUser, emailCheck, getUser, userLogin, updateUser }

