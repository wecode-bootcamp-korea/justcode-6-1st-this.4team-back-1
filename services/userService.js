const userDao = require('../models/userDao');

function signup() {}

const login = async (email, password) => {
  const user = await userDao.login(email);

  return { user };
};

module.exports = { signup, login };
