const Notifcation = require("../models/notificationSchema")
const getNotifcationsService = async () => {
    return await Notifcation.find({});
}
const getNotifcationService = async (id) => {
    return await Notifcation.findById(id);
}
const createNotificationService = async (notification) => {
    const n = new Notifcation(notification);
    return await n.save();
}

const getNotificationsForUserService = async (userId) => {
    const notifcation = await Notifcation.find({ receiver: userId })
        .populate({ path: 'receiver', strictPopulate: false })
        .populate({ path: 'sender', strictPopulate: false });
    return notifcation;
};

const updateNotificationService = async (id) => {
    return await Notifcation.findByIdAndUpdate(id, { seen: true }, { new: true });
}
module.exports = {
    createNotificationService,
    getNotifcationService,
    getNotifcationsService,
    getNotificationsForUserService,
    updateNotificationService
}