import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PicksContext, SelectedStatContext } from './PicksContext';
import Board from './Board';
import MyEntries from './MyEntries';
import HomePage from './HomePage';

function App() {
  const [picks, setPicks] = useState([]);
  const [selectedStat, setSelectedStat] = useState('Strikeouts');

  return (
    <PicksContext.Provider value={{ picks, setPicks }}>
      <SelectedStatContext.Provider value={{ selectedStat, setSelectedStat }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/my-entries" element={<MyEntries />} />
            {/* Additional routes */}
          </Routes>
        </Router>
      </SelectedStatContext.Provider>
    </PicksContext.Provider>
  );
}

export default App;