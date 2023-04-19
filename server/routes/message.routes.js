const express = require('express');
const router = express.Router();
const { createMessage, getUserConversation } = require('../controllers/message.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const yup = require('yup');



router.post('/', createMessage)
router.get('/conversation/:conversationId', getUserConversation)


module.exports = router;