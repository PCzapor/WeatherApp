import React from "react";
import { Storage } from "../helpers/storage";

const UserPanel = () => {
  return (
    <div className="dropdown">
      <img
        src="/User_Icon.png"
        alt="User Avatar"
        className="rounded-circle"
        style={{ width: "64px", height: "64px", cursor: "pointer" }}
        id="user-avatar"
        data-toggle="dropdown"
      />
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="user-avatar"
      >
        <a onClick={Storage.logOut} className="dropdown-item" href="/">
          Logout
        </a>
      </div>
    </div>
  );
};

export default UserPanel;
