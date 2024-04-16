import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PicksContext, SelectedStatContext } from './PicksContext';
import { NavLink } from 'react-router-dom';
import './MyEntries.css';

function MyEntries() {
  const { picks, setPicks } = useContext(PicksContext);
  const [selectedOption, setSelectedOption] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [entry, setEntry] = useState(0);
  const [toWin, setToWin] = useState(0);
  // const [balance, setBalance] = useState(100);
  const [promo, setPromo] = useState(0);
  const [freeEntries, setFreeEntries] = useState(0);
  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance !== null ? parseFloat(savedBalance) : 100;
  });
  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    let multiplier;
    switch (picks.length) {
      case 2:
        multiplier = 2;
        break;
      case 3:
        multiplier = 3;
        break;
      case 4:
        multiplier = 5;
        break;
      case 5:
        multiplier = 10;
        break;
      default:
        multiplier = 1;
    }
    setToWin(entry * multiplier);
  }, [entry, picks.length]);

  const handleFutureEnhancementsClick = () => {
    alert('Future enhancements to come. Stay tuned!');
  };

  const handleClearClick = () => {
    setPicks([]);
    setSelectedOption({});
    setIsSubmitted(false);
  };

  const handleOptionClick = (index, option) => {
    setSelectedOption(prev => ({ ...prev, [index]: option }));
  };

  const handleSubmitClick = () => {
    if (entry > balance) {
      alert('You cannot bet more than your balance.');
      return;
    }
    setBalance(prevBalance => prevBalance - entry);
    setIsSubmitted(true);
  };

  const handleSimulateEntryClick = () => {
    if (window.confirm(`You have ${picks.length} entries. Do you want to simulate bet results for this entry?`)) {
      const win = picks.every(() => Math.random() > 0.5);
      const amount = win ? toWin : -entry;
      setBalance(prevBalance => prevBalance + (win ? amount : 0));
      setResult(win ? 'WON' : 'LOST');
      setAmount(amount);
      console.log('result:',result); // Add this line
      window.alert(`You ${win ? 'won' : 'lost'}! You ${win ? 'gained' : 'lost'} $${Math.abs(amount)}.`);
    }
  };

  return (
    <div className="my-entries-page">
      <div className="header-container">
        <h1>My Entries</h1>
        <ul>
        <li><NavLink to="/board" activeClassName="active-link">Board</NavLink></li>
        <li><NavLink to="/my-entries" activeClassName="active-link">My Entries</NavLink></li>
          <li onClick={handleFutureEnhancementsClick}>Future Enhancements</li>
        </ul>
      </div>
      <div className="entries-container">
        <div className="entries-header">
        <h2>Current Entry: {picks.length} Players Selected {isSubmitted && <span className={result === 'WON' ? 'won' : result === 'LOST' ? 'lost' : 'pending'}>{result || 'PENDING'}</span>}</h2>
          <button onClick={handleClearClick}>Clear</button>
        </div>
        {picks.map((pick, index) => (
          <div key={pick.id} className="entry" >
            <p>
              <small>
              {pick.home_team} vs {pick.away_team}
              </small>
            </p>
            <p>
              {pick.player_name} - {pick.stat} - {pick.value}
            </p>
            <div className="more-less">
              <button onClick={() => handleOptionClick(pick.id, 'More')} className={selectedOption[pick.id] === 'More' ? 'selected' : ''}>More</button>
              <button onClick={() => handleOptionClick(pick.id, 'Less')} className={selectedOption[pick.id] === 'Less' ? 'selected' : ''}>Less</button>
            </div>
          </div>
        ))}
        <div className="entry-container">
          <div>
            <label>Entry</label>
            <div>
              <span>$</span>
              <input type="number" value={entry} onChange={(e) => setEntry(e.target.value)} disabled={isSubmitted} />
            </div>
          </div>
          <div>
            <label>To Win</label>
            <div>
              <span>$</span>
              <span>{toWin}</span>
            </div>
          </div>
          <div className="balance-container">
            <div>
              <label>Balance: $</label>
              <span>{balance.toFixed(2)}</span>
              <button onClick={() => setBalance(prevBalance => prevBalance + 100)}>Add $100</button>
            </div>
            <div>
              <label>Promo: $</label>
              <span>{promo.toFixed(2)}</span>
            </div>
            <div>
              <label>Free Entries: </label>
              <span>{freeEntries}</span>
            </div>
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmitClick} disabled={isSubmitted}>Submit Entry</button>
        {isSubmitted && <button onClick={handleSimulateEntryClick}>Simulate Entry</button>}
      </div>
    </div>
  );
}

export default MyEntries;