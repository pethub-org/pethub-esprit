const router = require('express').Router();
const Comment = require('../models/Comment');
const postModel = require('../models/Post');

//add comments
router.post('/create', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        // Add comment to the associated post
        const post = await postModel.findById(req.body.postId);
        post.comments.push(comment);
        await post.save();

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
router.put("/:id/like",async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment.likes.includes(req.body.userId)){
            await comment.updateOne({$push:{likes : req.body.userId}})
            res.status(200).json("the comment has been liked")
        }
        else{
            await comment.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json ("the comment has been disliked")

        }

    }
    catch(err){
        res.status(500).json(err)
    }
})

  
   
  
module.exports = router
