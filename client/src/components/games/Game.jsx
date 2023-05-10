import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.scss';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
const Game = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/games/');
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    setFilteredGames(
      games.filter((game) => {
        return game.genre.toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [games, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2 style={{marginTop:"40px" , marginLeft:"20px"}}><SportsEsportsOutlinedIcon/> Suggestions Games</h2>
        <div>
      <label htmlFor="genre" style={{color:"white",marginRight:"10px", marginLeft:"50px" ,}}>Genre:</label>
      <select id="genre" name="genre" value={filter} onChange={handleFilterChange}>
        <option value="">All genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Sport">Sport</option>
        <option value="Puzzle">Puzzle</option>
      </select>
    </div>
      <div className="games-container">
  
      {filteredGames.map((game) => (
        <div className="game-card" key={game._id}>
          <div
            className="game-image"
          ><SportsEsportsOutlinedIcon style={{fontSize:"70px",marginLeft:"30px",marginTop:"15px"}}/></div>
          <h2 className="game-title" style={{color:"black",fontSize:"20px"}}>{game.title}</h2>
          <button onClick={() => window.open(game.link, '_blank', 'width=800,height=600,toolbar=no')} >
  Play
</button>

        </div>
      ))}
    </div>

    </div>
    
    
  );
};

export default Game;
