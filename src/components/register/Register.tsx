import { Outlet } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f0f8ff",
                }}
            >
                <div className="container w-100">
                    <div className="row justify-content-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
