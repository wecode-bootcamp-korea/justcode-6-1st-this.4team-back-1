const express = require('express');
const stackController = require('../controllers/stackController');

const router = express.Router();

router.get('', stackController.getStackList);

module.exports = router;
