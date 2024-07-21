import React, { useState , useEffect } from 'react';
import VideoPlayer from './Loader';

 
function App() {
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    VideoPlayer(season, episode);
  };

  return (
    <div>
      <form id="videoForm" onSubmit={handleSubmit}>
        <input id="season" value={season} onChange={e => setSeason(e.target.value)} placeholder="Season" />
        <input id="episode" value={episode} onChange={e => setEpisode(e.target.value)} placeholder="Episode" />
        <button type="submit" onClick={() => VideoPlayer(season, episode)}>Submit</button>
      </form>
      

    </div>
  );
}

export default App;