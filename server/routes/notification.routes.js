const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, getNotification, getNotificationForUser, updateNotification } = require('../controllers/notification.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const yup = require('yup');


router.post('/', authenticationMiddleware, createNotification)
router.get('/', getNotifications)
router.get('/:id', getNotification)
router.put('/:id', updateNotification)
router.get('/user/:id', authenticationMiddleware, getNotificationForUser)



module.exports = router;