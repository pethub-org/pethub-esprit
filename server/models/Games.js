// games.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  image : {
    type: String,
     

  },
  platforms: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  link : {
    type: String
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
