import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectLoggedUser } from "../helpers/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispach = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (
        credentials.username === "admin" &&
        credentials.password === "admin"
      ) {
        dispach(
          login({ login: credentials.username, password: credentials.password })
        );

        toast.success("Zalogowano");
        if (loggedUser) {
          navigate("/dashboard");
        }
      } else {
        throw "Invalid credentials";
      }
    } catch (e) {
      setError(String(e));
      toast.error("Wystąpił błąd logowania");
    }
    //autentykacja powinna nastapić z backendu
  };
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

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
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
