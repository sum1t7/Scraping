
import { SeasonMap } from "../../data/seasons";

export const getSeasonId = (seasonNumber) => {
    for (let [key, value] of SeasonMap) {
      if (value === seasonNumber) {
        return key;
      }
    }
    return null;
  };

  export const getSeasonIdreverse = (seasonNumber) => {
    for (let [key, value] of SeasonMap) {
      if (key === seasonNumber) {
        return value;
      }
    }
    return null;
  };