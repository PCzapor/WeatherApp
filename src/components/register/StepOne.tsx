import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "components/form/Input"
import {
  StepOneValidationType,
  stepOneValidation,
} from "components/validators/Register"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { stepOneSubmit } from "store/features/register/registerSlice"
import { useAppSelector } from "store/hooks"

const StepOne = () => {
  const savedStepOne = useAppSelector((state) => state.steps)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StepOneValidationType>({
    resolver: zodResolver(stepOneValidation),
  })
  const onSubmit: SubmitHandler<StepOneValidationType> = (data) => {
    dispatch(stepOneSubmit({ ...data }))
    navigate("/register/2")
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log("x", savedStepOne)

  useEffect(() => {
    reset({
      username: savedStepOne.username,
      password: savedStepOne.password,
      confirmPassword: savedStepOne.confirmPassword,
    })
  }, [reset, savedStepOne])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='mb-4 text-center'>Register</h2>
      <div className='progress my-3 ' style={{ height: "2px" }}>
        <div
          className='progress-bar '
          role='progressbar'
          style={{ width: "33.3%" }}
          aria-valuemin={0}
          aria-valuenow={25}
          aria-valuemax={100}
        ></div>
      </div>
      <Input
        name='username'
        label='username'
        register={register}
        required
        placeholder='username'
        error={errors.username}
        autoFocus
      />
      <Input
        name='password'
        label='password'
        register={register}
        required
        placeholder='password'
        error={errors.password}
      />
      <Input
        name='confirmPassword'
        label='Confirm password'
        register={register}
        required
        placeholder='Confirm Password'
        error={errors.confirmPassword}
      />
      <div className='w-100 d-flex justify-content-end'>
        <button type='submit' className={`btn btn-primary`}>
          Next
        </button>
      </div>
    </form>
  )
}

export default StepOne
