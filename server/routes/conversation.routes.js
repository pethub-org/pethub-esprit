const express = require('express');
const router = express.Router();
const { createConversation, getUserConversation, getTwoUsersConversation, getUserLatestConversation } = require('../controllers/conversation.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const yup = require('yup');



router.post('/', createConversation)
router.get('/latest/:userId', getUserLatestConversation)
router.get('/:userId', getUserConversation)
router.get('/:firstUserId/:secondUserId', getTwoUsersConversation)


module.exports = router;