import { useNavigate } from "react-router-dom"
import { useAppSelector } from "store/hooks"
import { useDispatch } from "react-redux"

const StepThree = () => {
  const navigate = useNavigate()
  const savedData = useAppSelector((state) => state.steps)

  const handleSubmit = () => {
    navigate("/")
  }

  return (
    <div className='w-100'>
      <h2 className='mb-4 text-center'>Confirm Your Data</h2>

      <div className='progress my-3' style={{ height: "2px" }}>
        <div
          className='progress-bar bg-success'
          role='progressbar'
          style={{ width: "100%" }}
          aria-valuemin={0}
          aria-valuenow={100}
          aria-valuemax={100}
        ></div>
      </div>

      <div className='card p-3 mb-4 bg-light'>
        <h5 className='mb-3'>Account Info</h5>
        <p>
          <strong>Username:</strong> {savedData.username}
        </p>
        <p>
          <strong>Password:</strong>{" "}
          {savedData.password ? "*".repeat(savedData.password.length) : "–"}
        </p>
        <p>
          <strong>Confirm Password:</strong>{" "}
          {savedData.confirmPassword
            ? "*".repeat(savedData.confirmPassword.length)
            : "–"}
        </p>
      </div>

      <div className='card p-3 mb-4 bg-light'>
        <h5 className='mb-3'>Location & Terms</h5>
        <p>
          <strong>City:</strong> {savedData.city || "–"}
        </p>
        <p>
          <strong>RODO:</strong> {savedData.rodo ? "accepted" : "not accepted"}
        </p>
        <p>
          <strong>Terms of Use:</strong>{" "}
          {savedData.termsOfUse ? "accepted" : "not accepted"}
        </p>
      </div>

      <div className='d-flex justify-content-between'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={() => navigate("/register/2")}
        >
          Previous
        </button>
        <button
          type='button'
          className='btn btn-success'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default StepThree
