const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('', userController.getUser);
router.post('/login', userController.userLogin);
router.post('', userController.updateUser);

module.exports = router;
