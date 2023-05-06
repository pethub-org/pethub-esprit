const express = require('express');
const router = express.Router();
const Game = require('../models/Games');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one game
router.get('/:id', getGame, (req, res) => {
  res.json(res.game);
});

// Create a game
router.post('/', async (req, res) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    developer: req.body.developer,
    releaseDate: req.body.releaseDate,
    genre: req.body.genre,
    platforms: req.body.platforms,
    rating: req.body.rating
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a game
router.patch('/:id', getGame, async (req, res) => {
  if (req.body.title != null) {
    res.game.title = req.body.title;
  }
  if (req.body.description != null) {
    res.game.description = req.body.description;
  }
  if (req.body.developer != null) {
    res.game.developer = req.body.developer;
  }
  if (req.body.releaseDate != null) {
    res.game.releaseDate = req.body.releaseDate;
  }
  if (req.body.genre != null) {
    res.game.genre = req.body.genre;
  }
  if (req.body.platforms != null) {
    res.game.platforms = req.body.platforms;
  }
  if (req.body.rating != null) {
    res.game.rating = req.body.rating;
  }

  try {
    const updatedGame = await res.game.save();
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a game
router.delete('/:id', getGame, async (req, res) => {
  try {
    await res.game.remove();
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single game by ID
async function getGame(req, res, next) {
  let game;
  try {
    game = await Game.findById(req.params.id);
    if (game == null) {
      return res.status(404).json({ message: 'Cannot find game' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.game = game;
  next();
}
//search 
router.get('/', async (req, res) => {
  const { genre } = req.query;

  const query = genre ? { genre: genre } : {};

  try {
    const games = await Game.find(query);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
