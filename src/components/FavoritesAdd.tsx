import React, { useState } from "react";
import { Storage } from "../helpers/storage";

type Props = {
  handleAddFavorite: (cityName: string) => void;
};

const FavoritesAdd: React.FC<Props> = ({ handleAddFavorite }) => {
  const [newCity, setNewCity] = useState("");

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAdd = () => {
    const capitalizedCity = capitalizeFirstLetter(newCity);
    handleAddFavorite(capitalizedCity);
    Storage.addFavorite(capitalizedCity);

    setNewCity("");
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add your city
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="ex. London"
                onChange={(e) => setNewCity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleAdd}
                data-dismiss="modal"
              >
                Add favorite
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FavoritesAdd;
