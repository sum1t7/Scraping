import { useState, useRef, useEffect } from "react";
import "../styles/SeasonScroll.css";
import backGif from "../../../assest/Cartoons/Background/BackGIF.gif";

const CartoonSeasonPage = ({ onSeasonSelect, seasons, seasonImage }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  const [active, setactive] = useState(null);

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
    setactive(value);
  };

  return (
    <div className="Slider-container" style={{ backgroundColor: "white" }}>
      {canScrollLeft && (
        <button
          className="scroll-button left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        ></button>
      )}

      <div
        className="Season-cards-container"
        ref={scrollRef}
        id="cardContainer"
      >
        {Object.entries(seasons).map(([key, season]) => (
          <div key={key}>
            <h1
              onClick={() => {
                handleSeasonSelect(season.id);
              }}
              className={`Season-Text ${active === season.id ? "active" : ""}`}
              style={key < 10 ? { left: "30px" } : { left: "-10px" }}
            >
              {key}
            </h1>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          className="scroll-button right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        ></button>
      )}
    </div>
  );
};

export default CartoonSeasonPage;
export const dynamic = "force-dynamic";
