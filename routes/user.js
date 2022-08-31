const express = require('express');
const { signupController, login } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', login);

module.exports = router;
