 
 
import shinchanbg from '../assest/Cartoons/shinchan-bg.webp';
import doraemonbg from '../assest/Cartoons/doraemon-bg.jpg';
import pokemonbg from '../assest/Cartoons/pokemon-bg.jpeg';
 

import shinchanSeason from '../assest/Shinchan-assests/Season_img.webp';
import doraemonSeason from '../assest/Cartoons/Doraemon-season.jpg';
import pokemonSeason from '../assest/Cartoons/Pokemon-season.jpg';

import DoraemonImage from '../assest/Cartoons/SeasonCards/Doraemon-season.jpg'
import PokemonImage from '../assest/Cartoons/SeasonCards/pokemon-bg.jpeg'
import ShinchanImage from '../assest/Cartoons/SeasonCards/shinchan1.jpg'



export const SeasonMap = new Map();
SeasonMap.set(1,2746);
SeasonMap.set(1,2746);
SeasonMap.set(2,2897);
SeasonMap.set(3,2898);
SeasonMap.set(4,2899);
SeasonMap.set(5,2900);
SeasonMap.set(6,2901);
SeasonMap.set(7,2902);
SeasonMap.set(8,2903);
SeasonMap.set(12,2906);
SeasonMap.set(13,2907);
SeasonMap.set(14,2908);
SeasonMap.set(15,2909);
 


export const cartoondetails = {
  1: {
    name: "shinchan",
    image: ShinchanImage,
    bgimage: shinchanbg,
    seasonImage: shinchanSeason,
    seasons:{
        1: {id: 2746, name: "shinchan",formalName: "Season 1"},
        2: {id: 2897, name: "shinchan",formalName: "Season 2"},
        3: {id: 2898, name: "shinchan",formalName: "Season 3"},
        4: {id: 2899, name: "shinchan",formalName: "Season 4"},
        5: {id: 2900, name: "shinchan",formalName: "Season 5"},
        6: {id: 2901, name: "shinchan",formalName: "Season 6"},
        7: {id: 2902, name: "shinchan",formalName: "Season 7"},
        8: {id: 2903, name: "shinchan",formalName: "Season 8"},
        12: {id: 2906, name: "shinchan",formalName: "Season 12"},
        13: {id: 2907, name: "shinchan",formalName: "Season 13"},
        14: {id: 2908, name: "shinchan",formalName: "Season 14"},
        15: {id: 2909, name: "shinchan",formalName: "Season 15"},
    }
     
  },
  2: {
    name: "doraemon",
    image: DoraemonImage,
    bgimage: doraemonbg,
    
    seasonImage: doraemonSeason,
    seasons: {
      1: { id: 2749, name: "doraemon", formalName: "Season 1" },
      2: { id: 2910, name: "doraemon", formalName: "Season 2" },
      3: { id: 2911, name: "doraemon", formalName: "Season 3" },
      4: { id: 2912, name: "doraemon", formalName: "Season 4" },
      5: { id: 2913, name: "doraemon", formalName: "Season 5" },
      6: { id: 2914, name: "doraemon", formalName: "Season 6" },
    }, 
  },
  3: {
    name: "pokemon",
    image: PokemonImage,
    bgimage: pokemonbg,
    seasonImage: pokemonSeason,
    seasons: {
      1: { id: 487, name: "pokmon-Indigo-League", formalName: "Indigo League" },
      2: { id: 708, name: "pokmon-adventures-in-the-orange-islands", formalName: "Adventures in the Orange Islands" },
      3: { id: 709, name: "pokmon-the-johto-journeys", formalName: "The Johto Journeys" },
      4: { id: 710, name: "pokmon-johto-league-champions", formalName: "Johto League Champions" },
      5: { id: 707, name: "pokmon-Master-Quest", formalName: "Master Quest" },
    },

  },
  
  
  
};
