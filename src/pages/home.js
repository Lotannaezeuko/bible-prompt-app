import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

function Home({ setSelectedMood, setVerseInfo }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    const verseInfo = await fetchVerse(mood, input);
    setVerseInfo(verseInfo);
    navigate('/results');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    const verseInfo = await fetchVerse('', input);
    setVerseInfo(verseInfo);
    navigate('/results');
  };

  const fetchVerse = async (mood, text) => {
  try {
    console.log('Sending request with:', { mood, text });
    const response = await axios.post('http://localhost:3001/api/getVerse', { mood, text });
    console.log('Received response:', response.data);
    const bibleApiResponse = response.data;

    // Check if the response has the expected structure
    if (bibleApiResponse && typeof bibleApiResponse.text === 'string') {
      return {
        verse: bibleApiResponse.text.trim(),
        reference: bibleApiResponse.reference || 'Unknown reference',
        translation: bibleApiResponse.translation_name || 'Unknown translation'
      };
    } else {
      console.error('Unexpected API response structure:', bibleApiResponse);
      return {
        verse: 'Error: Unexpected response format',
        reference: 'Unknown',
        translation: 'Unknown'
      };
    }
  } catch (error) {
    console.error('Error fetching verse:', error.response ? error.response.data : error.message);
    return { verse: 'Error fetching verse', reference: '', translation: '' };
  }
};

  return (
    <div className="app">
      <div className="greeting">Hello, describe how you are feeling.</div>
      <input
        className="input-box"
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="mood-buttons">
        <button className="mood-button happy" onClick={() => handleMoodClick('Happy')}>😊 Happy</button>
        <button className="mood-button sad" onClick={() => handleMoodClick('Sad')}>😢 Sad</button>
        <button className="mood-button angry" onClick={() => handleMoodClick('Angry')}>😡 Angry</button>
        <button className="mood-button shocked" onClick={() => handleMoodClick('Shocked')}>😱 Shocked</button>
        <button className="mood-button love" onClick={() => handleMoodClick('Love')}>😍 Love</button>
        <button className="mood-button laughing" onClick={() => handleMoodClick('Laughing')}>😂 Laughing</button>
        <button className="mood-button cool" onClick={() => handleMoodClick('Cool')}>😎 Cool</button>
        <button className="mood-button sleepy" onClick={() => handleMoodClick('Sleepy')}>😴 Sleepy</button>
      </div>
    </div>
  );
}

export default Home;
