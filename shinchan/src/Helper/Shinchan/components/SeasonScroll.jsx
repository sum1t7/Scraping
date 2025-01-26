import { useState, useRef, useEffect } from "react";
import { SeasonMap } from "../../../data/seasons";
import "../styles/SeasonScroll.css";

const SeasonScroll = ({ onSeasonSelect }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

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

  const handleSeasonSelect = (value) => {
    onSeasonSelect(value);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
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
      >
        <h2 className="Season-heading">Seasons</h2>
        {Array.from(SeasonMap)
          .slice(1, 13)
          .map(([key, value], indx) => (
            <div key={indx}>
              <div
                onClick={() => {
                  handleSeasonSelect(value);
                }}
                className="Season-cards"
                role="button"
                tabIndex={0}
              >
                <h1 className="Season-Text">{key}</h1>
              </div>
            </div>
          ))}
      </div>

      {canScrollRight && (
        <button
          className="scroll-button right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          👉
        </button>
      )}
    </div>
  );
};

export default SeasonScroll;
