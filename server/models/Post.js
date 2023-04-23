const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    shares: {
        type: mongoose.Schema.Types.Mixed,
        default: []

    }

}, { timestamps: true })

module.exports = mongoose.model("Posts", PostSchema)