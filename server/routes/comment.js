const router = require('express').Router();
const authenticationMiddleware = require('../middlewares/auth.middleware');
const Comment = require('../models/Comment');
const postModel = require('../models/Post');
const { createNotificationService } = require('../services/notification.service');
const LoggedInUsers = require("../utils/users.socket")

//add comments
router.post('/create', authenticationMiddleware, async (req, res) => {
    try {
        const { content, postId } = req.body;

        const comment = new Comment({
            content,
            postId,
        });

        const mentions = [];
        const regex = /@(\w+)/g;
        let match;
        while ((match = regex.exec(comment.content)) !== null) {
            const username = match[1];
            mentions.push(username);
        }

        comment.mentions = mentions;

        await comment.save();

        // Add comment to the associated post
        const post = await postModel.findById(postId).populate({ path: 'userId', model: 'User' });
        post.comments.push(comment);




        await post.save();

        await createNotificationService({
            type: 'comment',
            sender: req?.user?._id,
            receiver: post?.userId?._id,
            content: post?._id
        })


        const io = req.app.get('socketio')
        const loggedInUsers = LoggedInUsers.getInstance();
        const socketId = loggedInUsers.getUser(post.userId._id.toString())
        // console.log("post id => ", post.userId._id)
        // console.log('emmiting notification event for comment to ', socketId, ' user recieving ', req.user.firstname, 'user emiting', post.userId.firstname)
        io.to(socketId).emit("notification", {
            type: 'comment',
            sender: req?.user?._id,
            receiver: post?.userId?._id,
            content: `${req.user.firstname} ${req.user.lastname} has commented on your post.`

        });

        res.send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
});

//get All comments for  specific post
router.get('/posts/:postId/all', async (req, res) => {
    try {
        const post = await postModel.findById(req.params.postId).populate('comments');
        res.send(post.comments);
    } catch (err) {
        res.status(400).send(err);
    }
});

//update 
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
});

//delete 
router.delete('/delete/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        // Remove comment from the associated post
        const post = await postModel.findById(comment.postId);
        post.comments = post.comments.filter((c) => c.toString() !== req.params.id);
        await post.save();

        res.send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
});

//reaction 
router.put("/:id/like", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment.likes.includes(req.body.userId)) {
            await comment.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("the comment has been liked")
        }
        else {
            await comment.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("the comment has been disliked")

        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})
// add reply
router.post('/:commentId/reply/create', async (req, res) => {
    try {
        const reply = {
            content: req.body.content,
            user: req.body.userId
        };
        const comment = await Comment.findById(req.params.commentId);
        comment.replies.push(reply);
        await comment.save();
        res.send(reply);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update reply
router.put('/:commentId/reply/:replyId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        const reply = comment.replies.id(req.params.replyId);
        reply.content = req.body.content;
        await comment.save();
        res.send(reply);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete reply
router.delete('/:commentId/reply/:replyId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        comment.replies.pull(req.params.replyId);
        await comment.save();
        res.send({ message: 'Reply deleted' });
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all
router.get('/:commentId/replies/all', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        const replies = comment.replies;
        res.send(replies);
    } catch (err) {
        res.status(400).send(err);
    }
});




module.exports = router
