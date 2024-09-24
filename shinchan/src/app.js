import React, { useState , useEffect } from 'react';
import VideoPlayer from './Loader';
import Doraemonplayer from './doraemon';
import Nav from './navbar/Nav';
import Home from './home/Hero';
import Rev from './review/Rev';
function App() {
  
const [series,setseries ] = useState('');

 
 

  return ( 
    <>
      {/* <button onClick={() => setseries('shinchan')}>Shinchan</button>
      <button onClick={() => setseries('doraemon')}>Doraemon</button>
      {series === 'shinchan' && <VideoPlayer />  }
      {series === 'doraemon' && <Doraemonplayer/> } */}
      {/* <Nav/>
      <Home/>
      <Rev/> */}
      <VideoPlayer/>
    </>
    );
}

export default App;