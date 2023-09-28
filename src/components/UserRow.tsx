import React from "react";
import UserNotofication from "./UserNotofication";
import UserPanel from "./UserPanel";

const UserRow = () => {
  return (
    <div className="d-flex w-100 mb-3 justify-content-end align-middle px-3">
      <UserNotofication />
      <UserPanel />
    </div>
  );
};

export default UserRow;
