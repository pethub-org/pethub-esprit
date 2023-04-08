const express = require('express');
const router = express.Router();
const { login, logout, refreshToken, revoke, confirmAccount } = require('../controllers/auth.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/logout', logout);
router.post('/revoke/:id', authenticationMiddleware, revoke)
router.post('/refresh-token', refreshToken)
router.get('/confirm/:token', confirmAccount)

module.exports = router;