import StepOne from "components/register/StepOne"
import StepThree from "components/register/StepThree"
import StepTwo from "components/register/StepTwo"
import SunMonster from "components/ui/SunMonster"
import { Route, Routes, useLocation } from "react-router-dom"

const Register = () => {
  const location = useLocation()
  const step = parseInt(location.pathname.split("/").pop() || "1", 10)
  const auraSize = 500 + step * 100
  const auraOpacity = 0.5 + step * 0.1

  return (
    <div
      className='position-relative container-fluid d-flex flex-column align-items-center'
      style={{
        minHeight: "100vh",
        backgroundColor: "#e3f2fd",
        paddingTop: "3rem",
        overflow: "hidden",
      }}
    >
      <div
        className='position-absolute'
        style={{
          top: "-90px",
          left: "50%",
          transform: "translateX(-50%)",
          width: `${auraSize}px`,
          height: `${auraSize}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 255, 0, ${auraOpacity}), transparent 90%)`,
          zIndex: 0,
        }}
      />

      <div className='mb-4' style={{ zIndex: 1 }}>
        <SunMonster />
      </div>

      <div
        className='card shadow border-0'
        style={{
          borderRadius: "1.25rem",
          padding: "2rem",
          width: "100%",
          maxWidth: "540px",
          backgroundColor: "#ffffff",
          zIndex: 2,
        }}
      >
        <Routes>
          <Route path='/1' element={<StepOne />} />
          <Route path='/2' element={<StepTwo />} />
          <Route path='/3' element={<StepThree />} />
        </Routes>
      </div>
    </div>
  )
}

export default Register
