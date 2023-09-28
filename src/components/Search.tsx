import React, { ChangeEvent, FormEvent, useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="form-inline mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search new location"
          aria-label="Search location"
          aria-describedby="button-addon2"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button
            className="invisible mr-5"
            type="submit"
            id="button-addon2"
          ></button>
        </div>
      </div>
    </form>
  );
};

export default Search;
