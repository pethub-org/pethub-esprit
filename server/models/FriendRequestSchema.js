const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    // strict: true,
});

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest;