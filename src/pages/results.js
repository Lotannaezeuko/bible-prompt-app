import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Results({ selectedMood, verseInfo }) {
  return (
    <div className="app">
      <div className="results">
        <h2>Results</h2>
        {verseInfo && (
          <div>
            <p>Bible Verse:</p>
            <blockquote>"{verseInfo.verse}"</blockquote>
            <p>Reference: {verseInfo.reference}</p>
            <p>Translation: {verseInfo.translation}</p>
          </div>
        )}
        {selectedMood && <p>You selected the mood: {selectedMood}</p>}
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}

export default Results;
