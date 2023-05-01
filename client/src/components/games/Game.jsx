import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.scss';

const Game = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games/');
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="games-container">
      {games.map((game) => (
        <div className="game-card" key={game._id}>
          <div
            className="game-image"
            style={{ backgroundImage: `url(${game.image})` }}
          ></div>
          <h2 className="game-title">{game.title}</h2>
          <p className="game-description">{game.description}</p>
          <p className="game-developer">Developer: {game.developer}</p>
          <p className="game-release-date">
            Release Date: {game.releaseDate}
          </p>
          <p className="game-genre">Genre: {game.genre}</p>
          <p className="game-platforms">
            Platforms: {game.platforms.join(', ')}
          </p>
          <p className="game-rating">Rating: {game.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Game;
