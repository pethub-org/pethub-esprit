const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false,
    },
    // description: {
    //     type: String,
    //     required: true
    // },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {
    timestamps: true,
    // strict: true,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;