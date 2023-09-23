import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const userCredentials = { username: "admin", password: "admin" };

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    //sprawdzic czy username i pass nie sa puste i czy dluzsze niz np 5 znakow i pozniej czy login jest emailem
    if (credentials.username) {
      toast.success("Zalogowano");
    }
    //autentykacja powinna nastapić z backendu
    //await axios.post('/auth/login',credentials)
    //na potrzeby projektu interwiew credential przypisane na sztywno
    toast.error("Wystąpił błąd logowania");
  };
  return (
    <form className="login-form">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Podaj email"
        value={credentials.username}
        onChange={(e) => e.target.value}
      />
      <input
        type="text"
        placeholder="Podaj hasło"
        value={credentials.password}
        onChange={(e) => e.target.value}
      />
      <button onClick={handleLogin}></button>
    </form>
  );
};

export default Login;
