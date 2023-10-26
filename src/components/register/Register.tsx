import StepOne from "components/register/StepOne";
import StepThree from "components/register/StepThree";
import StepTwo from "components/register/StepTwo";
import { Route, Routes } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f0f8ff",
                }}
            >
                <div className="container w-100">
                    <div className="row justify-content-center">
                        <Routes>
                            <Route path="/1" element={<StepOne />} />
                            <Route path="/2" element={<StepTwo />} />
                            <Route path="/3" element={<StepThree />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
