const Notification = require("../models/notificationSchema");
const { getNotifcationsService, getNotifcationService, createNotificationService, getNotificationsForUserService, updateNotificationService } = require('../services/notification.service');

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await getNotifcationsService();
        return res.status(200).json(notifications)
    } catch (error) {
        return next(error)
    }

}
const getNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await getNotifcationService(id);
        return res.status(200).json(notification)
    } catch (error) {
        return next(error)
    }
}
const createNotification = async (req, res, next) => {
    try {
        const { type, receiver, content } = req.body;
        const sender = req.user._id
        const notification = await createNotificationService({ type, sender, receiver, content })
        return res.status(200).json({ notification })
    } catch (error) {
        next(error)
    }

}

const getNotificationForUser = async (req, res, next) => {
    try {
        // const user = req.user;
        const { id } = req.params;
        const notification = await getNotificationsForUserService(id);
        return res.status(200).json(notification)
    } catch (error) {
        next(error)
    }
}

const updateNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await updateNotificationService(id);
        return res.status(200).json(notification)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    getNotificationForUser,
    updateNotification
}