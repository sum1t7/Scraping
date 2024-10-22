import React from 'react'
import { Link } from 'react-router-dom'
const Videoplayer = ({season,episode,loading,videoUrl,previous,next,setFavouriteEp}) => {






  return (
    <div>
    {/* Just the VideoPlayer   */}
    <div>
      {loading ? (<p>Loading...</p>)
:
      (<div className='player-frame'>
      <iframe src={videoUrl}   width={800} height={500} frameborder="0" allowfullscreen allow='fullscreen'>
      </iframe>
      <h1>Season: {season}   Episode: {episode}</h1>
      </div>)}
    {/* Buttons for changing the episode */}
    <div className='change'>
      <button className='change_buttons' onClick={previous} >Previous</button>
      <button className='change_buttons' onClick={next} >Next</button>
      <div onClick={setFavouriteEp} title='Favourites' className='fav' >❤️</div>
     
   
    </div>
    </div>
    </div>
  )
}

export default Videoplayer