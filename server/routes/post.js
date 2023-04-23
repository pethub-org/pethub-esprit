const router = require('express').Router();
const postModel = require('../models/Post');
const userModel = require('../models/UserSchema');

// create post 
router.post("/create", async (req, res) => {
  const newPost = new postModel(req.body)
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
  }
  catch (err) {
    res.status(500).json(err)
  }

})


// update post 
router.put("/:id", async (req, res) => {
  const post = await postModel.findById(req.params.id);
  try {
    if (post.userId === req.body.user) {
      // await post.updateOne({ $set: req.body })
      const post = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      // res.status(200).json("the post has been updated")
      res.status(200).json(post)

    }
    else {
      res.status(403).json("you can update only your post")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }





})

// delete post 

router.delete("/:id", async (req, res) => {
  const post = postModel.findById(req.params.id);
  try {
    if (post.userId === req.body.id) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted")

    }
    else {
      res.status(403).json("you can delete only your post")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// like & dislike post 
router.put("/:id/like", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json("the post has been liked")
    }
    else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json("the post has been disliked")

    }

  }
  catch (err) {
    res.status(500).json(err)
  }
})


// get post 
router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post)

  } catch (err) {
    res.status(500).json(err)
  }
})


// all post 
router.get("/timeline/all/:userId", async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.params.userId);
    const userPosts = await postModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followersPeople.map((friendId) => {
        return postModel.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

// all post  user
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username })
    const posts = await postModel.find({ userId: user._id })
    res.status(200).json(posts)

  } catch (err) {
    res.status(500).json(err);
  }
});
// Share post
router.post("/:id/share", async (req, res) => {
  try {
    
    const post = await postModel.findById(req.params.id);
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { shares: req.body.userId },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//copy link 
router.get('/:id/copy-link', async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    const postLink = `${req.protocol}://${req.get('host')}/posts/${post._id}`;
    res.send(postLink);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting post link');
  }
});


module.exports = router