import React, { useState } from "react";
import "./App.css";
import Login from "../src/components/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register, { Step1, Step2, Step3 } from "components/Register";

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" index element={<Login />}></Route>

      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/register/1" element={<Register/>}>
        <Route path="" element={<Step1 />}/>
        <Route path="2" element={<Step2 />}/>
        <Route path="3" element={<Step3 />}/>
      </Route>
    </Routes>
  );
};

export default App;
