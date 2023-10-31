import { logout } from "store/features/user/userSlice";
import { useAppDispatch } from "store/hooks";

const UserNotofication = () => {
    return (
        <button type="button" className="btn btn-primary">
            Notifications <span className="badge badge-light">4</span>
        </button>
    );
};

const UserPanel = () => {
    const dispatch = useAppDispatch();

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
                <a
                    onClick={() => dispatch(logout())}
                    className="dropdown-item"
                    href="/"
                >
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
