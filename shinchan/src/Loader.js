import React, { useState } from 'react';
import axios from 'axios';

function VideoPlayer( season, episode ) {
    const [videoUrl, setVideoUrl] = useState('');

    const fetchVideoUrl = () => {
        axios.get(`https://laughing-broccoli-r4g9w55j9j6jcprj4-3000.app.github.dev/video/${season}&${episode}`)
            .then(response => {
                const { videoUrl } = response.data;
                setVideoUrl(videoUrl);
                console.log(videoUrl);
            })
            .catch(error => console.error('There was an error fetching the video URL:', error));
    };

    return (
        <div >
            <iframe src={videoUrl} width="1066.6" height="600" frameborder="0" allowfullscreen></iframe>
            <h4>Season: {season} Episode: {episode}</h4>
        </div>
    );
}
export default VideoPlayer;
 