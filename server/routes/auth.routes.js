const express = require('express');
const router = express.Router();
const { login, logout, refreshToken } = require('../controllers/auth.controller')
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken)

module.exports = router;