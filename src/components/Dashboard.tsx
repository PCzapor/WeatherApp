import { useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setActive,
} from "store/features/city/citySlice";
import Search from "./ui/Search";
import { UserRow } from "./ui/UserRow";
import CurrentWeather from "./weather/CurrentWeather";
import WeatherCardCarousel from "./weather/WeatherCardCarousel";
import WeatherWeek from "./weather/WeatherWeek";
import { useAppSelector } from "store/hooks";

const Dashboard = () => {
  const dispatch = useDispatch();
  const active= useAppSelector((state)=>state.rootReducer.city.active)
  const favorites= useAppSelector((state)=>state.rootReducer.city.active)

  const handleActive = (cityName: string) => {
    if(!favorites)return
   
    dispatch(setActive(cityName));
  };
  const handleAddFavorite = (cityName: string) => {
    dispatch(addFavorite(cityName));
  };

  const handleRemoveFavorite = (cityName: string) => {
    dispatch(removeFavorite(cityName));
  };

  return (

      <main className="container px-0 h-100 w-100 d-flex align-items-center  justify-content-center">
        <div
          style={{ height: "85%", backgroundColor: "lightgreen" }}
          className="d-flex flex-column w-100 px-4 align-items-center rounded-lg"
        >
          <div className="row ml-0 mt-5 w-100">
            <div className="col-7 ">
              <div className="row">
                <Search />
              </div>
              <div className="row display-4 mb-4">
                Weather <strong> Forecast</strong>
              </div>
            </div>
            <div className="col-5">
              <UserRow />
            </div>
          </div>
          <div className="row ml-0 mb-4 w-100">
            <div className="col-7 pl-0 w-100">
              <WeatherCardCarousel
                handleActive={handleActive}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </div>
            <div className="col-5 w-100">
              {!active ? (
                <div>Add first city to your favorites </div>
              ) : (
                <CurrentWeather cityName={active} />
              )}
            </div>
          </div>
          <div className="row justify-content-center ml-0 w-100 mb-4">
            <WeatherWeek />
          </div>
        </div>
      </main>
    
  );
};

export default Dashboard;
