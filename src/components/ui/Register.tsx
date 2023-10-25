import { fetchCityData } from "components/api/fetch";
import { useGetCity } from "components/hooks/getCity";
import useDebounce from "components/hooks/useDebounce";
import React, { useState, useEffect } from "react";
import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

type InputVal = {
  Username: string;
  Password: string;
  "Confirm password": string;
  City: string | undefined;
  checkbox: boolean;
};

type InputProps = {
  type?: string;
  label: Path<InputVal>;
  register: UseFormRegister<InputVal>;
  required: boolean;
};

type Props = {
  register: UseFormRegister<InputVal>;
  onNext?: () => void;
  onPrev?: () => void;
};

export const Step1: React.FC<Props> = ({ register, onNext }) => {
  const Input = ({ label, register, required }: InputProps) => (
    <div className="form-group d-flex flex-column">
      <label>{label}</label>
      <input {...register(label, { required: `${label} is required` })} />
    </div>
  );

  return (
    <div className="col-md-6 w-50">
      <h2 className="mb-4 text-center">Register</h2>
      <div className="progress my-3 " style={{ height: "2px" }}>
        <div
          className="progress-bar "
          role="progressbar"
          style={{ width: "33.3%" }}
          aria-valuemin={0}
          aria-valuenow={25}
          aria-valuemax={100}
        ></div>
      </div>
      <Input label="Username" register={register} required />
      <Input label="Password" register={register} required />
      <Input label="Confirm password" register={register} required />
      <div className="w-100 d-flex justify-content-end">
        <button onClick={onNext} className="btn btn-primary ">
          Next
        </button>
      </div>
    </div>
  );
};

export const Step2: React.FC<Props> = ({ register, onNext, onPrev }) => {
  const { mutateAsync } = useMutation(fetchCityData);
  const handleChange = (
    selectedOptions: SingleValue<{ value: string; label: string }>
  ) => {
    console.log("selected", selectedOptions);
    register("City", { value: selectedOptions?.label });
  };

  const promiseOptions = async (inputValue: string) => {
    const res = await mutateAsync(inputValue);

    if (!res?.length) return [];
    return res.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  };

  return (
    <div className="col-md-6">
      <h2 className="mb-4 text-center">Register</h2>
      <div className="progress  my-3" style={{ height: "2px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "66.6%" }}
          aria-valuemin={0}
          aria-valuenow={66.6}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="w-75 my-4">
        <AsyncSelect
          loadOptions={promiseOptions}
          defaultOptions
          onChange={handleChange}
          cacheOptions
        />
        {/* <input
                    placeholder="select city"
                    value={searchedCity}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <select>
                    <option label={data}>{data}</option>
                </select> */}
      </div>
      <div className="w-100 d-flex justify-content-between">
        <button onClick={onPrev} className="btn btn-danger">
          Previous
        </button>
        <button onClick={onNext} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};
export const Step3: React.FC<Props> = ({ onPrev, register }) => {
  // const Checkbox = ({ ...rest }: any) => {
  //     return <input type="checkbox" {...rest} />;
  // };

  return (
    <div className="col-md-6">
      <h2 className="mb-4 text-center">Register</h2>
      <div className="progress  my-3" style={{ height: "2px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "100%" }}
          aria-valuemin={0}
          aria-valuenow={66.6}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="w-75 my-4">
        <input type="checkbox" {...register("checkbox")} />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <button onClick={onPrev} className="btn btn-danger">
          Previous
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  );
};

const Register = () => {
  const { register, handleSubmit } = useForm<InputVal>();
  const onSubmit: SubmitHandler<InputVal> = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  const handleNextChange = (step: number) => {
    navigate(`/register/${step}`);
  };
  const handlePrevChange = (step: number) => {
    navigate(`/register/${step}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <Route
                path="/1"
                element={
                  <Step1
                    register={register}
                    onNext={() => handleNextChange(2)}
                  />
                }
              />
              <Route
                path="/2"
                element={
                  <Step2
                    register={register}
                    onPrev={() => handlePrevChange(1)}
                    onNext={() => handleNextChange(3)}
                  />
                }
              />
              <Route
                path="/3"
                element={
                  <Step3
                    register={register}
                    onPrev={() => handlePrevChange(2)}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
