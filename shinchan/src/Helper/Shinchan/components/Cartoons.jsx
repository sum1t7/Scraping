import { useState, useRef, useEffect } from "react";
import { cartoondetails, SeasonMap } from "../../../data/seasons";
import "../styles/SeasonScroll.css";
import "../styles/Main.css";
import { useNavigate } from "react-router-dom";
import CartooonPreviousWatch from "./CartoonPreviousWatch";
import bgimage from "../../../assest/Shinchan-assests/shinchan.jpg";
  
const Cartoons = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const watchedEpisodes = {
    name: JSON.parse(localStorage.getItem("name")),
    season: JSON.parse(localStorage.getItem("season")),
    episode: JSON.parse(localStorage.getItem("episode")),
  } || { name: null, season: null, episode: null };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollRef.current;
    container?.addEventListener("scroll", checkScrollPosition);
    return () => container?.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div
          className="background-container  "
          style={{ backgroundImage: `url(${bgimage})` }}
        ></div>
         <div className="content">
          <h1 className="heading">Shinzo</h1>
        
          <div className="Slider-container">
            {canScrollLeft && (
              <button
                className="scroll-button left"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                👈
              </button>
            )}
            
            <div
              className="Season-cards-container"
              ref={scrollRef}
              id="cardContainer"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {Object.entries(cartoondetails).map(([key, cartoon]) => (
                <div key={key}>
                  <div
                    className="Season-cards"
                    style={{ backgroundImage: `url(${cartoon.image})` }}
                    onClick={() => {
                      navigate(`/${cartoon.name}`);
                    }}
                    role="button"
                    tabIndex={0}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {watchedEpisodes.episode && watchedEpisodes.season && (
            <CartooonPreviousWatch watchedEpisodes={watchedEpisodes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cartoons;
export const dynamic = "force-dynamic";