const stackDao = require('../models/stackDao');

const getStackList = async (classification) => {
  return await stackDao.getStackList(classification);
}

module.exports = { getStackList };