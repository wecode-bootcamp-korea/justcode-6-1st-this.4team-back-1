const userService = require('../services/userService');
const asyncWrap = require('./async-wrap');
const { userVo } = require('../vo/userVo');

// 사용자 회원가입
const createUser = asyncWrap(async (req, res) => {
  const params = userVo(req.body);

  try {
    const result = await userService.createUser(params);

    switch (result) {
      case 'success':
        return res.status(201).json({ message: result });

      case 'fail':
        return res.status(400).json({ message: result });
    }
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

// 사용자 정보 가져오기
const getUser = asyncWrap(async (req, res) => {
  const { token } = req.headers;
  try {
    const user = await userService.getUser(token);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

// 사용자 로그인
const userLogin = asyncWrap(async (req, res) => {
  const params = userVo(req.body);

  try {
    const result = await userService.userLogin(params);

    switch (result.state) {
      case 'fail':
        return res.status(401).json({ message: 'login fail' });

      case 'success':
        return res
          .status(200)
          .json({ message: 'login success', token: result.token });
    }
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

// 사용자 정보 수정
const updateUser = asyncWrap(async (req, res) => {
  const { token } = req.headers;
  const params = userVo(req.body);

  try {
    await userService.updateUser(params, token);

    return res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

module.exports = { createUser, getUser, userLogin, updateUser };
