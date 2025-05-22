import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../store/features/user/userSlice"
import { useMutation } from "react-query"
import SunMonster from "./SunMonster"
import { LogIn } from "components/localStorage/Storage"

const mimicFetchDataFromBackend = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Login verified")
    }, 1000)
  })
}
const Login = () => {
  const [error, setError] = useState("")
  const [credentials, setCredentials] = useState({
    username: "admin",
    password: "admin",
  })
  const { mutateAsync, isLoading } = useMutation(mimicFetchDataFromBackend)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      console.log(credentials)
      if (credentials.username === "admin" && credentials.password === "admin")
        LogIn(credentials.username)
      await mutateAsync()
      dispatch(
        login({
          login: credentials.username,
          password: credentials.password,
        })
      )
      toast.success("Zalogowano")

      navigate("/dashboard")
    } catch (e) {
      console.log(e)
      setError(String(e))
      toast.error("Wystąpił błąd logowania")
    }
  }

  if (isLoading)
    return (
      <div className='d-flex justify-content-center  h-100'>
        <div className='spinner-border align-self-center' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    )
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{
        minHeight: "100vh",
        background:
          " linear-gradient(0deg,rgba(34, 168, 195, 1) 0%, rgba(222, 199, 27, 1) 63%)",
      }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form>
              <div className='d-flex justify-content-center align-items-center'>
                <SunMonster />
              </div>
              <div className='card-elevated'>
                <h2 className='mb-4 text-center'>Best Weather App</h2>

                <div className='form-group'>
                  <label htmlFor='login'>Login</label>
                  <input
                    type='text'
                    id='login'
                    className='form-control'
                    placeholder='Email'
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    id='password'
                    className='form-control'
                    placeholder='Password'
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-info  my-2 w-25'
                    onClick={(e) => {
                      e.preventDefault()
                      navigate("/register/1")
                    }}
                  >
                    Register
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary w-25'
                    onClick={(e) => {
                      e.preventDefault()
                      handleLogin()
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
