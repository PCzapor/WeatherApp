import Register from "components/register/Register";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/ui/Login";
import "./App.css";
import Dashboard from "./components/Dashboard";

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
