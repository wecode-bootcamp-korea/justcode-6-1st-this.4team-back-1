const stackService = require('../services/stackService');

const getStackList = async (req, res) => {
  const { classification } = req.body;

  const stacks = await stackService.getStackList(classification);

  return res.status(200).json({ stacks });
}

module.exports = { getStackList }