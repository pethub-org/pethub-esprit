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
  
  // @route     PUT api/groups/join/:id
  // @desc      Join a group by ID
  // @access    Private
  router.put('/join/:id', async (req, res) => {
    try {
      const group = await Group.findById(req.params.id);
      console.log('group', group);
  
      if (!group) {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      // Check if user is already a member
      if (group.members.includes(req.user.id)) {
        return res.status(400).json({ msg: 'User already a member of group' });
      }
  
      group.members.push(req.user.id);
      const updatedGroup = await group.save();
      console.log('updatedGroup', updatedGroup);
  
      const user = await userModel.findById(req.user.id);
      console.log('user', user);
  
      user.groups.push(group._id);
      const updatedUser = await user.save();
      console.log('updatedUser', updatedUser);
  
      res.json(updatedGroup);
    } catch (err) {
      console.error(err.message);
      console.log('err', err);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });
  
  
  
  // @route     PUT api/groups/leave/:id
  // @desc      Leave a group by ID
  // @access    Private
  router.put('/leave/:id', async (req, res) => {
    try {
      const group = await Group.findById(req.params.id);
  
      if (!group) {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      // Check if user is not a member
      if (!group.members.includes(req.user.id)) {
        return res.status(400).json({ msg: 'User is not a member of group' });
      }
  
      const index = group.members.indexOf(req.user.id);
      group.members.splice(index, 1);
  
      const updatedGroup = await group.save();
  
      res.json(updatedGroup);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;  

