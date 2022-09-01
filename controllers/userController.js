const userService = require('../services/userService');

// 사용자 회원가입
const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;

  await userService.createUser( email, nickname, password );

  return res.status(201).json({ message : "success" });
}

// 이메일 중복체크
const emailCheck = async (req, res) => {
  const { email } = req.body;

  const result = await userService.emailCheck(email);

  switch(result) {
    case "success":
      return res.status(200).json({message: result});
    
    case "fail":
      return res.status(401).json({message: result});
  }
  
}

// 사용자 정보 가져오기
const getUser = async (req, res) => {
  const { email } = req.body;

  const user = await userService.getUser(email);

  return res.status(200).json({ nickname: user.nickname, stacks: user.stack, profile_image: user.profile_image });
}

// 사용자 로그인
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.userLogin(email, password);

  switch(result.state) {
    case "fail":
      return res.status(401).json({message: "login fail"});
    
    case "success":
      return res.status(200).json({message: "login success", tokon: result.token});
      
  }
}

// 사용자 정보 수정
const updateUser = async (req, res) => {
  const { nickname, stacks, profile_image } = req.body;

  await userService.updateUser(nickname, stacks, profile_image);

  return res.status(201).json({ message : "success" });
}

module.exports = { createUser, emailCheck, getUser, userLogin, updateUser }

