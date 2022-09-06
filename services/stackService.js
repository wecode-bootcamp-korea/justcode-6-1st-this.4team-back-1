const stackDao = require('../models/stackDao');

const getStackList = async category => {
  let classification = '';

  switch (category) {
    case '인기':
      classification = 'popular';
      break;
    case '프론트엔드':
      classification = 'front';
      break;
    case '백엔드':
      classification = 'back';
      break;
    case '모바일':
      classification = 'mobile';
      break;
    case '기타':
      classification = 'etc';
      break;
  }

  console.log;


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
