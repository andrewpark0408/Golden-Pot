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

    const fetchMlbPicks = async () => { // New function to fetch the picks
      try {
        const response = await axios.get('http://localhost:3001/picks');
        console.log('Fetched MLB Picks:', response.data);
        setMlbPicks(response.data);
      } catch (error) {
        console.error('Error fetching MLB picks:', error);
      }
    };

    fetchMlbGames();
    fetchMlbPicks(); // Call the new function
  }, []);


  const addPick = (game) => {
    console.log('adding pick:', game);
    setPicks([...picks, game]);
  };

  const handleMakePick = () => {
    if (selectedPick) {
      console.log('making pick:', selectedPick);
      setPicks([...picks, selectedPick]);
      setSelectedPick(null); // Reset selected pick after making pick
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
  <div>
    {/* <PicksContext.Provider value={{ picks, setPicks }}> */}
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
          </div>
          <div className="sport coming-soon" onClick={handleComingSoonClick}>
            NBA (Coming Soon)
          </div>
          <div className="sport coming-soon" onClick={handleComingSoonClick}>
            NFL (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            NHL (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            FIFA (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            WNBA (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            GOLF (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            MMA (Coming Soon)
          </div><div className="sport coming-soon" onClick={handleComingSoonClick}>
            F1 (Coming Soon)
          </div>
        </div>
        <nav className="stat-navigation" aria-label="Stats Navigation">
          <div className="pp-container stat-container">
            <ul>
              <li>
                <div
                  role="button"
                  className={`stat ${selectedStat === 'Strikeouts' ? 'stat-active' : ''}`}
                  tabIndex="0"
                  aria-current="true"
                  onClick={() => handleStatClick('Strikeouts')}
                >
                  Strikeouts
                </div>
              </li>
              <li>
                <div
                  role="button"
                  className={`stat ${selectedStat === 'Walks' ? 'stat-active' : ''}`}
                  tabIndex="0"
                  aria-current="true"
                  onClick={() => handleStatClick('Walks')}
                >
                  Walks
                </div>
              </li>
              <li>
                <div
                role="button"
                className={`stat ${selectedStat === 'Strikes' ? 'stat-active' : ''}`}
                tabIndex="0" aria-current="true"
                onClick={() => handleStatClick('Strikes')}
                >
                  Strikes</div></li>
              <li>
                <div
                role="button"
                className={`stat ${selectedStat === 'Single' ? 'stat-active' : ''}`}
                tabIndex="0" aria-current="true"
                onClick={() => handleStatClick('Single')}
                >
                  Single
                </div>
              </li>
              <li>
                <div
                role="button"
                className={`stat ${selectedStat === 'Double' ? 'stat-active' : ''}`}
                tabIndex="0" aria-current="true"
                onClick={() => handleStatClick('Double')}
                >
                  Double
                </div>
              </li>
              <li>
                <div
                role="button"
                className={`stat ${selectedStat === 'Triple' ? 'stat-active' : ''}`}
                tabIndex="0"
                aria-current="true"
                onClick={() => handleStatClick('Triple')}
                >
                  Triple
                </div>
              </li>
              <li>
                <div
                role="button"
                className={`stat ${selectedStat === 'Home Runs' ? 'stat-active' : ''}`}
                tabIndex="0" aria-current="true"
                onClick={() => handleStatClick('Home Runs')}
                >
                  Home Runs
                </div>
              </li>
            </ul>
            <hr className="border-soFresh-130 mt-2 hidden w-full border md:block" />
          </div>
        </nav>
        <div className="container">
          <div className="games-container">
            {mlbPicks.length > 0 ? (
              mlbPicks
              .filter(game => {
                // Convert game.game_date to a JavaScript Date object
                const gameDate = new Date(Date.parse(game.game_date.replace(' ', 'T')));
                const now = new Date();
                const diffInHours = (gameDate - now) / 1000 / 60 / 60;
                const statKey = selectedStat.toLowerCase().replace(' ', '_');
                const statValue = game[statKey];
                return diffInHours >= 0 && diffInHours <= 48 && statValue !== 0 && statValue !== '' && statValue !== null;
              })
              .map(game => {
                const statKey = selectedStat.toLowerCase().replace(' ', '_');
                return (
                  <div key={game.id} className="game">
                    {game.home_team} vs {game.away_team} - {game.game_date} - {game.player_name}
                    {(game[statKey] !== 0 && game[statKey] !== '' && game[statKey] !== null) && ` - ${game[statKey]} ${selectedStat}`}
                    <button className="add-pick-button" onClick={() => addPick(game)}>Add Pick</button>
                    <button onClick={handleOpenBets}>Open Bets</button>
                    <div className="over-under over rounded-[4px] selected under">
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No MLB games available</div>
            )}
          </div>
        <div className="pick-container">
          <div className="entry-box">
            {picks.map((pick, index) => (
              <div key={index}>
                {pick.home_team} vs {pick.away_team} - {pick.game_date} - {pick.player_name} - {pick[selectedStat.toLowerCase().replace(' ', '_')]} {selectedStat}
              </div>
            ))}
              <button onClick={handleMakePick} disabled={picks.length === 0}>Make a pick</button>
          </div>
        </div>
            </div>
            <div className="entry-box">
            {picks.map((pick, index) => (
              <div key={index}>
                {pick.home_team} vs {pick.away_team} - {pick.game_date} - {pick.player_name}
              </div>
            ))}
          </div>
    </div>
    {/* </PicksContext.Provider> */}
    </div>
  );
}

export default Board;