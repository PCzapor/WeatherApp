import React, { useState } from "react";
import "./App.css";
import Login from "../src/components/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
const CREDENTIALKEY = "weather-app-credentials";
const App: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    localStorage.getItem(CREDENTIALKEY)
  );

  return (
    <Routes>
      <Route path="/" index element={<Login />}></Route>
      {isLoggedIn ? (
        <Route path="/dashboard" element={<Dashboard />}></Route>
      ) : null}
      {/* zmienic emelent na lazy */}
    </Routes>
  );
};

export default App;
