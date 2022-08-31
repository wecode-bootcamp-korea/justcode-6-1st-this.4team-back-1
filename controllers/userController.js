const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

function signupController(req, res) {
  res.status(500).json({ message: 'not implemented' }); // 구현이 되면 삭제합니다.
}

const login = async (req, res) => {
  const { email, password } = req.body.data;
  const { user } = await userService.login(email, password);

  try {
    // token 생성
    const token = jwt.sign({ user_id: user.id }, 'secretKey');
    // send token to frontend
    res.status(200).json({ message: 'LOGIN_SUCCESS', token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = { signupController, login };
