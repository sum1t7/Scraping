import React from "react";
import { useState } from "react";
import {
  findSeasonNameById,
  getSeasonIdByNameAndNumber,
} from "../../../lib/helper/Action";
import "../styles/PreviousWatches.css";
import toast, { Toaster } from "react-hot-toast";
import notFound from "../../../assest/Cartoons/notFound.png";
import { useNavigate } from "react-router-dom";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";

const CartooonPreviousWatch = ({ watchedEpisodes }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const liked = JSON.parse(localStorage.getItem("setliked")) || [];

  //season id
  const id = getSeasonIdByNameAndNumber(
    watchedEpisodes.name,
    watchedEpisodes.season
  );

  const maxLikedVideos = 10;

  //name
  const cartoonName = findSeasonNameById(id);

  const handleImageErrorDoraemon3 = (e, indx, fallbackSrc) => {
    if (e.target.src !== fallbackSrc) {
      e.target.onerror = () => {
        e.target.src = notFound;
      };
      e.target.src = fallbackSrc;
    } else {
      e.target.onerror = null;
      e.target.src = notFound;
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <h1 className="loading-text">Please wait</h1>
          <img src={notAvailableGif} alt="loading" className="loading" />
        </>
      ) : (
        <>
        
          <div
            style={{ backgroundColor: "rgb(247, 202, 5)" }}
            className="Episode-container-liked"
          >
            <h1 className="PreviousWatches">You watched</h1>
            <div
              className="Episode-cards-like"
              onClick={() =>
                navigate(
                  `/cartoon/${cartoonName}/${
                    cartoonName == "pokemon" ? 1 : watchedEpisodes.season
                  }/${watchedEpisodes.episode}`
                )
              }
            >
              <Toaster/>
              <img
                loading="lazy"
                src={`https://img.anime-world.in/images/${id}/${
                  watchedEpisodes.episode >= 10
                    ? watchedEpisodes.episode
                    : `0${watchedEpisodes.episode}`
                }.webp`}
                className="Episode-img"
                alt="thumbnail"
                onError={(e) =>
                  handleImageErrorDoraemon3(
                    e,
                    watchedEpisodes.episode,
                    `https://img.anime-world.in/images/2910/${
                      watchedEpisodes.episode >= 10
                        ? watchedEpisodes.episode
                        : `0${watchedEpisodes.episode}`
                    }.webp`
                  )
                }
              />

              <h2 className="Ep-season-texts">
                Season {watchedEpisodes.season} Ep {watchedEpisodes.episode}
              </h2>
            </div>
          </div>





          {liked.length > 0 && (
            <div
              style={{ backgroundColor: "white" }}
              className="Episode-container-liked"
            >
              <h1
                className="PreviousWatches"
                style={{ color: "rgb(247, 202, 5)" }}
              >
                Liked Episodes
              </h1>
              {liked.map((i, indx) => (
                <div
                  className="Episode-cards-like"
                  key={indx}
                  onClick={() =>
                    navigate(
                      `/cartoon/${findSeasonNameById(
                        getSeasonIdByNameAndNumber(i.name, i.season)
                      )}/${
                        findSeasonNameById(
                          getSeasonIdByNameAndNumber(i.name, i.season)
                        ) == "pokemon"
                          ? 1
                          : watchedEpisodes.season
                      }/${watchedEpisodes.episode}`
                    )
                  }
                >
                  <Toaster />
                  <img
                    loading="lazy"
                    src={`https://img.anime-world.in/images/${getSeasonIdByNameAndNumber(
                      i.name,
                      i.season
                    )}/${i.episode >= 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img"
                    alt="thumbnail"
                    onError={(e) =>
                      handleImageErrorDoraemon3(
                        e,
                        indx,
                        `https://img.anime-world.in/images/2910/${
                          i.episode >= 10 ? i.episode : `0${i.episode}`
                        }.webp`
                      )
                    }
                  />
                  <h2 className="Ep-season-texts">
                    Season {i.season} Ep {i.episode}
                  </h2>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartooonPreviousWatch;
export const dynamic = "force-dynamic";
