import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setActive } from "store/features/city/citySlice";
import FavoritesAdd from "../ui/FavoritesAdd";
import WeatherCard from "./WeatherCard";
import { useAppSelector } from "store/hooks";
type Props = {
    handleRemoveFavorite: (cityName: string) => void;
    handleAddFavorite: (cityName: string) => void;
    handleActive: (cityName: string) => void;
};
const WeatherCardCarousel: React.FC<Props> = ({
    handleAddFavorite,
    handleActive,
    handleRemoveFavorite,
}) => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const favorites = useAppSelector(
        (state) => state.rootReducer.city.favorites
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (favorites.length > 0) {
            dispatch(setActive(favorites[0]));
        }
    }, [favorites]);
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

    if (!favorites) {
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
    }
    return (
        <div className="d-flex">
            {favorites.length > 3 ? (
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
                        &larr;
                    </button>

                    {favorites
                        .slice(start, end)
                        .map((name: string, idx: number) => {
                            return (
                                <WeatherCard
                                    key={idx}
                                    handleRemoveFavorite={handleRemoveFavorite}
                                    cityName={name}
                                    handleActive={handleActive}
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
                        &rarr;
                    </button>
                </>
            ) : (
                <div className="d-flex mr-1 align-items-center">
                    {favorites
                        ? favorites.map((name: string, idx: number) => {
                              return (
                                  <WeatherCard
                                      key={idx}
                                      handleRemoveFavorite={
                                          handleRemoveFavorite
                                      }
                                      cityName={name}
                                      handleActive={handleActive}
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
