const stackDao = require('../models/stackDao');

const getStackList = async classification => {
  return await stackDao.getStackList(classification);
};

const checkStackLength = async stacks => {
  if (stacks.length > 5) {
    const error = new Error('Too many stacks selected!');
    error.status = 400;
    throw error;
  }
};

module.exports = { getStackList, checkStackLength };
