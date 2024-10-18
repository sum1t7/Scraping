import axios from "axios";

export default async function FecthThumbnail(data)  {
   const api_url = 'https://anime-world.in/wp-json/kiranime/v1/episode/animeSeason?anime_id=';
   const response = await axios.get(`${api_url}${data}`);
   return response.data.hindi;
  
}