import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/features/user/userSlice";
import { useMutation } from "react-query";

const mimicFetchDataFromBackend = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Login verified");
        }, 1000);
    });
};
const Login = () => {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const { mutate, isLoading } = useMutation(mimicFetchDataFromBackend, {
        onSuccess: (data) => {
            dispach(
                login({
                    login: credentials.username,
                    password: credentials.password,
                })
            );
            console.log(data);

            toast.success("Zalogowano");
            navigate("/dashboard");
        },
    });
    const dispach = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (
                credentials.username === "admin" &&
                credentials.password === "admin"
            )
                mutate();
            else {
                throw "Invalid credentials";
            }
        } catch (e) {
            setError(String(e));
            toast.error("Wystąpił błąd logowania");
        }
    };

    if (isLoading)
        return (
            <div className="d-flex justify-content-center  h-100">
                <div className="spinner-border align-self-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f0f8ff",
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form>
                            <h2 className="mb-4 text-center">Weather App</h2>

                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={credentials.username}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-info  my-2 w-25"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/register/1");
                                    }}
                                >
                                    Register
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-25"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
