const express = require('express');
const router = express.Router();
const userModel = require('../models/UserSchema');

const Group = require('../models/Group');

// @route     POST api/groups
// @desc      Create a group
// @access    Private
router.post('/create',async (req, res) => {
  const newGroup = new Group(req.body)
  try {
    const savedGroup= await newGroup.save();
    res.status(200).json(savedGroup)
  }
  catch (err) {
    res.status(500).json(err)
  }

})

// @route     GET api/groups
// @desc      Get all groups
// @access    Public
router.get('/all', async (req, res) => {
  try {
    const groups = await Group.find({});
    return res.status(200).json(groups)
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route     GET api/groups/:id
// @desc      Get a group by ID
// @access    Public
router.get('/:id',  async(req, res) =>{
  try {
      const groupe = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(groupe);
  } catch (err) {
      res.status(400).send(err);
  }
});

// @route     PUT api/groups/:id
// @desc      Update a group by ID
// @access    Private
router.delete('/:id',  async (req, res) =>{
  const group = Group.findById(req.params.id);
  try {
      await group.deleteOne();
      res.status(200).json("the group has been deleted")

  }
  catch (err) {
    res.status(500).json(err)
  }
})

// @route     DELETE api/groups/:id
// @desc      Delete a group by ID
// @access    Private
router.put('/:id',  async (req, res) =>{
  
  try {
      
      const post = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(post)

    }
  
  catch (err) {
    res.status(500).json(err)
  }

})
  
  
  
 

  //join
  router.put("/:id/join", async (req, res) => {
    try {
      const user = await userModel.findById(req.body.userId);
      const group = await Group.findById(req.params.id);
      if (!user || !group) {
        return res.status(404).json("User or group not found");
      }
      if (group.members.includes(user._id)) {
        return res.status(403).json("User already joined the group");
      }
      await user.updateOne({ $push: { groups: group._id } });
      await group.updateOne({ $push: { members: user._id } });
      res.status(200).json("User has joined the group");
    } catch (err) {
      res.status(500).json(err);
    }
  });

//leave 

router.put("/:id/unfollow", async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const group = await Group.findById(req.params.id);
    if (!user || !group) {
      return res.status(404).json("User or group not found");
    }
    if (!group.members.includes(user._id)) {
      return res.status(403).json("User already left the group");
    }
    await user.updateOne({ $pull: { groups: group._id } });
    await group.updateOne({ $pull: { members: user._id } });
    res.status(200).json("User has left the group");
  } catch (err) {
    res.status(500).json(err);
  }
});
  module.exports = router;  

