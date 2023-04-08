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
    description: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    strict: true
});

const Notification = mongoose.model('Event', NotificationSchema);

module.exports = Notification;