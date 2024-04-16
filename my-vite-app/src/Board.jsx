import React, { useState, useEffect, useContext } from 'react';
import { PicksContext } from './PicksContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

function Board() {
  const [mlbGames, setMlbGames] = useState([]);
  const [mlbPicks, setMlbPicks] = useState([]);
  const [selectedStat, setSelectedStat] = useState('Strikeouts');
  const { picks, setPicks } = useContext(PicksContext);
  const [selectedPick, setSelectedPick] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMlbGames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data');
        console.log('Fetched MLB Games:', response.data);
        setMlbGames(response.data);
      } catch (error) {
        console.error('Error fetching MLB games:', error);
      }
    };

    const fetchMlbPicks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/picks');
        console.log('Fetched MLB Picks:', response.data);
        setMlbPicks(response.data);
      } catch (error) {
        console.error('Error fetching MLB picks:', error);
      }
    };

    fetchMlbGames();
    fetchMlbPicks();
  }, []);


  const addPick = (game) => {
    console.log('adding pick:', game);
    setPicks([...picks, game]);
  };

  const handleMakePick = () => {
    if (selectedPick) {
      console.log('making pick:', selectedPick);
      setPicks([...picks, selectedPick]);
      setSelectedPick(null);
    }
    navigate('/my-entries');
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
  };

  const handleFutureEnhancementsClick = () => {
    alert('Future enhancements to come. Stay tuned!');
  };

  const handleComingSoonClick = () => {
    alert('Coming soon!');
  };

  const handleOpenBets = () => {
    navigate('/my-entries');
  };

  return (
    <div className="board-page">
      <div className="header-container">
        <h1>Board</h1>
        <ul>
          <li><Link to="/board">Board</Link></li>
          <li><Link to="/my-entries">My Entries</Link></li>
          <li onClick={handleFutureEnhancementsClick}>Future Enhancements</li>
        </ul>
      </div>
      <div className="sports-container">
        <div className="sport" onClick={() => handleStatClick('MLB')}>
          MLB
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          NBA (Coming Soon)
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          MLB (Coming Soon)
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          NHL (Coming Soon)
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          GOLF (Coming Soon)
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          F1 (Coming Soon)
        </div>
        <div className="sport coming-soon" onClick={handleComingSoonClick}>
          MMA (Coming Soon)
        </div>
      </div>
      <nav className="stat-navigation" aria-label="Stats Navigation">
        {/* Add stat navigation */}
      </nav>
      <div className="container">
        <div className="games-container">
          {mlbPicks.length > 0 ? (
            mlbPicks
              .filter(game => {
                const gameDate = new Date(Date.parse(game.game_date.replace(' ', 'T')));
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set today's time to midnight
                return gameDate >= new Date('2024-04-04') && gameDate <= today;
              })
              .map(game => {
                const statKey = selectedStat.toLowerCase().replace(' ', '_');
                return (
                  <div key={game.id} className="game">
                    {game.home_team} vs {game.away_team} - {game.game_date} - {game.player_name}
                    {(game[statKey] !== 0 && game[statKey] !== '' && game[statKey] !== null) && ` - ${game[statKey]} ${selectedStat}`}
                    <button className="add-pick-button" onClick={() => addPick(game)}>Add Pick</button>
                    <button onClick={handleOpenBets}>Open Bets</button>
                  </div>
                );
              })
          ) : (
            <div>No MLB games available</div>
          )}
        </div>
        <div className="pick-container">
          {/* Display picks */}
        </div>
      </div>
    </div>
  );
}

export default Board;
