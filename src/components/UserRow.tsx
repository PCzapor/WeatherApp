import { Storage } from "../helpers/storage";

const UserNotofication = () => {
  return (
    <button type="button" className="btn btn-primary">
      Notifications <span className="badge badge-light">4</span>
    </button>
  );
};

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
export const UserRow = () => {
  return (
    <div className="d-flex w-100 mb-3 justify-content-end align-middle px-3">
      <UserNotofication />
      <UserPanel />
    </div>
  );
};
