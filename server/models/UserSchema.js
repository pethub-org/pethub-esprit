const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
    accountConfirmed: {
        type: Boolean,
        default: false
    },
    ban: {
        type: Boolean,
        default: false
    },

    photos: [
        {
            url: {
                type: String,
            },
            isMain: {
                type: Boolean,
                default: false
            }
        }
    ],
    friendList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendRequest',
    }],

});

const User = mongoose.model('User', UserSchema);

module.exports = User;