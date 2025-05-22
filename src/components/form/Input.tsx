import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { useState } from "react"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  register: UseFormRegister<T>
  required?: boolean
  placeholder?: string
  error?: FieldError
  autoFocus?: boolean
}

export function Input<T extends FieldValues>({
  name,
  label,
  register,
  required,
  placeholder,
  error,
  autoFocus = false,
}: Props<T>) {
  const isPassword = name.toLowerCase().includes("password")
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisibility = () => setShowPassword(!showPassword)

  return (
    <div className='form-group mb-3 position-relative'>
      <label htmlFor={name} className='font-weight-bold mb-1'>
        {label}
      </label>

      <div className='input-group'>
        <input
          id={name}
          type={isPassword && !showPassword ? "password" : "text"}
          {...register(name, { required: `${name} is required` })}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={`form-control py-2 px-3 rounded ${
            error ? "is-invalid" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
        />

        {isPassword && (
          <div className='input-group-append'>
            <span
              className='input-group-text bg-white border-left-0'
              style={{ cursor: "pointer" }}
              onClick={toggleVisibility}
            >
              {showPassword ? (
                <EyeInvisibleOutlined style={{ fontSize: "1.2rem" }} />
              ) : (
                <EyeOutlined style={{ fontSize: "1.2rem" }} />
              )}
            </span>
          </div>
        )}
      </div>

      {error && (
        <div id={`${name}-error`} className='invalid-feedback d-block'>
          {error?.message}
        </div>
      )}
    </div>
  )
}
