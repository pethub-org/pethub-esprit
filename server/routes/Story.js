const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Create a new story
router.post('/', async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // set expiration to 24 hours from now
    const story = await Story.create({ userId, imageUrl, expiresAt });
    res.status(201).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stories for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId, expiresAt: { $gt: Date.now() } });
    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stories for followed users
router.get('/stories/followed', async (req, res) => {
  try {
    const { followedUsers } = req.body;
    const stories = await Story.find({ userId: { $in: followedUsers }, expiresAt: { $gt: Date.now() } });
    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a story
router.delete('/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    await Story.findByIdAndDelete(storyId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
