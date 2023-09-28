import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import FavoritesAdd from "./FavoritesAdd";
import { Storage } from "../helpers/storage";
type Props = {
  handleRemoveFavorite: (cityName: string) => void;
  handleAddFavorite: (cityName: string) => void;
  handleActive: (cityName: string) => void;
  favorites: string[];
  active: string;
};
const WeatherCardCarousel: React.FC<Props> = ({
  favorites,
  active,
  handleAddFavorite,
  handleActive,
  handleRemoveFavorite,
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  if (!favorites)
    return (
      <>
        add cities to favorites
        <button
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{ height: "250px", minWidth: "110px" }}
          className="btn btn-outline-primary ml-2"
        >
          + Add favorite
        </button>
        <FavoritesAdd handleAddFavorite={handleAddFavorite} />
      </>
    );
  if (favorites.length > 0) {
    Storage.setActiveCity(favorites[0]);
  }
  const incrementStart = () => {
    if (start < favorites.length - 1) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  };

  const decrementStart = () => {
    if (start > 0) {
      setStart(start - 1);
      setEnd(end - 1);
    }
  };

  return (
    <div className="d-flex">
      {favorites && favorites.length > 3 ? (
        <>
          <button
            className={
              start === 0
                ? "d-none"
                : `carousel-control-prev-btn btn-primary h-50 align-self-center`
            }
            onClick={decrementStart}
            disabled={start === 0}
          >
            {"<"}
          </button>

          {favorites.slice(start, end).map((name, idx) => {
            return (
              <WeatherCard
                key={idx}
                handleRemoveFavorite={handleRemoveFavorite}
                cityName={name}
                handleActive={handleActive}
                active={active}
              />
            );
          })}

          <button
            className={
              end >= favorites.length
                ? "d-none"
                : `carousel-control-next-btn btn-primary h-50 align-self-center`
            }
            onClick={incrementStart}
            disabled={end >= favorites.length}
          >
            {">"}
          </button>
        </>
      ) : (
        <div className="d-flex mr-1 align-items-center">
          {favorites
            ? favorites.map((name, idx) => {
                return (
                  <WeatherCard
                    key={idx}
                    handleRemoveFavorite={handleRemoveFavorite}
                    cityName={name}
                    handleActive={handleActive}
                    active={active}
                  />
                );
              })
            : "Favorites list is empty."}
        </div>
      )}

      <button
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ height: "250px", minWidth: "110px" }}
        className="btn btn-outline-primary ml-2"
      >
        + Add favorite
      </button>
      <FavoritesAdd handleAddFavorite={handleAddFavorite} />
    </div>
  );
};

export default WeatherCardCarousel;
