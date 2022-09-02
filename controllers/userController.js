const userService = require('../services/userService');

// 사용자 회원가입
const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;

  try {
    await userService.createUser( email, nickname, password );

    return res.status(201).json({ message : "success" });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 이메일 중복체크
const emailCheck = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await userService.emailCheck(email);

    switch(result) {
      case "success":
        return res.status(200).json({message: result});
      
      case "fail":
        return res.status(400).json({message: result});
    }
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 사용자 정보 가져오기
const getUser = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await userService.getUser(token);

    return res.status(200).json({ nickname: user.nickname, stacks: user.stack, profile_image: user.profile_image });
  } catch (error) {
    res.status(err.status || 500).json(err.message);
  }
  
}

// 사용자 로그인
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {

    const result = await userService.userLogin(email, password);

    switch(result.state) {
      case "fail":
        return res.status(401).json({message: "login fail"});
      
      case "success":
        return res.status(200).json({message: "login success", tokon: result.token});
        
    }
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
  
}

// 사용자 정보 수정
const updateUser = async (req, res) => {
  const { nickname, stacks, profile_image, token } = req.body;

  try {
    await userService.updateUser(nickname, stacks, profile_image, token);

    return res.status(201).json({ message : "success" });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { createUser, emailCheck, getUser, userLogin, updateUser }

