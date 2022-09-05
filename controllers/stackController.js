const stackService = require('../services/stackService');

// 기술 스택 목록 가져오기.
const getStackList = async (req, res) => {
  const { category } = req.query;

  try {
    const stacks = await stackService.getStackList(category);
    return res.status(200).json({ stacks });
  } catch (err){
    res.status(err.status || 500).json(err.message);
  }
  
}

module.exports = { getStackList }