import React, { useState } from "react";
import "./App.css";
import Login from "../src/components/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register, { Step1, Step2, Step3 } from "components/Register";

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register/*" element={<Register />} />
    </Routes>
  );
};

export default App;
