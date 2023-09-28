import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Storage } from "../helpers/storage";
import { useNavigate } from "react-router-dom";

const userCredentials = { username: "admin", password: "admin" };

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      Storage.LogIn(credentials.username, credentials.password);
      toast.success("Zalogowano");
      navigate("/dashboard");
    } catch (e) {
      setError(String(e));
      toast.error("Wystąpił błąd logowania");
    }
    //autentykacja powinna nastapić z backendu
    //await axios.post('/auth/login',credentials)
    //na potrzeby projektu interwiew credential przypisane na sztywno
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
