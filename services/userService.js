const userDao = require('../models/userDao');
const userStackDao = require('../models/userStackDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 사용자 회원가입
const createUser = async (email, nickname, password) => {
  const result = await userDao.emailCheck(email);

  let check = "";

  if(result[0].email !== email) {
    
    const hashedPw = await bcrypt.hash(password, 10);
    await userDao.createUser(email, nickname, hashedPw);

    check = "success";
  } else {
    check = "fail";
  }

  return check;
}

// 사용자 정보 가져오기
const getUser = async (token) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  return await userDao.getUserById(user_id);
}

// 사용자 로그인
const userLogin = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  const result = { state: "fail", token: "" };

  if(user) {
    const ok = await bcrypt.compare(password, user.password);

    if(ok) {
      
      const token = jwt.sign({ user_id: user.id }, 'secretKey');

      result.state = "success";
      result.token = token;
    }
  }

  return result;
  
}
 
// 사용자 정보 수정
const updateUser = async (nickname, stacks, profile_image, token) => {
  const user_id = jwt.verify(token, 'secretKey').user_id;

  await userDao.updateUser(nickname, stacks, profile_image, user_id);

  const result = userStackDao.seleteUserStack(user_id);

  if(result) {
    await userStackDao.deleteUserStack(user_id);
  } 

  let arr = stacks.split(",");

  for(let i=0; i<arr.length; i++) {
    await userStackDao.insertUserStack(user_id, arr[i]);
  }
}

module.exports = { createUser, getUser, userLogin, updateUser }

