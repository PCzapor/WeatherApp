import Register from "components/register/Register";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/ui/Login";
import "./App.css";
import Dashboard from "./components/Dashboard";
import StepOne from "components/register/StepOne";
import StepThree from "components/register/StepThree";
import StepTwo from "components/register/StepTwo";

const App: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register/" element={<Register />}>
                <Route path="/register/1" element={<StepOne />} />
                <Route path="/register/2" element={<StepTwo />} />
                <Route path="/register/3" element={<StepThree />} />
            </Route>
        </Routes>
    );
};

export default App;
