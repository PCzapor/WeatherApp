import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, login, selectLoggedUser, startLoading, stopLoading } from "../helpers/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
 

  const dispach = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
const loading = useSelector(isLoading)
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      dispach(startLoading(true))
      if (
        credentials.username === "admin" &&
        credentials.password === "admin"
        ) {
          dispach(
            login({ login: credentials.username, password: credentials.password })
            );
            
            toast.success("Zalogowano");
            setTimeout(() => {
              
              if (loggedUser) {
                dispach(stopLoading(false))
                navigate("/dashboard");
              }
            }, 1500);
      } else {
        dispach(stopLoading(false))
        throw "Invalid credentials";
      }
    } catch (e) {
      dispach(stopLoading(false))
      setError(String(e));
      toast.error("Wystąpił błąd logowania");
    }
    //autentykacja powinna nastapić z backendu
  };
  console.log(loading)
  return (
    <>
    {loading?
    <div className="d-flex justify-content-center  h-100">
    <div className="spinner-border align-self-center" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>:
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
    
  }
                  </>
  );
};

export default Login;
