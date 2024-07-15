import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/home';
import Results from './pages/results';

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [verseInfo, setVerseInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setSelectedMood={setSelectedMood} setVerseInfo={setVerseInfo} />} />
        <Route path="/results" element={<Results selectedMood={selectedMood} verseInfo={verseInfo} />} />
      </Routes>
    </Router>
  );
}

export default App;
