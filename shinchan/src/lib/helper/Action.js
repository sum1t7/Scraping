import { SeasonMap } from "../../data/seasons";

import { cartoondetails } from "../../data/seasons";

export const getSeasonId = (seasonNumber) => {
  for (let [key, value] of SeasonMap) {
    if (value === seasonNumber) {
      return key;
    }
  }
  return null;
};

export const findSeasonNumberById = (seasonId) => {
  for (const cartoon of Object.values(cartoondetails)) {
    for (const [seasonNumber, seasonDetails] of Object.entries(
      cartoon.seasons
    )) {
      if (seasonDetails.id === seasonId) {
        return seasonNumber;
      }
    }
  }
  return null;
};

export const findSeasonNameById = (seasonId) => {
  for (const cartoon of Object.values(cartoondetails)) {
    for (const seasonDetails of Object.values(cartoon.seasons)) {
      if (seasonDetails.id === seasonId) {
        return seasonDetails.name;
      }
    }
  }
  return null;
};

export const findSeasonFormalNameById = (seasonId) => {
  for (const cartoon of Object.values(cartoondetails)) {
    for (const seasonDetails of Object.values(cartoon.seasons)) {
      if (seasonDetails.id === seasonId) {
        return seasonDetails.formalName;
      }
    }
  }
  return null;
};

export const getSeasonIdByNameAndNumber = (cartoonName, seasonNumber) => {
   console.log("name",cartoonName);
   console.log("season",seasonNumber);
  if(cartoonName.toLowerCase().startsWith('pokmon'))
    {
      console.log('pokemon');
      const seasonDetails = cartoondetails[3].seasons[seasonNumber];
      if (seasonDetails) {
        return seasonDetails.id;
      }
   }
   else{
    for (const cartoon of Object.values(cartoondetails)) {
      console.log(cartoon.name);
      if (
        cartoon.name.toLowerCase() === cartoonName.toLowerCase() &&
        cartoon.seasons
      ) {
        const seasonDetails = cartoon.seasons[seasonNumber];
        if (seasonDetails) {
          return seasonDetails.id;
        }
      }
      
    };
   }

  return null;
}

export const getSeasonIdreverse = (seasonNumber) => {
  for (let [key, value] of SeasonMap) {
    if (key === seasonNumber) {
      return value;
    }
  }
  return null;
};
