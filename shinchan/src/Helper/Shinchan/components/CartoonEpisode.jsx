import React, { useState, useEffect } from "react";
import {
   findSeasonNameById,
  findSeasonNumberById,
  getSeasonId,
} from "../../../lib/helper/Action";
import "../styles/EpisodeContainer.css";
import { useNavigate } from "react-router-dom";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
import notFound from "../../../assest/Cartoons/notFound.png";
import { Toaster } from "react-hot-toast";

const CartoonEpisodePage = ({
  season,
  onEpisodeSelect,
  cartoonName,
  seasonNames,
}) => {
  const [thumbnail, setThumbnail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnailError, setThumbnailError] = useState({});

  const navigate = useNavigate();

  //Thumbnail Handlers
  useEffect(() => {
    setLoading(true);
    season != null
      ? setThumbnail([...Array(65)].map((_, index) => index + 1))
      : setThumbnail([]);
    setLoading(false);
    setThumbnailError({});
  }, [season]);

  const handleImageErrorDoraemon3 = (e, indx, fallbackSrc) => {
    if (e.target.src !== fallbackSrc) {
      e.target.onerror = () => {
        e.target.src = notFound;
        setThumbnailError((prev) => ({ ...prev, [indx]: true }));
      };
      setThumbnailError(false);
      e.target.src = fallbackSrc;
    } else {
      e.target.onerror = null;
      e.target.src = notFound;
      setThumbnailError((prev) => ({ ...prev, [indx]: true }));
    }
  };
  const handleImageError = (e, indx) => {
    e.target.onerror = null;
    setThumbnailError((prev) => ({ ...prev, [indx]: true }));
  };

  return (
    <div className="Ep-continent" style={{ backgroundColor: 'rgb(247, 202, 5)' }}>
      {season != null && !loading && (
        <h1 className="Ep-season-heading">
         </h1>
      )}
      <div className="Episode-container" >
        {loading ? (
          <>
            <h1 className="loading-text">Please wait</h1>
            <img
              src={notAvailableGif}
              alt="loading"
              className="loading"
              preload="metadata"
              priority="true"
            />
          </>
        ) : (
          thumbnail.map((indx) => {
            return (
              <div
                className="Episode-cards"
                key={indx}
                onClick={() => {
                  onEpisodeSelect(indx);
                  navigate(
                    `/cartoon/${findSeasonNameById(season)}/${
                      cartoonName == "pokemon"
                        ? 1
                        : findSeasonNumberById(season)
                    }/${indx}`
                  );
                }}
                style={thumbnailError[indx] ? { display: "none" } : {}}
              >
                <Toaster />

                <img
                  loading="lazy"
                  src={` https://img.anime-world.co/images/${season}/${
                    indx >= 10 ? indx : `0${indx}`
                  }.webp`}
                  onError={(e) =>
                    season == 2911
                      ? handleImageErrorDoraemon3(
                          e,
                          indx,
                          ` https://img.anime-world.co/images/${season - 1}/${
                            indx >= 10 ? indx : `0${indx}`
                          }.webp`
                        )
                      : handleImageError(e, indx)
                  }
                  className="Episode-img"
                  alt="thumbnail"
                />
                 <h2 className="Ep-season-text">
                  Season {getSeasonId(season) === 0 ? 1 : getSeasonId(season)}{" "}
                  Ep {indx}
                </h2>
              </div>
            );
          })
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CartoonEpisodePage;
export const dynamic = "force-dynamic";
