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
  const funnyEpisodes = [
    {
      season: 5,
      episode: 15,
      name: "shinchan",
    },
    {
      season: 5,
      episode: 19,
      name: "shinchan",
    },
    {
      season: 7,
      episode: 24,
      name: "shinchan",
    },
    {
      season: 7,
      episode: 32,
      name: "shinchan",
    },
  ];

  const BuriBuri = [
    {
      season: 5,
      episode: 17,
      name: "shinchan",
    },
    {
      season: 8,
      episode: 29,
      name: "shinchan",
    },
    {
      season: 8,
      episode: 30,
      name: "shinchan",
    },
    {
      season: 8,
      episode: 31,
      name: "shinchan",
    },
    {
      season: 8,
      episode: 32,
      name: "shinchan",
    },
  ];

  const wieredEpisodes = [
    {
      season: 5,
      episode: 43,
      name: "shinchan",
    },
  ];

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
      {(loading ) ? (
        <>
        <h1>Please Wait</h1>
          </>
      ) : (
        <>
         
          {/* <div
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
              <Toaster />

              {!watchedEpisodes.episode || !watchedEpisodes.season &&(<img
                loading="lazy"
                src={` https://img.watchanimeworld.in/images/${id}/${
                  watchedEpisodes.episode >= 10
                    ? watchedEpisodes.episode
                    : `0${watchedEpisodes.episode}`
                }.webp`}
                className="Episode-img-prev"
                alt="thumbnail"
                onError={(e) =>
                  handleImageErrorDoraemon3(
                    e,
                    watchedEpisodes.episode,
                    ` https://img.watchanimeworld.in/images/2910/${
                      watchedEpisodes.episode >= 10
                        ? watchedEpisodes.episode
                        : `0${watchedEpisodes.episode}`
                    }.webp`
                  )
                }
              />)}

              <h2 className="Ep-season-texts">
                Season {watchedEpisodes.season} Ep {watchedEpisodes.episode}
              </h2>
            </div>
          </div> */}

            
            

              <div
              style={{ backgroundColor: "white" }}
              className="Episode-container-liked"
            >
              <h1
                className="PreviousWatches"
                style={{ color: "rgb(247, 202, 5)" }}
              >
                Funniest Episodes
              </h1>
              {funnyEpisodes.map((i, indx) => (
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
                    src={` https://img.watchanimeworld.in/images/${getSeasonIdByNameAndNumber(
                      i.name,
                      i.season
                    )}/${i.episode >= 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img-prev"
                    alt="thumbnail"
                    onError={(e) =>
                      handleImageErrorDoraemon3(
                        e,
                        indx,
                        ` https://img.watchanimeworld.in/images/2910/${
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

             <div
              style={{ backgroundColor:  "rgb(247, 202, 5)" }}
              className="Episode-container-liked"
            >
              <h1
                className="PreviousWatches"
                style={{ color: "white" }}
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
                    src={` https://img.watchanimeworld.in/images/${getSeasonIdByNameAndNumber(
                      i.name,
                      i.season
                    )}/${i.episode >= 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img-prev"
                    alt="thumbnail"
                    onError={(e) =>
                      handleImageErrorDoraemon3(
                        e,
                        indx,
                        ` https://img.watchanimeworld.in/images/2910/${
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
 
            
              <div
              style={{ backgroundColor: "white" }}
              className="Episode-container-liked"
            >
              <h1
                className="PreviousWatches"
                style={{ color: "rgb(247, 202, 5)" }}
              >
                Buri Buri Episodes
              </h1>
              {BuriBuri.map((i, indx) => (
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
                    src={` https://img.watchanimeworld.in/images/${getSeasonIdByNameAndNumber(
                      i.name,
                      i.season
                    )}/${i.episode >= 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img-prev"
                    alt="thumbnail"
                    onError={(e) =>
                      handleImageErrorDoraemon3(
                        e,
                        indx,
                        ` https://img.watchanimeworld.in/images/2910/${
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

            <div
              style={{ backgroundColor:  "rgb(247, 202, 5)" }}
              className="Episode-container-liked"
            >
              <h1
                className="PreviousWatches"
                style={{ color: "white" }}
              >
                Wiered Episodes
              </h1>
              {wieredEpisodes.map((i, indx) => (
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
                    src={` https://img.watchanimeworld.in/images/${getSeasonIdByNameAndNumber(
                      i.name,
                      i.season
                    )}/${i.episode >= 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img-prev"
                    alt="thumbnail"
                    onError={(e) =>
                      handleImageErrorDoraemon3(
                        e,
                        indx,
                        ` https://img.watchanimeworld.in/images/2910/${
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
         </>
      )}
    </div>
  );
};

export default CartooonPreviousWatch;
export const dynamic = "force-dynamic";
