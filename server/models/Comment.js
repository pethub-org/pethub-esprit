const mongoose = require('mongoose')
const ReplySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true })

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
 
    replies: [ReplySchema],
    likes :{
        type:Array,
        default:[]
    },
  

}, { timestamps: true })


module.exports = mongoose.model("Comment", CommentSchema)