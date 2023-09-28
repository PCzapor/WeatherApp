import React, { useState } from "react";
import "./App.css";
import Login from "../src/components/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { StorageKeys } from "./types";

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" index element={<Login />}></Route>

      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default App;
