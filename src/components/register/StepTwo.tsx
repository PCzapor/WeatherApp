import { zodResolver } from "@hookform/resolvers/zod"
import { fetchCityData } from "components/api/fetch"
import {
  stepTwoValidation,
  stepTwoValidationType,
} from "components/validators/Register"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SingleValue } from "react-select"
import AsyncSelect from "react-select/async"
import { stepTwoSubmit } from "store/features/register/registerSlice"
import { useState } from "react"

const StepTwo = () => {
  const { mutateAsync } = useMutation(fetchCityData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<stepTwoValidationType>({
    resolver: zodResolver(stepTwoValidation),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)

  const onSubmit: SubmitHandler<stepTwoValidationType> = (data) => {
    dispatch(stepTwoSubmit({ ...data }))
    navigate("/register/3")
  }

  const handleChange = (
    selectedOptions: SingleValue<{ value: string; label: string }>
  ) => {
    setValue("city", selectedOptions?.label || "")
  }

  const promiseOptions = async (inputValue: string) => {
    const res = await mutateAsync(inputValue)
    if (!res?.length) return []
    return res.map((item) => ({
      value: item.name,
      label: item.name,
    }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='mb-4 text-center'>Register</h2>

      <div className='progress my-3' style={{ height: "2px" }}>
        <div
          className='progress-bar bg-info'
          role='progressbar'
          style={{ width: "66.6%" }}
          aria-valuemin={0}
          aria-valuenow={66.6}
          aria-valuemax={100}
        ></div>
      </div>

      <div className='form-group my-4'>
        <label htmlFor='city' className='font-weight-bold mb-2'>
          City
        </label>
        <AsyncSelect
          loadOptions={promiseOptions}
          onChange={handleChange}
          cacheOptions
          placeholder='Input home city'
          className='react-select-container'
          classNamePrefix='react-select'
          styles={{
            control: (base) => ({
              ...base,
              padding: "6px 4px",
              borderRadius: "0.25rem",
              borderColor: "#ced4da",
              minHeight: "38px",
              boxShadow: "none",
            }),
          }}
        />
      </div>

      <div className='form-group formCheckbox'>
        <div className='form-check mb-3'>
          <input
            type='checkbox'
            className='form-check-input checkbox'
            id='rodo'
            {...register("rodo")}
          />
          <label className='form-check-label ml-3 checkboxLabel' htmlFor='rodo'>
            <Link to='/rodo'>Rodo agreement</Link>
          </label>
          {errors.rodo && (
            <div className='text-danger mt-1'>
              You must accept RODO to continue.
            </div>
          )}
        </div>

        <div className='form-check formCheckbox'>
          <input
            type='checkbox'
            className='form-check-input checkbox'
            id='termsOfUse'
            {...register("termsOfUse")}
          />
          <label
            className='form-check-label  checkboxLabel'
            htmlFor='termsOfUse'
          >
            <span>Terms of Use...</span>
            {errors.termsOfUse && (
              <div className='text-danger mt-1'>You must accept the terms.</div>
            )}
            <button
              type='button'
              className='btn btn-link px-0 ml-2'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Mniej" : "Pokaż więcej"}
            </button>
          </label>
        </div>

        <div className='mt-2 ml-4'>
          {showMore && (
            <div className='mt-2 text-muted'>
              The user agrees to the processing of personal data for the purpose
              of providing the service, in accordance with the regulations and
              privacy policy. At any time, the user may withdraw consent.
            </div>
          )}
        </div>
      </div>

      <div className='d-flex justify-content-between mt-4'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={() => navigate("/register/1")}
        >
          Previous
        </button>
        <button type='submit' className='btn btn-primary'>
          Next
        </button>
      </div>
    </form>
  )
}

export default StepTwo
