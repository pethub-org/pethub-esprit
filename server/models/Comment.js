const mongoose = require('mongoose')
const ReplySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })
const MentionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startIndex: {
      type: Number,
      required: true,
    },
    endIndex: {
      type: Number,
      required: true,
    },
  });
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true,
    },
    mentions: [MentionSchema],
    replies: [ReplySchema],
    likes: {
        type: Array,
        default: []
    },


}, { timestamps: true })


module.exports = mongoose.model("Comment", CommentSchema)